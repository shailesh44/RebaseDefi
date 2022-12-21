import { ethers } from "ethers";
import { React, useState, useEffect } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import AbiErc from "../components/AbiErc20.json";
import Web3Modal from "web3modal";
import Web3 from "web3";
import AbiErc20 from "../components/AbiErc20.json";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { SmartContractToken } from "./config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { useSelector, useDispatch } from "react-redux";
import { getWalletData, removeWalletData } from "../store/action/walletAction";

const PreSale = () => {
  const ConnectedWalletAddress = "";
  const getBalance = "";

  const dispatch = useDispatch();

  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  // const [BuywithBNB, setBuywithBNB] = useState("");
  const [inSufficientBalance, setInsufficientBalance] = useState("");
  const [sliderValue, setSliderValue] = useState("");
  const [error, SetError] = useState("");
  const [min, setMin] = useState("0");
  const [second, setSecond] = useState("0");
  const [hour, setHour] = useState("0");
  const [day, setDay] = useState("0");
  const [Btnbuy, setBtn] = useState("");
  let hexaNumber = JSON.parse(localStorage.getItem("hexaDate"));
  let flagData = JSON.parse(localStorage.getItem("isFlag"));

  const walletInfo = useSelector((state) => state.walletDetail);
  const { walletData } = walletInfo;

  useEffect(() => {
    setWalletAddress(ConnectedWalletAddress);
    setWalletBalance(getBalance);
    // setBuywithBNB("BUY WITH BNB");

    const LocalStorageData = walletData;
    console.log(LocalStorageData, "wallet..1");
    if (LocalStorageData) {
      setWalletAddress(LocalStorageData.account);
      setWalletBalance(LocalStorageData.getBalance);
      // setBuywithBNB("BUY WITH BNB");
    } else {
      console.log("No LocalStorage");
    }
    if (flagData) {
      let endDate = hexaNumber;
      var countDownDate = new Date(endDate).getTime();

      if (countDownDate) {
        console.log("5 seconds");
        var x = setInterval(function () {
          var now = new Date().getTime();
          var distance = countDownDate - now;

          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setMin(minutes);
          setSecond(seconds);
          setHour(hours);
          setDay(days);
          if (distance < 0) {
            clearInterval(x);
            console.log("EXPIRED");
          }
        }, 1000);
      }
    }
  }, [walletData]);

  useEffect(() => {
    if (hexaNumber == null && flagData == true) {
      getTimeStamp();
    }
  }, []);

  // console.log("hexaNumber==>>>>>>", hexaNumber);
  const providerOptions = {
    binancechainwallet: {
      package: true,
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "495d6772c9b54f4e95b13d6bba701f33",
      },
    },
  };

  useEffect(() => {
    if (flagData === true) {
      const getAlerts = async () => {
        const web3Modal = new Web3Modal({
          network: "rinkeby",
          theme: "dark",
          cacheProvider: true,
          providerOptions,
        });

        var provider = await web3Modal.connect();
        var web3 = new Web3(provider);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        var accounts = await web3.eth.getAccounts();
        var account = accounts[0];

        const getBalance =
          (await web3.eth.getBalance(accounts[0])) / 1000000000000000000;
        console.log(accounts[0]);
        //contract balance

        let tokenAddress = SmartContractToken;

        const ContractAddress = new web3.eth.Contract(AbiErc20, tokenAddress, {
          from: tokenAddress,
        });

        const wallettaddress = accounts[0];

        let balance = await ContractAddress.methods
          .balanceOf(wallettaddress)
          .call();

        const tokenBalance = Number(balance) / 1000000000000000000;
        console.log(tokenBalance);

        const details = {
          account: account,
          getBalance: getBalance,
          tokenBalance: tokenBalance,
          tokenAddress: tokenAddress,
        };
        dispatch(getWalletData(details));
      };
      getAlerts();
      const interval = setInterval(() => getAlerts(), 5000);
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  const maxBtn = () => {
    if (walletBalance) {
      setSliderValue(walletBalance - 0.001);
    }
  };

  const BuyCoin = (value) => {
    console.log("value,", value);
    setSliderValue(value);

    if (value < 0.002) {
      console.log("Please Insert amount above 0.001");
      setInsufficientBalance("Please Insert amount above 0.001");
    } else if (
      walletBalance > value ||
      walletBalance == value ||
      getBalance > value ||
      getBalance == value
    ) {
      setInsufficientBalance("");
    } else {
      setInsufficientBalance("Insufficient Wallet Balance.");
    }
  };

  const getTimeStamp = async () => {
    console.log("getTimesStapmmmmm");
    const web3Modal = new Web3Modal({
      network: "bsc testnet",
      cacheProvider: true,
    });

    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const ICOsmartcontract = new ethers.Contract(
      SmartContractToken,
      AbiErc,
      signer
    );
    const Dates = await ICOsmartcontract.getSaleParameter();
    let hexaValue = Dates._endTime && Dates._endTime._hex;
    const hex = parseInt(hexaValue, 16);
    let d = new Date(hex * 1000);
    var date = new Date(d);

    localStorage.setItem("hexaDate", JSON.stringify(date));
  };

  const startpayment = async () => {
    //  const addr = "0xb34020D1f679568B698A524c4CB03F56A4C862Dd";
    console.log(sliderValue, walletBalance, getBalance);
    SetError("");
    if (
      (walletBalance > sliderValue && sliderValue && sliderValue >= 0.001) ||
      // (walletBalance == sliderValue && sliderValue >= 0.001) ||
      (getBalance > sliderValue && sliderValue >= 0.001)
    ) {
      SetError("");
      setBtn("Please Wait");

      const web3Modal = new Web3Modal({
        network: "bsc testnet",
        cacheProvider: true,
      });
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const ICOsmartcontract = new ethers.Contract(
        SmartContractToken,
        AbiErc,
        signer
      );
      console.log(sliderValue.toString(), " ==,", sliderValue);
      const xyz = sliderValue.toString();
      const options = {
        value: ethers.utils.parseEther(xyz),
      };
      try {
        console.log("options", options.value.toString());
        let buyTokens = await ICOsmartcontract.buyTokens(options);
        const bt = await buyTokens.wait();
        console.log(bt, "==>>");
        if (buyTokens) {
          // let transactionsucess = await toast.success("Transaction success");
          toast.success("Transaction success");
          // setTimeout(
          //   function transactionsucess() {
          //     toast.success("Transaction success");
          //   },

          //   12000
          // );

          setSliderValue("");
          setBtn("Buy With BNB");
        }
      } catch (error) {
        console.log(error);
        setSliderValue("");
        setBtn("Buy With BNB");
        toast.error("User Rejected Transaction");
      }
    }
    if (!sliderValue) {
      SetError("Please Insert Amount.");
    }
  };

  const handleChange = (value) => {
    const valueSlider = value.toFixed(4);
    setSliderValue(valueSlider);
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
                  <div className="content-right">
                    <div className="custom-container-inner mt-0">
                      <div className="content-section">
                        <div className="token-sale-section mt-0">
                          <div className="token-sale-inner">
                            <div className="row">
                              <div className="col-xl-10">
                                <div className="token-sale-left">
                                  <div className="token-sale-left-inner">
                                    <div className="row justify-content-center">
                                      <div className="col-lg-12">
                                        <div className="ts-left">
                                          <div className="ts-left-inner">
                                            <div className="ts-title text-center">
                                              <h5>Presale Ends</h5>
                                            </div>

                                            <div className="count-down-section">
                                              <div id="countdown">
                                                <div id="tiles"></div>
                                                <ul className="labels">
                                                  <li>
                                                    <span>Days</span> {day}
                                                  </li>
                                                  <li>
                                                    <span>Hours</span> {hour}
                                                  </li>
                                                  <li>
                                                    <span>Mins</span> {min}
                                                  </li>
                                                  <li>
                                                    <span>Secs</span> {second}
                                                  </li>
                                                </ul>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <ToastContainer
                                        position="top-right"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                      />
                                      <div className="col-lg-8 mt-5">
                                        <div className="ts-right">
                                          <div className="ts-right-inner">
                                            <div className="ts-form">
                                              <div className="form-group loaderBox">
                                                {walletAddress &&
                                                walletAddress ? (
                                                  <span>
                                                    {" "}
                                                    Wallet Address :{" "}
                                                    {walletAddress}
                                                  </span>
                                                ) : (
                                                  // <Circles
                                                  //   color="#00BFFF"
                                                  //   height={30}
                                                  //   width={30}
                                                  // />
                                                  <span
                                                    style={{
                                                      marginLeft: "7vw",
                                                    }}
                                                  >
                                                    Please Connect Wallet
                                                  </span>
                                                )}

                                                {ConnectedWalletAddress &&
                                                ConnectedWalletAddress &&
                                                !walletAddress ? (
                                                  <span>
                                                    {" "}
                                                    Wallet Address :{" "}
                                                    {ConnectedWalletAddress}
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                                <br></br>
                                                <br></br>

                                                {getBalance ? (
                                                  <span>
                                                    {" "}
                                                    Wallet Balance :{" "}
                                                    {getBalance - 0.001} BNB
                                                  </span>
                                                ) : (
                                                  ""
                                                )}

                                                {walletBalance &&
                                                !getBalance ? (
                                                  <span>
                                                    {" "}
                                                    Wallet Balance :{" "}
                                                    {walletBalance.toFixed(
                                                      4
                                                    )}{" "}
                                                    BNB
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                                {ConnectedWalletAddress ||
                                                walletAddress ? (
                                                  <div className="slider">
                                                    {Btnbuy == "Please Wait" ? (
                                                      <Slider
                                                        disabled
                                                        min={0.01}
                                                      />
                                                    ) : (
                                                      <Slider
                                                        step={0.05}
                                                        min={0.002}
                                                        max={
                                                          getBalance
                                                            ? getBalance - 0.001
                                                            : walletBalance -
                                                              0.001
                                                        }
                                                        value={sliderValue}
                                                        onChange={handleChange}
                                                      />
                                                    )}
                                                  </div>
                                                ) : (
                                                  <>
                                                    <div className="slider">
                                                      <Slider
                                                        disabled
                                                        min={0.01}
                                                      />
                                                    </div>
                                                  </>
                                                )}

                                                {/* <div className="value">
                                                    {sliderValue}
                                                  </div> */}

                                                {/* <label
                                                  htmlFor=""
                                                  className="mb-3 text-center d-block"
                                                >
                                                  Amount
                                                </label>
                                                <div className="form-progress form-progress-locked">
                                                  <div className="progress">
                                                    <div
                                                      className="progress-bar"
                                                      role="progressbar"
                                                      aria-valuenow="0"
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                      style={{ width: "0%" }}
                                                    ></div>
                                                  </div>
                                                </div> */}
                                                {/* <div className="row">
                                                  <div className="col-6">
                                                    <p className="m-0 mt-2">
                                                      <strong>0BNB</strong>
                                                    </p>
                                                  </div>
                                                  <div className="col-6">
                                                    <p className="m-0 mt-2 text-md-end">
                                                      <strong>25,000BNB</strong>
                                                    </p>
                                                  </div>
                                                </div> */}
                                              </div>

                                              <div className="form-group mb-2">
                                                <div className="form-group-cur">
                                                  {Btnbuy == "Please Wait" ? (
                                                    <input
                                                      type="number"
                                                      placeholder="0.002"
                                                      min="0.002"
                                                      disabled
                                                      value={sliderValue}
                                                      onChange={(e) => {
                                                        BuyCoin(
                                                          e.target.value
                                                          // e.target.value
                                                        );
                                                      }}
                                                      className="form-control"
                                                    />
                                                  ) : (
                                                    <input
                                                      type="number"
                                                      placeholder="0.002"
                                                      min="0.002"
                                                      value={sliderValue}
                                                      onChange={(e) => {
                                                        BuyCoin(
                                                          e.target.value
                                                          // e.target.value
                                                        );
                                                      }}
                                                      className="form-control"
                                                    />
                                                  )}

                                                  <div className="curr-box">
                                                    <button
                                                      className="btn-search-bal-right"
                                                      onClick={maxBtn}
                                                      style={{
                                                        cursor: "pointer",
                                                        width: "90px",
                                                      }}
                                                    >
                                                      MAX
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>

                                              <h4
                                                style={{
                                                  color: "red",
                                                  fontSize: "17px",
                                                }}
                                              >
                                                {" "}
                                                {inSufficientBalance
                                                  ? inSufficientBalance
                                                  : ""}
                                              </h4>

                                              <h4
                                                style={{
                                                  color: "red",
                                                  fontSize: "16px",
                                                  marginBottom: "10px",
                                                }}
                                              >
                                                {" "}
                                                {error ? error : ""}
                                              </h4>

                                              {walletAddress ||
                                              ConnectedWalletAddress ? (
                                                <div className="btn-outer dpst_wdrl mt-4">
                                                  {Btnbuy == "Please Wait" ? (
                                                    <button
                                                      className="btn btn-gradient w-100 btn-deposit"
                                                      onClick={startpayment}
                                                      disabled
                                                    >
                                                      {" "}
                                                      Please Wait
                                                    </button>
                                                  ) : (
                                                    <button
                                                      className="btn btn-gradient w-100 btn-deposit"
                                                      onClick={startpayment}
                                                    >
                                                      {" "}
                                                      Buy With BNB
                                                    </button>
                                                  )}
                                                </div>
                                              ) : (
                                                <div className="btn-outer dpst_wdrl mt-4">
                                                  <button
                                                    className="btn btn-gradient w-100 btn-deposit"
                                                    disabled
                                                  >
                                                    {" "}
                                                    Buy With BNB
                                                  </button>
                                                </div>
                                              )}
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
                        </div>
                      </div>
                    </div>
                  </div>
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

export default PreSale;
