import { React, useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "react-video-js-player";
import Video3 from "../images/video-3.jpg";
import Video from "../images/video.mp4";
import RoninCoin from "../images/ronin-coin.png";
import { deposit } from "./FarmCalculation";
// import { approve } from "./FarmCalculation";
import { BlncOF } from "./FarmCalculation";
import { Farm_unstake, Farm_unstake_Balance } from "./FarmCalculation";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  gasfeeEstimation_Farm,
  GasEstimation_unstake,
} from "../components/TransactionFees_estimation";

const Farm = () => {
  const [unstakebtn_validation, setunstakebtn_validation] = useState("");
  const [Transactionfee, setTransactionfee] = useState("0");
  const [tokenBalances, settokenBalances] = useState("");
  const [walletDetail, setwalletDetail] = useState("");
  const [tokenBalance_unstake, settokenBalance_unstake] = useState("");
  const [inSufficientBalance, setInsufficientBalance] = useState("");
  const [InsufficientBalance_unstake, setInsufficientBalance_unstake] =
    useState("");
  const [stakeNow, setStakeNow] = useState("");
  const [StakeText, setStakeText] = useState("Stake Now");
  const [walletAddress, setWalletAddress] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [BalanceLP, setBalanceLP] = useState("");
  const [parameter, set_Parameter] = useState("");
  const [unstakeNow, setUnstakeNow] = useState("");
  const [error, setError] = useState("");
  const [Error_unstake, setError_unstake] = useState("");
  const [unstake_amount, setUnstake_amount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [unstake_Balance, setunstake_Balance] = useState("");
  const [Rewards, setRewards] = useState("");
  const [unstakeGas, setunstakeGas] = useState("");
  const [flag, setflag] = useState("");
  const walletInfo = useSelector((state) => state.walletDetail);
  const { walletData } = walletInfo;
  const [status, setstatus] = useState("");

  let flagData = JSON.parse(localStorage.getItem("isFlag"));

  setTimeout(() => {
    var walletDatas = walletData;
    setwalletDetail(walletDatas);
    setWalletAddress(walletDatas.account);
    if (walletDatas) {
      setStakeNow("Stake Now");
      setUnstakeNow("Unstake Now");
      setWalletAddress(walletDatas.account);
    } else {
      console.log("No data");
    }
  }, 0);

  useEffect(() => {
    const Balance = async () => {
      const balance_unstake = await BlncOF();
      console.log(balance_unstake);
      //setBalanceLP_unstake(balance_unstake);
    };
    const Unstake_balance = async () => {
      const farm_unstake = await Farm_unstake_Balance();
      console.log(farm_unstake[0], farm_unstake[1]);
      const unstakeBalance = farm_unstake[0];
      const rewards = farm_unstake[1];
      const reward = rewards.toString();
      const rewards_unstake = reward.slice(0, reward.indexOf(".") + 2 + 1);

      console.log(unstakeBalance, rewards);
      setRewards(rewards_unstake);
      setunstake_Balance(unstakeBalance);
    };

    const balanceupdate = async () => {
      const farm_unstake = await Farm_unstake_Balance();
      console.log(farm_unstake[0], farm_unstake[1]);
      const unstakeBalance = farm_unstake[0];

      setunstake_Balance(unstakeBalance);
    };

    if (flagData == true) {
      Unstake_balance();
      balanceupdate();
      Balance();
    }
  }, []);

  useEffect(() => {
    const walletDatas = walletData; //JSON.parse(localStorage.getItem("walletDetails"));
    console.log(walletDatas, "wallet..1");
    setwalletDetail(walletDatas);
    if (flagData == true) {
      const Balance = async () => {
        const balnc = await BlncOF();
        console.log(balnc);
        setBalanceLP(balnc);
      };
      Balance();
    }

    if (walletDatas) {
      setStakeNow("Stake Now");
      setUnstakeNow("Unstake Now");
      setWalletAddress(walletDatas.account);
      console.log(walletDatas.tokenBalance, "token balance");
    } else {
      console.log("No data");
    }
  }, []);

  const maxBalance = () => {
    settokenBalances(BalanceLP);
    setStakeAmount(BalanceLP);
    setInsufficientBalance("False");
  };

  const maxBalance_unstake = () => {
    settokenBalance_unstake(unstake_Balance);
    setflag("true");
  };

  const stakeBalance = (e) => {
    var values = e.target.value;
    console.log(values, BalanceLP);
    var valuesLp = Number(values);
    var BalncLp = Number(BalanceLP);
    settokenBalances(values);

    if (valuesLp <= BalncLp && valuesLp) {
      console.log(valuesLp, "balancemore ");
      setInsufficientBalance("False");
      setStakeAmount(values);
    }
    if (valuesLp > BalncLp) {
      console.log(valuesLp, "Low Balance");
      setInsufficientBalance("True");
    }
    if (valuesLp == 0) {
      setInsufficientBalance("Please insert Value above 0");
    }
  };
  const stake = async () => {
    console.log("............1");
    const stake_Amount = stakeAmount;
    console.log(stakeAmount);
    console.log(stake_Amount);

    if (inSufficientBalance == "False") {
      setStakeText("Please Wait");
      setstatus(true);

      setError("");
      if (flagData == true) {
        try {
          const gas = await gasfeeEstimation_Farm(stake_Amount);

          console.log(gas);
          toast.success("Approve success !");
          setTransactionfee(gas);
          // const approve = await approve(stake_Amount);
          // console.log(approve);
          console.log(typeof stakeAmount, stakeAmount);
          const Deposit = await deposit(stake_Amount);

          console.log(Deposit);

          setstatus("");
          settokenBalances("");

          const balanceupdate = async () => {
            const balnc = await BlncOF();
            console.log(balnc);
            setBalanceLP(balnc);
          };
          const balanceupdate2 = async () => {
            setStakeText("Approve Now");
            toast.success("Stake  success !");
          };
          setTimeout(balanceupdate, 20000);
          setTimeout(balanceupdate, 10000);
          setTimeout(balanceupdate, 15000);
          setTimeout(balanceupdate2, 13000);
        } catch (error) {
          console.log(error);
          toast.error("Stake Unsuccessful");
          setStakeText("Approve Now");
          settokenBalances("");
        }
      }
    }
  };

  const unstakeBalance = (e) => {
    var unsvalues = e.target.value;
    var unsValuesUnstake = Number(unsvalues);
    var unstake_BalanceLP = Number(unstake_Balance);

    settokenBalance_unstake(unsvalues);
    console.log(unstake_BalanceLP, unsValuesUnstake);
    if (
      (unstake_BalanceLP > unsValuesUnstake && unsValuesUnstake > 0) ||
      (unstake_BalanceLP == unsValuesUnstake && unsValuesUnstake > 0)
    ) {
      setflag("true");
      setInsufficientBalance_unstake("");
      console.log("Unstake amount", unsValuesUnstake);

      const unstakeGas = async (value) => {
        const gasestimate = await GasEstimation_unstake(value);
        console.log(gasestimate);
        setunstakeGas(gasestimate);
      };
      unstakeGas(unsvalues);

      setUnstake_amount(unsvalues);
    }
    // } else if (unsValuesUnstake == tokenBalance_unstake) {
    //   console.log("equal");
    //   setflag("true");
    // }
    else if (!unsvalues) {
      console.log(unsValuesUnstake, "Insufficient balance");
      setInsufficientBalance_unstake("Please Insert amount");
      setflag("false");
    } else if (unsvalues == 0) {
      console.log(unsValuesUnstake, " balance");
      setInsufficientBalance_unstake("Please Insert amount above 0");
      setflag("false");
    } else if (unsvalues > tokenBalance_unstake) {
      setInsufficientBalance_unstake("Insufficient balance");
      setflag("false");
    }
  };

  const TabContent1 = () => {
    console.log("tabcontent1");
    document.getElementById("tab-content-2").style.display = "none";
    document.getElementById("tab-content-1").style.display = "block";
    document.getElementById("LP Stake").style.color = "#4AE3D0";
    document.getElementById("LP Unstake").style.color = "white";
    settokenBalances("");
    setInsufficientBalance("");
    setInsufficientBalance_unstake("");
    setAmountError("");

    if (flagData == true) {
      const balanceupdate = async () => {
        const balnc = await BlncOF();
        console.log(balnc);
        setBalanceLP(balnc);
      };
      balanceupdate();
    }
    const Balance = async () => {
      const balance_unstake = await BlncOF();
      console.log(balance_unstake);
      //setBalanceLP_unstake(balance_unstake);
    };
    const Unstake_balance = async () => {
      const farm_unstake = await Farm_unstake_Balance();
      console.log(farm_unstake[0], farm_unstake[1]);
      const unstakeBalance = farm_unstake[0];
      const rewards = farm_unstake[1];
      const reward = rewards.toString();
      const rewards_unstake = reward.slice(0, reward.indexOf(".") + 2 + 1);

      console.log(unstakeBalance, rewards);
      setRewards(rewards_unstake);
      setunstake_Balance(unstakeBalance);
    };

    const balanceupdate = async () => {
      const farm_unstake = await Farm_unstake_Balance();
      console.log(farm_unstake[0], farm_unstake[1]);
      const unstakeBalance = farm_unstake[0];

      setunstake_Balance(unstakeBalance);
    };

    if (flagData == true) {
      Unstake_balance();
      balanceupdate();
      Balance();
    }
  };
  const TabContent2 = () => {
    document.getElementById("tab-content-1").style.display = "none";
    document.getElementById("tab-content-2").style.display = "block";
    document.getElementById("LP Unstake").style.color = "#4AE3D0";
    document.getElementById("LP Stake").style.color = "white";
    settokenBalance_unstake("");
    setInsufficientBalance_unstake("");
    setAmountError("");
    const Balance = async () => {
      const balance_unstake = await BlncOF();
      console.log(balance_unstake);
      //setBalanceLP_unstake(balance_unstake);
    };
    const Unstake_balance = async () => {
      const farm_unstake = await Farm_unstake_Balance();
      console.log(farm_unstake[0], farm_unstake[1]);
      const unstakeBalance = farm_unstake[0];
      const rewards = farm_unstake[1];
      const reward = rewards.toString();
      const rewards_unstake = reward.slice(0, reward.indexOf(".") + 2 + 1);

      console.log(unstakeBalance, rewards);
      setRewards(rewards_unstake);
      setunstake_Balance(unstakeBalance);
    };

    const balanceupdate = async () => {
      const farm_unstake = await Farm_unstake_Balance();
      console.log(farm_unstake[0], farm_unstake[1]);
      const unstakeBalance = farm_unstake[0];

      setunstake_Balance(unstakeBalance);
    };

    if (flagData == true) {
      Unstake_balance();
      balanceupdate();
      Balance();
    }
  };

  const unstakeNow_Btn = async () => {
    console.log("here");
    // let formIsValid = handleValidation();
    if (flag == "true") {
      console.log("flag == true");
      try {
        setError_unstake("");

        setunstakebtn_validation("Please Wait");

        console.log(await Farm_unstake(tokenBalance_unstake, parameter));
        settokenBalance_unstake("");

        setUnstake_amount("");

        const balanceupdate = async () => {
          const farm_unstake = await Farm_unstake_Balance();
          console.log(farm_unstake[0], farm_unstake[1]);
          const unstakeBalance = farm_unstake[0];

          setunstake_Balance(unstakeBalance);
        };

        const balanceupdate2 = async () => {
          setunstakebtn_validation("Unstake Now");
          toast.success("Unstake Success");
        };

        setTimeout(balanceupdate, 20000);
        setTimeout(balanceupdate, 10000);
        setTimeout(balanceupdate, 15000);
        setTimeout(balanceupdate2, 13000);
      } catch (e) {
        console.log(e);
        setunstakebtn_validation("Unstake Now");
      }
    }
  };

  const sendReward = (value) => {
    console.log("value------------------>", value);
    set_Parameter(value);
    let buttons = document.querySelectorAll(".btn-3");
    document.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("btn-3")) {
        buttons.forEach(function (button) {
          button.classList.remove("active");
        });

        evt.target.classList.add("active");
      }
    });
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
                    <div className="custom-container-inner">
                      <div className="content-section">
                        <div className="content-top-title text-center">
                          <h1>
                            {/* <a href="">LP Stake</a> /
                                            <a href="">LP Unstake</a> */}
                            <a
                              onClick={TabContent1}
                              className="tab-title active"
                              id="LP Stake"
                              style={{ color: "#4AE3D0" }}
                            >
                              LP Stake
                            </a>{" "}
                            /
                            <a
                              onClick={TabContent2}
                              className="tab-title"
                              id="LP Unstake"
                              style={{ color: "white" }}
                            >
                              LP Unstake
                            </a>
                          </h1>
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

                        <div className="tab-content active" id="tab-content-1">
                          <div className="it-title">
                            <p>Instantly Stake Miyamoto</p>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 videoCon">
                              <div className="videoBox">
                                <div className="videoInner">
                                  {/* <div className="video-outer"> */}
                                  <VideoPlayer
                                    className="video"
                                    src={Video}
                                    poster={Video3}
                                    width="420"
                                    height="250"
                                  />
                                  {/* <video controls poster="images/video-3.jpg">
                                                        <source src="images/video.mp4" type="video/mp4">
                                                        <source src="images/video.mp4" type="video/ogg">
                                                        Your browser does not support the video tag.
                                                    </video> */}
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="content-search">
                                <div className="content-search-common content-search-left">
                                  <div className="content-search-top">
                                    <span className="search-balance mr-1">
                                      Amount
                                    </span>
                                    <div className="search-bal-middle">
                                      <div className="total">
                                        <span>
                                          {walletAddress ? BalanceLP : ""}
                                        </span>
                                      </div>
                                    </div>
                                    <button
                                      className="btn-search-bal-right"
                                      onClick={maxBalance}
                                      style={{ cursor: "pointer" }}
                                    >
                                      Max
                                    </button>
                                  </div>
                                  <div className="content-search-bottom">
                                    {StakeText == "Please Wait" ? (
                                      <input
                                        min="0.1"
                                        type="number"
                                        placeholder="0.0"
                                        disabled
                                        name="tokenBalances"
                                        className=""
                                        value={
                                          walletAddress ? tokenBalances : ""
                                        }
                                        onChange={stakeBalance}
                                      />
                                    ) : (
                                      <input
                                        min="0.1"
                                        type="number"
                                        placeholder="0.0"
                                        name="tokenBalances"
                                        className=""
                                        value={
                                          walletAddress ? tokenBalances : ""
                                        }
                                        onChange={stakeBalance}
                                      />
                                    )}

                                    <img
                                      src={RoninCoin}
                                      className="img-fluid"
                                      alt=""
                                    />

                                    <h3>MYA/BNB-LP</h3>
                                  </div>
                                  <p className="content-url">
                                    Short of MIYAMOTO? Buy from
                                    <a
                                      href="https://www.binance.com/en"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {" "}
                                      Binance{" "}
                                    </a>
                                    or
                                    <a
                                      href="https://www.coinbase.com/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {" "}
                                      Coinbase{" "}
                                    </a>
                                  </p>
                                </div>
                              </div>
                              <div className="search-table-section">
                                <table>
                                  <tbody>
                                    {/* <tr>
                                      <th>
                                        Estimated APY
                                        <div
                                          className="d-inline-block"
                                          data-tip="The currently projected slippage amount for this swap"
                                          data-html="true"
                                          currentitem="false"
                                        >
                                          <svg
                                            width="16px"
                                            height="16px"
                                            viewBox="0 0 576 512"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm0-338c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                                            ></path>
                                          </svg>
                                          :
                                        </div>
                                      </th>
                                      <td className="pr-3">0</td>
                                    </tr> */}
                                    <tr>
                                      <th>TX Fee</th>
                                      <td className="pr-3">
                                        {" "}
                                        {Transactionfee} wei
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>{" "}
                              {inSufficientBalance == "True" ? (
                                <h4 style={{ color: "red", fontSize: "16px" }}>
                                  Insufficient Wallet Balance
                                </h4>
                              ) : (
                                ""
                              )}
                              {inSufficientBalance ==
                              "Please insert Value above 0" ? (
                                <h4 style={{ color: "red", fontSize: "16px" }}>
                                  Please insert Value above 0
                                </h4>
                              ) : (
                                ""
                              )}
                              <h4
                                style={{
                                  color: "red",
                                  fontSize: "16px",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <span style={{ color: "red" }}>
                                  {amountError}
                                </span>
                              </h4>
                              {walletAddress ? (
                                <div className="text-center">
                                  {StakeText == "Please Wait" ? (
                                    <button
                                      disabled
                                      className="btn btn-gradient"
                                      onClick={stake}
                                    >
                                      {" "}
                                      Please Wait
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-gradient"
                                      onClick={stake}
                                    >
                                      {" "}
                                      {StakeText}
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="text-center">
                                  <button
                                    className="btn btn-gradient"
                                    disabled
                                    style={{ backgroundColor: "grey" }}
                                  >
                                    {" "}
                                    Connect Wallet
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="tab-content" id="tab-content-2">
                          <div className="it-title">
                            <p>Instantly Unstake Miyamoto</p>
                          </div>
                          <div className="row">
                            <div className="col-lg-6 videoCon">
                              <div className="videoBox">
                                <div className="videoInner">
                                  <VideoPlayer
                                    className="video"
                                    src={Video}
                                    poster={Video3}
                                    width="420"
                                    height="250"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="content-search">
                                <div className="content-search-common content-search-left">
                                  <div className="content-search-top">
                                    <span className="search-balance mr-1">
                                      Amount
                                    </span>
                                    <div className="search-bal-middle">
                                      <div className="total">
                                        <span>
                                          {walletAddress ? unstake_Balance : ""}
                                        </span>
                                      </div>
                                    </div>
                                    <button
                                      className="btn-search-bal-right"
                                      onClick={maxBalance_unstake}
                                      style={{ cursor: "pointer" }}
                                    >
                                      Max
                                    </button>
                                  </div>
                                  <div className="content-search-bottom">
                                    {unstakebtn_validation == "Please Wait" ? (
                                      <input
                                        min="0"
                                        type="number"
                                        placeholder="0.0"
                                        disabled
                                        value={
                                          walletAddress
                                            ? tokenBalance_unstake
                                            : ""
                                        }
                                        onChange={unstakeBalance}
                                        className=""
                                      />
                                    ) : (
                                      <input
                                        min="0"
                                        type="number"
                                        placeholder="0.0"
                                        value={
                                          walletAddress
                                            ? tokenBalance_unstake
                                            : ""
                                        }
                                        onChange={unstakeBalance}
                                        className=""
                                      />
                                    )}
                                    <img
                                      src={RoninCoin}
                                      className="img-fluid"
                                      alt=""
                                    />

                                    <h3>MYA/BNB-LP</h3>
                                  </div>
                                  <p className="content-url">
                                    Short of MIYAMOTO? Buy from
                                    <a
                                      href="https://www.binance.com/en"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {" "}
                                      Binance{" "}
                                    </a>
                                    or
                                    <a
                                      href="https://www.coinbase.com/"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {" "}
                                      Coinbase{" "}
                                    </a>
                                  </p>
                                </div>
                              </div>

                              <div className="search-table-section">
                                <table>
                                  <tbody>
                                    <tr>
                                      <th>
                                        Rewards
                                        <div className="d-inline-block">
                                          <svg
                                            width="16px"
                                            height="16px"
                                            viewBox="0 0 576 512"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm0-338c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                                            ></path>
                                          </svg>
                                          :
                                        </div>
                                      </th>
                                      <td className="pr-3">
                                        {walletAddress ? Rewards : "0"} MYA
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>TX Fee</th>
                                      <td className="pr-3">
                                        {walletAddress ? unstakeGas : "0"} wei
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>Do you want to send Rewards</th>
                                      <td className="pr-">
                                        <div className="table-btn">
                                          <button
                                            className="btn-3 active"
                                            onClick={() => {
                                              sendReward("true");
                                            }}
                                          >
                                            Yes
                                          </button>
                                          <button
                                            className="btn-3"
                                            onClick={() => {
                                              sendReward("false");
                                            }}
                                          >
                                            No
                                          </button>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <h4 style={{ color: "red", fontSize: "16px" }}>
                                  {" "}
                                  {InsufficientBalance_unstake
                                    ? InsufficientBalance_unstake
                                    : ""}
                                </h4>
                              </div>
                              {/* <h4
                                style={{
                                  color: "red",
                                  fontSize: "16px",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <span style={{ color: "red" }}>
                                  {amountError}
                                </span>
                                {/* {Error_unstake ? Error_unstake : ""} 
                              </h4> */}

                              {walletAddress ? (
                                <div className="text-center">
                                  {unstakebtn_validation == "Please Wait" ? (
                                    <button
                                      className="btn btn-gradient"
                                      onClick={unstakeNow_Btn}
                                      disabled
                                    >
                                      {" "}
                                      Please Wait
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-gradient"
                                      onClick={unstakeNow_Btn}
                                    >
                                      {" "}
                                      Unstake Now
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="text-center">
                                  <button
                                    className="btn btn-gradient"
                                    disabled
                                    style={{ backgroundColor: "grey" }}
                                  >
                                    {" "}
                                    Connect Wallet
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
        <Footer />
      </div>
    </>
  );
};

export default Farm;
