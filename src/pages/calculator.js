import { React, useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";
import Header from "../components/header";
import AbiStaking from "../components/AbiStaking.json";
import AbiErc from "../components/AbiErc20.json";
import { SmartContractToken } from "../pages/config";
import { SmartContractStaking } from "../pages/config";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { myaPrice, APY_percent, rate_calculate } from "../pages/config";

const Calculator = () => {
  const [myaAmount, setMyaAmount] = useState("");
  const [myaPurchasePrice, setMyaPurchasePrice] = useState("");
  const [apyPercentage, setApyPercentage] = useState("");
  const [myaFuturePrice, setMyaFuturePrice] = useState("");
  const [duration, setDuration] = useState("0");
  const [TokenBalanceAmount, setTokenBalanceAmount] = useState("");
  const [apy, setApy] = useState("");
  const [rewards, setRewards] = useState("0");
  const [AmountinDollar, setAmountinDollar] = useState("");
  const [CurrentWealth, setCurrentWealth] = useState("0");
  const [InitialInvestment, setInitialInvestment] = useState("0");
  const [Potential_Return, setPotential_Return] = useState("0");
  const [Error, setError] = useState("");
  const [myaPriceAtPurchase, setMyaPriceAtPurchase] = useState("");
  let flagData = JSON.parse(localStorage.getItem("isFlag"));

  useEffect(() => {
    if (flagData) {
      const myabalance = async () => {
        const web3Modal = new Web3Modal({
          network: "bsc testnet",
          cacheProvider: true,
        });
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const stakingContract = new ethers.Contract(
          SmartContractStaking,
          AbiStaking,
          signer
        );
        const token_contract = new ethers.Contract(
          SmartContractToken,
          AbiErc,
          signer
        );

        const address = await provider.listAccounts();
        const wallet_address = address[0];

        console.log("**", token_contract);
        const blnc = await token_contract.balanceOf(wallet_address);
        const mya_blnc = Number(
          ethers.utils.formatEther(blnc).toString()
        ).toFixed(2); // BALANCE
        setTokenBalanceAmount(mya_blnc);
      };
      myabalance();
    }
  }, []);

  useEffect(() => {
    setApy(APY_percent);
    setTokenBalanceAmount("0");
  }, []);

  const stakingTime = (value) => {
    let buttons = document.querySelectorAll(".btn-3");
    document.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("btn-3")) {
        buttons.forEach(function (button) {
          button.classList.remove("active");
        });
        evt.target.classList.add("active");
      }
    });
    if (value) {
      setDuration(value);
      console.log(value);
    }
  };

  const inputEvent = (event, value) => {
    console.log(event, value);
    if (event.target.name === "myaPurchasePrice") {
      setMyaPurchasePrice(event.target.value);
    } else if (event.target.name === "apyPercentage") {
      setApyPercentage(event.target.value);
    } else if (event.target.name === "myaFuturePrice") {
      setMyaFuturePrice(event.target.value);
      console.log(myaFuturePrice);
    } // } else if (event.target.name === "Duration") {
    //   setDuration(event.target.value);
    // }
  };

  const inputMyaAmount = (value) => {
    console.log(value);
    setMyaAmount(value);
    const amountinDollar = value * myaPrice;
    setAmountinDollar(amountinDollar);
    const currentWealth = value * myaPrice;
    setCurrentWealth(currentWealth);
    console.log(amountinDollar, "amountin $");
  };

  const inputMyaPrice = (value) => {
    console.log(value);
    setMyaPriceAtPurchase(value);
    const myaPriceAtPurchase = value * myaAmount;
    setInitialInvestment(myaPriceAtPurchase);
    console.log(myaPriceAtPurchase);
  };

  const Calculate = async (e) => {
    e.preventDefault();
    console.log(myaFuturePrice, myaPriceAtPurchase, myaAmount, duration);
    if (myaFuturePrice && myaPriceAtPurchase && myaAmount && duration > 0) {
      setError("");
      console.log(myaFuturePrice, myaPriceAtPurchase, myaAmount, duration);
      console.log("Calculator");
      const web3Modal = new Web3Modal({
        network: "bsc testnet",
        cacheProvider: true,
      });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const stakingContract = new ethers.Contract(
        SmartContractStaking,
        AbiStaking,
        signer
      );
      const token_contract = new ethers.Contract(
        SmartContractToken,
        AbiErc,
        signer
      );

      const address = await provider.listAccounts();
      const wallet_address = address[0];
      console.log(wallet_address);

      try {
        const rates = [rate_calculate, rate_calculate, rate_calculate];
        const rate1 = rates[0].toString();
        const rate2 = rates[1].toString(); // Rate for third duration
        const rate3 = rates[2].toString();
        // const rate = 0;
        if (duration == 5) {
          var rate = rate1;
        }
        if (duration == 21) {
          var rate = rate2;
        }
        if (duration == 90) {
          var rate = rate3;
        }
        console.log(duration, ".duration");
        const ROIperDay = rate / duration;
        const rewards = ((myaAmount * ROIperDay * duration) / 100).toFixed(2);

        console.log((rate1 / 90) * 365, "APY ");
        console.log(rewards, "Calculated rewards");
        const potentialReturn = (rewards * myaFuturePrice).toFixed(2);
        console.log(potentialReturn, "potentialreturn");
        if (duration) {
          setPotential_Return(potentialReturn);
        } else {
          console.log("Please Insert Staking Period");
        }

        if (rewards && duration) {
          setRewards(rewards);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please insert all the input fields");
      setError("Please insert all the input fields");
    }
  };

  return (
    <>
      <div className="app-page">
        <Header />

        <div className="content-area">
          <div className="custom-container">
            <div className="content-area-inner">
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                  <Sidebar />
                </div>
                <div className="col-12 col-md-8 col-lg-9 col-xl-8">
                  <form onSubmit={Calculate}>
                    <div className="content-right">
                      <div className="custom-container-inner">
                        <div className="video-grid">
                          <div className="row justify-content-center">
                            <div className="col-lg-12">
                              <div className="ac-box">
                                <div className="ac-box-inner">
                                  <div className="text-center">
                                    <h4>Calculator</h4>
                                    <p>Estimate your returns</p>
                                  </div>

                                  <div className="cc-box-outer">
                                    <div className="row">
                                      <div className="col-lg-4">
                                        <div className="cc-box">
                                          <p>MYA Price</p>
                                          <h4>${myaPrice}</h4>
                                        </div>
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="cc-box">
                                          <p>APY:</p>
                                          <h4>{apy}%</h4>
                                        </div>
                                      </div>
                                      <div className="col-lg-4">
                                        <div className="cc-box">
                                          <p>Your MYA Balance</p>
                                          <h4>{TokenBalanceAmount} MYA</h4>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="ts-form bs-form mt-3">
                                    <div className="row">
                                      <div className="col-md-6 col-xl-3">
                                        <div className="form-group">
                                          <label htmlFor="">
                                            <small>MYA Amount</small>
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="0"
                                            name="myaAmount"
                                            onChange={(e) => {
                                              inputMyaAmount(e.target.value);
                                            }}
                                          />
                                          <p
                                            style={{
                                              textAlign: "right",
                                              transform:
                                                "translateY(-33px) translateX(-18px) ",
                                              display: "inline-block",
                                              float: "right",
                                            }}
                                          >
                                            Max
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-xl-3">
                                        <div className="form-group">
                                          <label htmlFor="">
                                            <small>APY(%)</small>
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="0"
                                            name="apyPercentage"
                                            disabled
                                            //  onChange={inputEvent}
                                            value={apy}
                                          />
                                          <p
                                            style={{
                                              textAlign: "right",
                                              transform:
                                                "translateY(-33px) translateX(-18px) ",
                                              display: "inline-block",
                                              float: "right",
                                            }}
                                          >
                                            Current
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-xl-3">
                                        <div className="form-group">
                                          <label htmlFor="">
                                            <small>
                                              MYA Price at Purchase($)
                                            </small>
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="0"
                                            name="myaPurchasePrice"
                                            onChange={(e) => {
                                              inputMyaPrice(e.target.value);
                                            }}
                                          />
                                          <p
                                            style={{
                                              textAlign: "right",
                                              transform:
                                                "translateY(-33px) translateX(-18px) ",
                                              display: "inline-block",
                                              float: "right",
                                            }}
                                          >
                                            Current
                                          </p>
                                        </div>
                                      </div>
                                      <div className="col-md-6 col-xl-3">
                                        <div className="form-group">
                                          <label htmlFor="">
                                            <small>Future MYA Price($)</small>
                                          </label>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="0"
                                            name="myaFuturePrice"
                                            onChange={inputEvent}
                                          />
                                          <p
                                            style={{
                                              textAlign: "right",
                                              transform:
                                                "translateY(-33px) translateX(-18px) ",
                                              display: "inline-block",
                                              float: "right",
                                            }}
                                          >
                                            Current
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="ct-range">
                                    <label htmlFor="">
                                      {/* <small>30 days</small> */}
                                    </label>

                                    {/* <input
                                      type="range"
                                      min="5"
                                      max="90"
                                      defaultValue="5"
                                      name="Duration"
                                      id="slider1"
                                      className="form-control-plaintext"
                                      onChange={inputEvent}
                                    /> */}
                                  </div>

                                  <div className="search-table-section">
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>
                                            <small>
                                              Staking Period (Days):
                                            </small>
                                          </td>
                                          <td className="py-0">
                                            <div className="table-btn">
                                              <button
                                                className="btn-3"
                                                onClick={() => {
                                                  stakingTime("5");
                                                }}
                                              >
                                                5
                                              </button>
                                              <button
                                                className="btn-3"
                                                onClick={() => {
                                                  stakingTime("21");
                                                }}
                                              >
                                                21
                                              </button>
                                              <button
                                                className="btn-3"
                                                onClick={() => {
                                                  stakingTime("90");
                                                }}
                                              >
                                                90
                                              </button>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="ts-form btn-outer mt-4 text-center">
                                    {Error ? (
                                      <td className="text-white text-end">
                                        <h5
                                          style={{
                                            color: "red",
                                            fontSize: "16px",
                                            marginBottom: "10px",
                                          }}
                                        >
                                          {Error}
                                        </h5>
                                      </td>
                                    ) : (
                                      ""
                                    )}
                                    <button
                                      type="submit"
                                      className="btn btn-gradient w-200"
                                      style={{ width: "180px" }}
                                    >
                                      Calculate
                                    </button>
                                  </div>

                                  <div className="bridge-table-section mt-4">
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <table className="table table-borderless">
                                          <tbody>
                                            <tr>
                                              <td className="text-white">
                                                <small>
                                                  Your Initial Investment
                                                </small>
                                              </td>
                                              <td className="text-white text-end">
                                                <small>
                                                  ${InitialInvestment}
                                                </small>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="text-white">
                                                <small>Current Wealth</small>
                                              </td>
                                              <td className="text-white text-end">
                                                <small>${CurrentWealth}</small>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="text-white">
                                                <small>
                                                  MYA rewards estimation
                                                </small>
                                              </td>
                                              <td className="text-white text-end">
                                                <small>{rewards} MYA</small>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <div className="col-lg-6">
                                        <table className="table table-borderless">
                                          <tbody>
                                            <tr>
                                              <td className="text-white">
                                                <small>Potential return</small>
                                              </td>
                                              <td className="text-white text-end">
                                                <small>
                                                  ${Potential_Return}
                                                </small>
                                              </td>
                                            </tr>

                                            <tr>
                                              <td className="text-white">
                                                <small>
                                                  Staking Period (Days)
                                                </small>
                                              </td>
                                              <td className="text-white text-end">
                                                <small>{duration}</small>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td className="text-white text-end"></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Calculator;
