import { React, useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import RoninCoin from "../images/ronin-coin.png";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "react-video-js-player";
import Video2 from "../images/video-2.jpg";
import Video from "../images/video.mp4";
import AbiStaking from "../components/AbiStaking.json";
import AbiErc from "../components/AbiErc20.json";
import { SmartContractToken } from "../pages/config";
import { SmartContractStaking } from "../pages/config";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  gasfeeEstimation_Stake,
  apyEstimation,
  gasfeeEstimation_unStake,
} from "../components/TransactionFees_estimation";
import { S_MYA } from "./config";
import AbiSmya from "../components/AbiSmya.json";
import StakingCalculations from "./StakingCalculations";
const Stake = () => {
  const [unstakeBtnFn, setunstake_Btn] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletDetail, setwalletDetail] = useState("");
  const [tokenBalance_unstake, settokenBalance_unstake] = useState("");
  const [inSufficientBalance, setInsufficientBalance] = useState("");
  const [stakeNow, setStakeNow] = useState("");
  const [unstakeNow, setUnstakeNow] = useState("");
  const [stakingPeriod, setstakingPeriod] = useState("100");
  const [stakeAmount, setStakeAmount] = useState("");
  const [stakingReward, setStakingReward] = useState("");
  const [buttonStaking, setbuttonStaking] = useState("Stake Now");
  const [maxStake, setMaxStake] = useState("");
  const [Walletbalance, setWalletbalance] = useState("");
  const [Staking_value, setStaking_value] = useState("");
  const [Error, setError] = useState("");
  const [stakingFunction, setStakingFunction] = useState("");
  const [Error_Unstake, setError_Unstake] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [txFee, settxFee] = useState("0");
  const [ApyPercent, setApyPercent] = useState("");
  const [txFee_unstake, settxFee_unstake] = useState("");
  const [amountError, setAmountError] = useState("");
  const [stakingError, setStakingError] = useState("");
  const [unstaking_value, setunstaking_value] = useState("");
  const [availableAmount, setavailableAmount] = useState("");
  const [availableRewards, setavailableRewards] = useState("");
  const walletInfo = useSelector((state) => state.walletDetail);
  const { walletData } = walletInfo;
  let flagData = JSON.parse(localStorage.getItem("isFlag"));

  setTimeout(() => {
    // console.log("...........................................2");
    var walletDatas = walletData;
    setwalletDetail(walletDatas);
    setWalletAddress(walletDatas.account);
    setWalletbalance(walletDatas.tokenBalance);
    // console.log(walletAddress, Walletbalance, "121");
    setMaxStake("0");
    if (walletDatas) {
      setStakeNow("Stake Now");
      setUnstakeNow("Unstake Now");
      const walletDatabalance = Number(walletDatas.tokenBalance).toFixed(2);
      setMaxStake(walletDatabalance);
    }
    if (!walletDatas) {
      setMaxStake(0);
    }
  }, 0);

  useEffect(() => {
    // console.log(StakingCalculations.available());

    const walletDatas = walletData; //JSON.parse(localStorage.getItem("walletDetails"));
    setwalletDetail(walletDatas);
    setWalletAddress(walletDatas.account);
    if (walletDatas) {
      setStakeNow("Stake Now");
      setUnstakeNow("Unstake Now");
      const max = [walletDatas.tokenBalance].toString();
      const max_balance = max.slice(0, max.indexOf(".") + 2 + 3);
      setMaxStake(max_balance);
    }
    if (!walletDatas) {
      setMaxStake(0);
    }
  }, []);

  const unstake = async () => {
    // console.log("unstake");

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
    console.log("**", stakingContract);

    const address = await provider.listAccounts();
    const wallet_address = address[0];
    console.log(wallet_address);
  };
  useEffect(() => {
    if (flagData == true) {
      unstake();
      const fn = async () => {
        const Available = await available();
        setavailableAmount(Available[0]);
        console.log(Available, Available[0], Available[1]);
        setavailableRewards(Available[1]);
      };
      fn();
    }
  }, []);

  let handleValidation = () => {
    let amtError = "";
    let stackError = "";
    let formIsValid = true;

    if (!Staking_value) {
      amtError = "Please enter amount.";
      formIsValid = false;
    }

    if (!stakingPeriod) {
      stackError = "Please select staking.";
      formIsValid = false;
    }
    if (walletDetail.tokenBalance < stakeAmount) {
      // stackError = "Insufficient Wallet Balance.";
      formIsValid = false;
    }
    if (stakeAmount == 0) {
      // stackError = "Insufficient Wallet Balance.";
      amtError = "Please enter amount above 0";
      formIsValid = false;
    }

    setbuttonStaking("Stake Now");
    setAmountError(amtError);
    setStakingError(stackError);

    return formIsValid;
  };

  const stakeBalance = (e) => {
    var values = e.target.value;
    console.log(values, stakingPeriod);

    setStaking_value(values);
    setStakeAmount(values);
    const gasEstimate = async (values, stakingPeriod) => {
      const estimate = await gasfeeEstimation_Stake(values, stakingPeriod);
      console.log(estimate, "951");
      settxFee(estimate);
    };
    gasEstimate(values, stakingPeriod);

    if (
      walletDetail.tokenBalance >= values ||
      walletDetail.tokenBalance === values
    ) {
      setInsufficientBalance("");
      setStakeAmount(values);
    }
    if (walletDetail.tokenBalance < values) {
      console.log(values);
      setInsufficientBalance("Insufficient Wallet Balance.");
    }
  };

  const stakingTime = (value) => {
    console.log("value------------------>", value);
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
      setstakingPeriod(value);
      const xyz = async () => {
        console.log("**");
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
        console.log("**", stakingContract);
        try {
          const Rates = await stakingContract.getAllRates();
          console.log("Rates--------->", Rates);
          if (value == 100) {
            console.log(
              "res-------------------->",
              Rates[0].toNumber(),
              "...rates.0.."
            );
            setStakingReward(Rates[0].toNumber());
          } else if (value == 1814400) {
            console.log(Rates[1].toNumber(), "...rates.1..");
            setStakingReward(Rates[1].toNumber());
          } else if (value == 7776000) {
            console.log(Rates[2].toNumber(), "...rates.2..");
            setStakingReward(Rates[2].toNumber());
          }

          //  console.log(Rates[0].toNumber(), "...rates...");
        } catch (error) {
          console.log(error);
        }
      };
      xyz();
    }
  };
  const approve = async () => {
    console.log(stakeAmount, stakingPeriod);
    let formIsValid = handleValidation();
    if (formIsValid) {
      setStakingFunction("True");
      const web3Modal = new Web3Modal({
        network: "bsc testnet",
        cacheProvider: true,
      });

      const connection = await web3Modal.connect();

      const provider = new ethers.providers.Web3Provider(connection);

      const signer = provider.getSigner();

      try {
        const mya = new ethers.Contract(SmartContractToken, AbiErc, signer);
        console.log("11", stakeAmount, typeof stakeAmount, "...2");
        var stakeAm = ethers.utils.parseEther(stakeAmount);
        stakeAm = stakeAm.toString();
        console.log(stakeAm);
        setStakeAmount("");
        setStakeAmount(stakeAm);
        console.log(stakeAmount);
        // const token = await mya.approve(SmartContractStaking, stakeAm);
        // const result = await token.wait();

        // setstatus(false);

        console.log(stakeAm, stakingPeriod);

        const staking = new ethers.Contract(
          SmartContractStaking,
          AbiStaking,
          signer
        );

        const stake = await staking.stake(stakeAm, stakingPeriod);
        const stk = await stake.wait();
        toast.success("Stake  Success");
        setStakingFunction("False");
        var myaContract = new ethers.Contract(
          SmartContractToken,
          AbiErc,
          signer
        );

        const balanceupdate2 = async () => {
          var balance = await myaContract.balanceOf(walletAddress);
          balance = ethers.utils.formatEther(balance);
          const balanceUpdate = balance.toString();
          setMaxStake(balanceUpdate);          console.log(balance.toString(), balanceUpdate);

        };

        setTimeout(balanceupdate2, 5000);
        setTimeout(balanceupdate2, 10000);

        setStaking_value("");
        setStakeAmount("");
      } catch (e) {
        console.log(e);
        toast.error("Stake  Unsuccess");
        setStakingFunction("False");
        setStaking_value("");
        setStakeAmount("");
      }
    }
  };

  const TabContent1 = () => {
    document.getElementById("tab-content-2").style.display = "none";
    document.getElementById("tab-content-1").style.display = "block";
    document.getElementById("stake").style.color = "#4AE3D0";
    document.getElementById("unstake").style.color = "white";
    setStakingError("");
    setStaking_value("");
    setInsufficientBalance("");
    setAmountError("");

    const unstake_function = async () => {
      const txfee_unstake = await gasfeeEstimation_unStake();
      settxFee_unstake(txfee_unstake);
    };
    if (flagData == true) {
      unstake();
      unstake_function();
      maxBalance_unstake();
    }
  };

  const TabContent2 = () => {
    setInsufficientBalance("");
    setStakingError("");
    document.getElementById("tab-content-1").style.display = "none";
    document.getElementById("tab-content-2").style.display = "block";
    document.getElementById("stake").style.color = "white";
    document.getElementById("unstake").style.color = "#4AE3D0";
    setUnstakeAmount("");
    setunstaking_value("");
    setStakeAmount("");
    setError_Unstake("");
    const unstake_function = async () => {
      const txfee_unstake = await gasfeeEstimation_unStake();
      console.log(txfee_unstake);
      settxFee_unstake(txfee_unstake);
    };
    if (flagData == true) {
      unstake();
      unstake_function();
      maxBalance_unstake();
    }
  };

  //unstake functions

  const maxBalance_unstake = async (e) => {
    // setUnstakeAmount(e.target.value);
    // setunstaking_value(e.target.value);
    const web3Modal = new Web3Modal({
      network: "bsc testnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const staking = new ethers.Contract(
      SmartContractStaking,
      AbiStaking,
      signer
    );
    const unstakeMax = await staking.totalStaked(walletAddress);
    const convert = Number(
      ethers.utils.formatEther(unstakeMax.toString())
    ).toFixed(2);
    console.log(convert);

    // settokenBalance_unstake(convert);
  };

  const maxBalance = () => {
    console.log(maxStake);
    setStaking_value(Number(maxStake).toFixed(2));
  };

  const unstake_fn = (e) => {
    setunstaking_value(tokenBalance_unstake);
  };

  const unstake_fn2 = (e) => {
    const value = e.target.value;
    setunstaking_value(value);
  };

  const handlevalidationsUnstake = () => {
    console.log(unstaking_value, tokenBalance_unstake);
    let amtError = "";

    let formIsValid = true;
    const unstakeval = Number(unstaking_value);
    const tkbalance = Number(tokenBalance_unstake);

    if (!unstakeval) {
      amtError = "Please enter amount.";
      formIsValid = false;
    }

    if (tkbalance < unstakeval) {
      amtError = "Insufficient Wallet Balance.";
      formIsValid = false;
    }
    if (unstakeval == 0) {
      // stackError = "Insufficient Wallet Balance.";
      amtError = "Please enter amount above 0";
      formIsValid = false;
    }

    setError_Unstake(amtError);

    return formIsValid;
  };

  const unstake_btn = async () => {
    console.log("1");
    // let handlevalidation = handlevalidationsUnstake();
    // if (handlevalidation) {
    console.log("2");
    setunstake_Btn("True");

    const web3Modal = new Web3Modal({
      network: "bsc testnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();

    const provider = new ethers.providers.Web3Provider(connection);
    try {
      const signer = provider.getSigner();

      const staking = new ethers.Contract(
        SmartContractStaking,
        AbiStaking,
        signer
      );

      const unstake = await staking.unstake();

      const ustake = await unstake.wait();

      window.location.reload();
      console.log(ustake);
      setunstake_Btn("False");
      setUnstakeAmount("");
      setunstaking_value("");
      toast.success("Unstake Success");
      setTimeout(maxBalance_unstake(), 10000);
      setTimeout(maxBalance_unstake(), 15000);
      setTimeout(maxBalance_unstake(), 20000);
    } catch (e) {
      console.log(e);
      setunstake_Btn("False");
      setUnstakeAmount("");
      setunstaking_value("");
      toast.error("Unstake Failed");
    }
  };

  const available = async () => {
    const web3Modal = new Web3Modal({
      network: "bsc testnet",
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const signer = provider.getSigner();

    const staking = new ethers.Contract(
      SmartContractStaking,
      AbiStaking,
      signer
    );
    const address = await provider.listAccounts();
    const wallet_address = address[0];
    console.log(wallet_address);

    const alltakes = await staking.getAllStakes(wallet_address);
    console.log(alltakes, "alltakes474");
    var all = [];
    var call = [];
    for (let i = 0; i < alltakes.length; i++) {
      var x = [];

      var amount = Number(ethers.utils.formatEther(alltakes[i][0].toString()));
      var end =
        Number(alltakes[i][1].toString()) + Number(alltakes[i][2].toString());
      var paid = alltakes[i][3].toString();
      console.log(paid);
      var now = new Date().valueOf();
      console.log(end*1000,typeof now)
      var rebase = Number(alltakes[i][4].toString());
      if (now > (end*1000) && paid == "false") {
        all.push(amount);
        call.push(amount * rebase * 0.5);
      }
      console.log(now);
    }

    var sumAmount = 0; // Running the for loop
    for (let i = 0; i < all.length; i++) {
      sumAmount += all[i];
    }
    settokenBalance_unstake(sumAmount);
    console.log(sumAmount);

    var sumRewards = 0; // Running the for loop
    for (let i = 0; i < call.length; i++) {
      sumRewards += call[i];
    }
    return [sumAmount, sumRewards];
  };
  // available();
  // setavailableAmount(available[0]);
  // setavailableRewards(available[1]);
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
                          <h1>
                            <a
                              onClick={TabContent1}
                              className="tab-title active"
                              id="stake"
                              style={{ color: "#4AE3D0" }}
                            >
                              Stake{" "}
                            </a>
                            <a> / </a>
                            <a
                              onClick={TabContent2}
                              className="tab-title"
                              id="unstake"
                              style={{ color: "white" }}
                            >
                              Unstake
                            </a>
                          </h1>
                        </div>

                        <div className="tab-content active" id="tab-content-1">
                          <div className="it-title">
                            <p>Instantly Stake Miyamoto</p>
                          </div>

                          <div className="row">
                            <div className="col-lg-6 videoCon">
                              <div className="videoBox">
                                <div className="videoInner">
                                  <VideoPlayer
                                    className="video"
                                    src={Video}
                                    poster={Video2}
                                    width="420"
                                    height="250"
                                  />
                                </div>
                                {stakeNow && walletAddress ? (
                                  <StakingCalculations />
                                ) : (
                                  ""
                                )}
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
                                          {" "}
                                          {stakeNow && walletAddress
                                            ? maxStake
                                            : ""}
                                        </span>

                                        <span
                                          style={{ fontSize: "0.7em" }}
                                        ></span>
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
                                    {stakingFunction == "True" ? (
                                      <input
                                        min="0"
                                        type="number"
                                        placeholder="0"
                                        name="tokenBalances"
                                        className=""
                                        disabled
                                        //     value={tokenBalances}
                                        onChange={stakeBalance}
                                      />
                                    ) : (
                                      <input
                                        min="0"
                                        type="number"
                                        placeholder="0"
                                        name="tokenBalances"
                                        className=""
                                        value={
                                          walletAddress ? Staking_value : ""
                                        }
                                        onChange={stakeBalance}
                                      />
                                    )}

                                    <img
                                      src={RoninCoin}
                                      className="img-fluid"
                                      alt=""
                                    />

                                    <h3>MYA</h3>
                                  </div>
                                  <p className="content-url">
                                    Short of MIYAMOTO? Buy from
                                    <a
                                      href="https://www.binance.com/en"
                                      target="_blank"
                                      style={{
                                        marginLeft: "5px",
                                        marginRight: "7px",
                                      }}
                                      s
                                    >
                                      Binance
                                    </a>
                                    or
                                    <a
                                      href="https://www.coinbase.com/"
                                      target="_blank"
                                      style={{
                                        marginLeft: "5px",
                                        marginRight: "7px",
                                      }}
                                    >
                                      Coinbase
                                    </a>
                                  </p>

                                  <span style={{ color: "red" }}>
                                    {amountError}
                                  </span>
                                </div>
                              </div>

                              <div className="search-table-section">
                                <table>
                                  <tbody>
                                    <tr>
                                      <th>
                                        Staking
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
                                        {stakeNow && walletAddress
                                          ? Staking_value
                                          : "0"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <th>TX Fee</th>
                                      <td className="pr-3">{txFee} wei</td>
                                    </tr>
                                    <tr>
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
                                      <td className="pr-3">{ApyPercent}</td>
                                    </tr>
                                    <tr>
                                      <th>Staking Period (Days):</th>
                                      <td className="py-0">
                                        {stakingFunction == "True" ? (
                                          <div className="table-btn">
                                            <button
                                              className="btn-3 active"
                                              disabled
                                              onClick={() => {
                                                stakingTime("100");
                                              }}
                                            >
                                              5
                                            </button>
                                            <button
                                              className="btn-3"
                                              disabled
                                              onClick={() => {
                                                stakingTime("200");
                                              }}
                                            >
                                              21
                                            </button>
                                            <button
                                              className="btn-3"
                                              disabled
                                              onClick={() => {
                                                stakingTime("300");
                                              }}
                                            >
                                              90
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="table-btn">
                                            <button
                                              className="btn-3 active"
                                              onClick={() => {
                                                stakingTime("100");
                                              }}
                                            >
                                              5
                                            </button>
                                            <button
                                              className="btn-3"
                                              onClick={() => {
                                                stakingTime("200");
                                              }}
                                            >
                                              21
                                            </button>
                                            <button
                                              className="btn-3"
                                              onClick={() => {
                                                stakingTime("300");
                                              }}
                                            >
                                              90
                                            </button>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <h4
                                style={{
                                  color: "red",
                                  fontSize: "16px",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                {inSufficientBalance ? inSufficientBalance : ""}
                              </h4>
                              <h4
                                style={{
                                  color: "red",
                                  fontSize: "16px",
                                  marginBottom: "10px",
                                }}
                              >
                                {" "}
                                <span style={{ color: "red" }}>
                                  {stakingError}
                                </span>
                                {/* {Error ? Error : ""} */}
                              </h4>

                              {/* <p style={{ fontSize: "12px" }}>
                                {" "}
                                For Staking MYA Token -You need to first Approve
                                then Stake{" "}
                              </p> */}

                              {stakeNow && walletAddress ? (
                                <div className="text-center">
                                  {stakingFunction == "True" ? (
                                    <button
                                      className="btn btn-gradient"
                                      disabled
                                    >
                                      {" "}
                                      Please Wait
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-gradient"
                                      onClick={
                                        buttonStaking === "Stake Now"
                                          ? approve
                                          : approve
                                      }
                                    >
                                      {" "}
                                      {buttonStaking}
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="text-center">
                                  <button className="btn btn-gradient" disabled>
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
                                    poster={Video2}
                                    width="420"
                                    height="250"
                                  />
                                </div>
                                {stakeNow && walletAddress ? (
                                  <StakingCalculations />
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="col-lg-6">
                              <div className="content-search">
                                <div className="content-search-common content-search-left">
                                  <div className="content-search-top">
                                    <span className="search-balance mr-1">
                                      Available Amount
                                    </span>
                                    <div className="search-bal-middle">
                                      <div className="total">
                                        {/* <span> {tokenBalance_unstake}</span> */}
                                      </div>
                                    </div>
                                    {/* <buttons
                                      className="btn-search-bal-right"
                                      onClick={unstake_fn}
                                      style={{ cursor: "pointer" }}
                                    >
                                      Max
                                    </buttons> */}
                                  </div>
                                  <div className="content-search-bottom">
                                    <input
                                      min="0"
                                      type="number"
                                      placeholder="0"
                                      onChange={unstake_fn2}
                                      disabled
                                      className=""
                                      value={
                                        walletAddress ? availableAmount : ""
                                      }
                                    />
                                    <img
                                      src={RoninCoin}
                                      className="img-fluid"
                                      alt=""
                                    />

                                    <h3>MYA</h3>
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
                                        Unstaking
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
                                        {stakeNow && walletAddress
                                          ? unstaking_value
                                          : "0"}
                                      </td>
                                    </tr>

                                    <tr>
                                      <th>TX Fee</th>
                                      <td className="pr-3">
                                        {stakeNow && walletAddress
                                          ? txFee_unstake
                                          : "0"}{" "}
                                        wei
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <h5 style={{ color: "red", fontSize: "16px" }}>
                                {" "}
                                {/* {inSufficientBalance ? inSufficientBalance : ""} */}
                              </h5>

                              <h5 style={{ color: "red", fontSize: "16px" }}>
                                {" "}
                                {Error_Unstake ? Error_Unstake : ""}
                              </h5>
                              {unstakeNow && walletAddress ? (
                                <div className="text-center">
                                  {unstakeBtnFn == "True" ? (
                                    <button
                                      className="btn btn-gradient"
                                      disabled
                                      onClick={unstake_btn}
                                    >
                                      Please Wait
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-gradient"
                                      onClick={unstake_btn}
                                    >
                                      {" "}
                                      Unstake Now
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <div className="text-center">
                                  <button className="btn btn-gradient" disabled>
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

export default Stake;
