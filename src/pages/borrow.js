import { React, useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "react-video-js-player";
import Video2 from "../images/video-2.jpg";
import Video from "../images/video.mp4";
import { useSelector } from "react-redux";
import Chainlink from "../images/Chainlink.png";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Deposit,
  Borrow_Amount,
  withdraw_Amount,
  Return_Amount,
  initialAmount_Balance,
} from "./Borrow_calculations";
// import Bnb from "../images/bnb.svg";
import RoninCoin from "../images/ronin-coin.png";

const Borrow = () => {
  const [DepositButton, setDepositButton] = useState("Deposit");
  const [BorrowButton, setBorrowButton] = useState("Borrow");
  const [ReturnButton, setReturnButton] = useState("Return");
  const [WithdrawButton, setWithdrawButton] = useState("Withdraw");
  const [depositAmmount, setdepositAmmount] = useState("");
  const [BorrowAmmount, setBorrowAmmount] = useState("");
  const [ReturnAmount, setReturnAmount] = useState("");
  const [WithdrawalAmount, setWithdrawalAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [amountError, setAmountError] = useState("");
  const [borrowAmountError, setBorrowAmountError] = useState("");
  const [returnmountError, setReturnAmountError] = useState("");
  const [withdrawamountError, setWithdrawAmountError] = useState("");
  const [ChainlinkBalance, setChainlinkBalance] = useState("");
  const [BorrowBalance, setBorrowBalance] = useState("");
  const [ReturnBalance, setReturnBalance] = useState("");
  const [WithdrawBalance, setWithdrawBalance] = useState("");
  const [walletDetail, setwalletDetail] = useState("");

  const walletInfo = useSelector((state) => state.walletDetail);
  const { walletData } = walletInfo;
  let flagData = JSON.parse(localStorage.getItem("isFlag"));

  setTimeout(() => {
    var walletDatas = walletData;
    if (walletDatas) {
      setwalletDetail(walletDatas);
      setWalletAddress(walletDatas.account);
      console.log(walletAddress);
    }
  }, 0);

  useEffect(() => {
    if (flagData == true) {
      const chainlinkCalculate = async () => {
        const maxLink = await initialAmount_Balance();
        console.log(maxLink, "..........................................1");
        const linkBalance = (Number(maxLink[0]) - 0.1).toFixed(3);

        console.log(linkBalance);

        if (linkBalance) {
          setChainlinkBalance(linkBalance);
        }
      };
      chainlinkCalculate();
    }
  }, []);

  let handleValidationDeposit = () => {
    let amtError = "";
    let formIsValid = true;
    const chainLinkBlnc = Number(ChainlinkBalance);
    const depositAmt = Number(depositAmmount);
    if (!depositAmmount.trim()) {
      amtError = "Please enter amount.";
      formIsValid = false;
    } else if (chainLinkBlnc < depositAmt) {
      amtError = "Insufficient Wallet Balance.";
      formIsValid = false;
    } else if (depositAmmount == 0) {
      amtError = "Please enter amount above 0.";
      formIsValid = false;
    }
    setAmountError(amtError);
    return formIsValid;
  };

  let handleValidationBorrow = () => {
    let brrowError = "";
    let formIsValid = true;
    const borrowBlnc = Number(BorrowBalance);
    const BorrowAmmt = Number(BorrowAmmount);
    if (!BorrowAmmount.trim()) {
      brrowError = "Please enter amount.";
      formIsValid = false;
    } else if (borrowBlnc < BorrowAmmt) {
      brrowError = "Insufficient Wallet Balance.";
      formIsValid = false;
    } else if (BorrowAmmt == 0) {
      brrowError = "Please enter amount above 0.";
      formIsValid = false;
    }
    // setBorrowButton("Borrow ");
    setBorrowAmountError(brrowError);
    return formIsValid;
  };

  let handleValidationReturn = () => {
    let returnError = "";
    let formIsValid = true;
    const ReturnBalanc = Number(ReturnBalance);
    const ReturnAmt = Number(ReturnAmount);
    if (!ReturnAmount.trim()) {
      returnError = "Please enter amount.";
      formIsValid = false;
    } else if (ReturnBalanc < ReturnAmt) {
      returnError = "Insufficient Wallet Balance.";
      formIsValid = false;
    } else if (ReturnAmt == 0) {
      returnError = "Please enter amount above 0.";
      formIsValid = false;
    }
    // setReturnButton("Return ");
    setReturnAmountError(returnError);
    return formIsValid;
  };

  let handleValidationWithdraw = () => {
    let withrawError = "";
    let formIsValid = true;
    const WithdrawBalanc = Number(WithdrawBalance);
    const WithdrawalAmt = Number(WithdrawalAmount);
    if (!WithdrawalAmount.trim()) {
      withrawError = "Please enter amount.";
      formIsValid = false;
    } else if (WithdrawBalanc < WithdrawalAmt) {
      withrawError = "Insufficient Wallet Balance.";
      formIsValid = false;
    } else if (WithdrawalAmt == 0) {
      withrawError = "Please enter amount above 0.";
      formIsValid = false;
    }
    // setWithdrawButton("Return ");
    setWithdrawAmountError(withrawError);
    return formIsValid;
  };

  const Deposit_ammount = (value) => {
    console.log(value);
    setdepositAmmount(String(value));
  };
  const Deposit_Now = async () => {
    let formIsValid = handleValidationDeposit();
    if (formIsValid) {
      setDepositButton("Please Wait");
      try {
        if (await Deposit(depositAmmount)) {
          const balancedeposit = await initialAmount_Balance();

          setdepositAmmount("");

          const balanceupdate = async () => {
            const maxLink = await initialAmount_Balance();
            const linkBalance = (Number(maxLink[0]) - 0.1).toFixed(3);

            if (linkBalance) {
              setChainlinkBalance(linkBalance);
            }
          };
          const balanceupdate2 = async () => {
            toast.success("Deposit Success");
            setDepositButton("Deposit");
          };
          setTimeout(balanceupdate, 20000);
          setTimeout(balanceupdate, 15000);
          setTimeout(balanceupdate, 10000);
          setTimeout(balanceupdate2, 13000);
        }
      } catch (e) {
        console.log(e);
        setDepositButton("Deposit");
        setdepositAmmount("");
        toast.error("Deposit Unsuccess");
      }
    }
  };
  const Borrow_ammount = (value) => {
    console.log(value);
    // value = (value * 10 ** 18));
    setBorrowAmmount(String(value));
  };

  const Borrow_Now = async () => {
    let formIsValid = handleValidationBorrow();
    if (formIsValid) {
      setBorrowButton("Please Wait");
      try {
        if (await Borrow_Amount(BorrowAmmount)) {
          setBorrowAmmount("");
          console.log(" Borrow_Now");

          const balanceupdate = async () => {
            const maxBorrow = await initialAmount_Balance();

            const borrowBalance = Number(maxBorrow[1]).toFixed(2);

            console.log(borrowBalance);

            setBorrowBalance(borrowBalance);
          };
          const balanceupdate2 = async () => {
            toast.success("Borrow Success");
            setBorrowButton("Borrow ");
          };

          setTimeout(balanceupdate, 10000);
          setTimeout(balanceupdate, 15000);
          setTimeout(balanceupdate, 20000);

          setTimeout(balanceupdate2, 13000);
        }
      } catch (e) {
        setBorrowButton("Borrow ");
        setBorrowAmmount("");
        toast.error("Borrow Unsuccess");
      }
    }
  };
  const Return_ammount = (value) => {
    console.log(value);
    setReturnAmount(String(value));
    console.log(ReturnAmount);
  };
  const Return_Now = async () => {
    let formIsValid = handleValidationReturn();

    if (formIsValid) {
      setReturnButton("Please Wait");
      try {
        if (await Return_Amount(ReturnAmount)) {
          console.log(" Return_Now", ReturnAmount);

          setReturnAmount("");

          const balanceupdate = async () => {
            const maxReturn = await initialAmount_Balance();

            const ReturnBalance = Number(maxReturn[2]).toFixed(2);

            console.log(ReturnBalance);

            setReturnBalance(ReturnBalance);
          };

          const balanceupdate2 = async () => {
            toast.success("Return Success");
            setReturnButton("Return");
          };
          setTimeout(balanceupdate, 20000);
          setTimeout(balanceupdate, 10000);
          setTimeout(balanceupdate, 15000);
          setTimeout(balanceupdate2, 13000);
        }
      } catch (e) {
        console.log(e, "errorr");
        toast.error("Return Unsuccess");
        setReturnButton("Return");
        setReturnAmount("");
      }
    }
  };

  const Withdraw_ammount = (value) => {
    console.log(value);
    setWithdrawalAmount(String(value));
    console.log(WithdrawalAmount);
  };

  const Withdraw_Now = async () => {
    let formIsValid = handleValidationWithdraw();
    if (formIsValid) {
      setWithdrawButton("Please Wait");
      try {
        if (await withdraw_Amount(WithdrawalAmount)) {
          setWithdrawalAmount("");
          console.log(" Withdraw_Now", WithdrawalAmount);

          const balanceupdate = async () => {
            const maxWithdraw = await initialAmount_Balance();
            console.log(
              maxWithdraw,
              "..........................................2"
            );
            const WithdrawBalance1 = Number(maxWithdraw[3]).toFixed(2);

            console.log(WithdrawBalance1);

            setWithdrawBalance(WithdrawBalance1);
          };
          const balanceupdate2 = async () => {
            toast.success("Withdraw Success");
            setWithdrawButton("Withdraw");
          };

          setTimeout(balanceupdate, 20000);
          setTimeout(balanceupdate, 10000);
          setTimeout(balanceupdate, 15000);
          setTimeout(balanceupdate2, 13000);
        }
      } catch (e) {
        setWithdrawButton("Withdraw");
        setWithdrawalAmount("");
        toast.error("Withdraw Unsuccess");
      }
    }
  };

  const TabContent1 = () => {
    document.getElementById("tab-content-1").style.display = "block";
    document.getElementById("tab-content-2").style.display = "none";
    document.getElementById("tab-content-3").style.display = "none";
    document.getElementById("tab-content-4").style.display = "none";
    document.getElementById("deposit").style.color = "#4AE3D0";
    document.getElementById("borrow").style.color = "white";
    document.getElementById("return").style.color = "white";
    document.getElementById("withdraw").style.color = "white";
    setWithdrawalAmount("");
    setBorrowAmmount("");
    setdepositAmmount("");
    setReturnAmount("");
    setWithdrawAmountError("");
    setBorrowAmountError("");
    setReturnAmountError("");
    setAmountError("");
    if (flagData == true) {
      const chainlinkCalculate = async () => {
        const maxLink = await initialAmount_Balance();
        console.log(maxLink, "..........................................1");
        const linkBalance = Number(maxLink[0]).toFixed(3) - 0.1;

        console.log(linkBalance);

        if (linkBalance) {
          setChainlinkBalance(linkBalance);
        }
      };
      chainlinkCalculate();
    }
  };

  const TabContent2 = () => {
    document.getElementById("tab-content-1").style.display = "none";
    document.getElementById("tab-content-2").style.display = "block";
    document.getElementById("tab-content-3").style.display = "none";
    document.getElementById("tab-content-4").style.display = "none";
    document.getElementById("deposit").style.color = "white";
    document.getElementById("borrow").style.color = "#4AE3D0";
    document.getElementById("return").style.color = "white";
    document.getElementById("withdraw").style.color = "white";

    setWithdrawalAmount("");
    setBorrowAmmount("");
    setdepositAmmount("");
    setReturnAmount("");
    setWithdrawAmountError("");
    setBorrowAmountError("");
    setReturnAmountError("");
    setAmountError("");

    if (flagData == true) {
      const MaxBorrow_Calculate = async () => {
        const maxBorrow = await initialAmount_Balance();
        console.log(maxBorrow, "..........................................2");
        const borrowBalance = Number(maxBorrow[1]).toFixed(2);

        console.log(borrowBalance);

        if (borrowBalance < 0) {
          setBorrowBalance("0");
        } else {
          setBorrowBalance(borrowBalance);
        }
      };
      MaxBorrow_Calculate();
    }
  };
  const TabContent3 = () => {
    document.getElementById("tab-content-1").style.display = "none";
    document.getElementById("tab-content-2").style.display = "none";
    document.getElementById("tab-content-3").style.display = "block";
    document.getElementById("tab-content-4").style.display = "none";
    document.getElementById("deposit").style.color = "white";
    document.getElementById("borrow").style.color = "white";
    document.getElementById("return").style.color = "#4AE3D0";
    document.getElementById("withdraw").style.color = "white";

    setWithdrawalAmount("");
    setBorrowAmmount("");
    setdepositAmmount("");
    setReturnAmount("");
    setWithdrawAmountError("");
    setBorrowAmountError("");
    setReturnAmountError("");
    setAmountError("");

    if (flagData == true) {
      const MaxReturn_Calculate = async () => {
        const maxReturn = await initialAmount_Balance();
        console.log(maxReturn, "..........................................2");
        const ReturnBalance = Number(maxReturn[2]).toFixed(2);

        console.log(ReturnBalance);

        if (ReturnBalance < 0) {
          setReturnBalance("0");
        } else {
          setReturnBalance(ReturnBalance);
        }
      };
      MaxReturn_Calculate();
    }
  };
  const TabContent4 = () => {
    document.getElementById("tab-content-1").style.display = "none";
    document.getElementById("tab-content-2").style.display = "none";
    document.getElementById("tab-content-3").style.display = "none";
    document.getElementById("tab-content-4").style.display = "block";
    document.getElementById("deposit").style.color = "white";
    document.getElementById("borrow").style.color = "white";
    document.getElementById("return").style.color = "white";
    document.getElementById("withdraw").style.color = "#4AE3D0";
    setWithdrawalAmount("");
    setBorrowAmmount("");
    setdepositAmmount("");
    setReturnAmount("");
    setWithdrawAmountError("");
    setBorrowAmountError("");
    setReturnAmountError("");
    setAmountError("");

    if (flagData == true) {
      const MaxWithdraw_Calculate = async () => {
        const maxWithdraw = await initialAmount_Balance();
        console.log(maxWithdraw, "..........................................2");
        const WithdrawBalance1 = Number(maxWithdraw[3]).toFixed(2);

        console.log(WithdrawBalance1);

        if (WithdrawBalance1 <= 0) {
          setWithdrawBalance("0");
        } else {
          setWithdrawBalance(WithdrawBalance1);
        }
      };
      MaxWithdraw_Calculate();
    }
  };

  const max_chainlink = () => {
    setdepositAmmount(ChainlinkBalance);
  };

  const max_borrow = () => {
    console.log("BorrowBalance", BorrowBalance);
    setBorrowAmmount(BorrowBalance);
  };

  const maxReturnFn = () => {
    console.log("ReturnBalance");
    setReturnAmount(ReturnBalance);
    // console.log(ReturnBalance);
  };
  const max_withdrawFn = () => {
    console.log("222");
    setWithdrawalAmount(WithdrawBalance);
  };
  return (
    <>
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
                            id="deposit"
                            style={{ color: "#4AE3D0" }}
                          >
                            Deposit
                          </a>
                          /
                          <a
                            onClick={TabContent2}
                            className="tab-title active"
                            id="borrow"
                            style={{ color: "white" }}
                          >
                            Borrow
                          </a>{" "}
                          /
                          <a
                            onClick={TabContent3}
                            className="tab-title active"
                            id="return"
                            style={{ color: "white" }}
                          >
                            Return
                          </a>
                          /
                          <a
                            onClick={TabContent4}
                            className="tab-title active"
                            id="withdraw"
                            style={{ color: "white" }}
                          >
                            Withdraw
                          </a>
                        </h1>
                      </div>

                      <div className="tab-content active" id="tab-content-1">
                        <div className="it-title">
                          <p>Instantly Deposit LINK</p>
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
                                        {walletAddress ? ChainlinkBalance : ""}{" "}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    className="btn-search-bal-right"
                                    onClick={max_chainlink}
                                  >
                                    Max
                                  </button>
                                </div>
                                <div className="content-search-bottom">
                                  {DepositButton == "Please Wait" ? (
                                    <input
                                      min="0"
                                      type="number"
                                      placeholder="0"
                                      value={
                                        walletAddress ? depositAmmount : ""
                                      }
                                      disabled
                                      className=""
                                      onChange={(e) => {
                                        Deposit_ammount(
                                          e.target.value
                                          // e.target.value
                                        );
                                      }}
                                    />
                                  ) : (
                                    <input
                                      min="0"
                                      type="number"
                                      placeholder="0"
                                      value={
                                        walletAddress ? depositAmmount : ""
                                      }
                                      className=""
                                      onChange={(e) => {
                                        Deposit_ammount(
                                          e.target.value
                                          // e.target.value
                                        );
                                      }}
                                    />
                                  )}

                                  <img
                                    src={Chainlink}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <h3>Link</h3>
                                </div>
                                <span style={{ color: "red" }}>
                                  {amountError}
                                </span>
                              </div>

                              <div
                                className="text-center"
                                style={{
                                  marginTop: "4vh",
                                  marginBottom: "4vh",
                                }}
                              >
                                {walletAddress ? (
                                  <div className="text-center">
                                    {DepositButton == "Please Wait" ? (
                                      <button
                                        className="btn btn-gradient"
                                        onClick={Deposit_Now}
                                        disabled
                                      >
                                        {" "}
                                        Please Wait
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-gradient"
                                        onClick={Deposit_Now}
                                      >
                                        {" "}
                                        Deposit
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <button
                                      className="btn btn-gradient"
                                      disabled
                                    >
                                      {" "}
                                      Connect Wallet
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="search-table-section">
                              <table>
                                <tbody>
                                  {/* <tr>
                                    <th>
                                      Borrowing
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
                                    <td className="pr-3">0</td>
                                  </tr> */}

                                  {/* <tr>
                                    <th>TX Fee</th>
                                    <td className="pr-3">0</td>
                                  </tr>
                                  <tr>
                                    <th>
                                      Interest{" "}
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
                                    <td className="pr-3">0%</td>
                                  </tr> */}
                                  {/* <tr>
                                    <th>Loan Period (Days):</th>
                                    <td className="py-0">
                                      <div className="table-btn">
                                        <button className="active">30</button>
                                        <button>90</button>
                                        <button>180</button>
                                      </div>
                                    </td>
                                  </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tab-content " id="tab-content-2">
                        <div className="it-title">
                          <p>Instantly Borrow MIYAMOTO</p>
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
                                        {walletAddress ? BorrowBalance : ""}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    className="btn-search-bal-right"
                                    onClick={max_borrow}
                                  >
                                    Max
                                  </button>
                                </div>
                                <div className="content-search-bottom">
                                  {BorrowButton == "Please Wait" ? (
                                    <input
                                      min="0"
                                      type="number"
                                      placeholder="0.0"
                                      value={walletAddress ? BorrowAmmount : ""}
                                      disabled
                                      className=""
                                      onChange={(e) => {
                                        Borrow_ammount(
                                          e.target.value
                                          // e.target.value
                                        );
                                      }}
                                    />
                                  ) : (
                                    <input
                                      min="0"
                                      type="number"
                                      placeholder="0.0"
                                      value={walletAddress ? BorrowAmmount : ""}
                                      className=""
                                      onChange={(e) => {
                                        Borrow_ammount(
                                          e.target.value
                                          // e.target.value
                                        );
                                      }}
                                    />
                                  )}

                                  {/* <img src={Bnb} className="img-fluid" alt="" />

                                  <h3>BNB</h3> */}

                                  <img
                                    src={RoninCoin}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <h3>MYA</h3>
                                </div>
                                <span style={{ color: "red" }}>
                                  {borrowAmountError}
                                </span>
                              </div>

                              {/* <div className="content-search-middle">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M508.485 184.485l-92.485 92c-4.687 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.687-4.686-4.687-12.284 0-16.971L452.893 192H12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h440.905l-60.946-60.444c-4.687-4.686-4.687-12.284 0-16.971l7.07-7.07c4.687-4.686 12.284-4.686 16.971 0l92.485 92c4.687 4.686 4.686 12.284 0 16.97zm-504.97 160l92.485 92c4.687 4.686 12.284 4.686 16.971 0l7.07-7.07c4.687-4.686 4.687-12.284 0-16.971L59.095 352H500c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H59.107l60.934-60.444c4.687-4.686 4.687-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.687-16.97 0l-92.485 92c-4.686 4.686-4.687 12.284 0 16.97z"
                                  ></path>
                                </svg>
                              </div> */}

                              <div
                                className="text-center"
                                style={{
                                  marginTop: "4vh",
                                  marginBottom: "4vh",
                                }}
                              >
                                {walletAddress ? (
                                  <div className="text-center">
                                    {BorrowButton == "Please Wait" ? (
                                      <button
                                        className="btn btn-gradient"
                                        onClick={Borrow_Now}
                                        disabled
                                      >
                                        {" "}
                                        Please Wait
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-gradient"
                                        onClick={Borrow_Now}
                                      >
                                        {" "}
                                        Borrow
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <button
                                      className="btn btn-gradient"
                                      disabled
                                    >
                                      {" "}
                                      Connect Wallet
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="search-table-section">
                              <table>
                                <tbody>
                                  {/* <tr>
                                    <th>
                                      Borrowing
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
                                    <td className="pr-3">0</td>
                                  </tr> */}

                                  {/* <tr>
                                    <th>TX Fee</th>
                                    <td className="pr-3">0</td>
                                  </tr>
                                  <tr>
                                    <th>
                                      Interest{" "}
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
                                    <td className="pr-3">0%</td>
                                  </tr> */}
                                  {/* <tr>
                                    <th>Loan Period (Days):</th>
                                    <td className="py-0">
                                      <div className="table-btn">
                                        <button className="active">30</button>
                                        <button>90</button>
                                        <button>180</button>
                                      </div>
                                    </td>
                                  </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tab-content" id="tab-content-3">
                        <div className="it-title">
                          <p>Instantly Return MIYAMOTO</p>
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
                                        {walletAddress ? ReturnBalance : ""}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    className="btn-search-bal-right"
                                    onClick={maxReturnFn}
                                  >
                                    Max
                                  </button>
                                </div>
                                <div className="content-search-bottom">
                                  {ReturnButton == "Please Wait" ? (
                                    <input
                                      min="0"
                                      type="number"
                                      disabled
                                      placeholder="0.0"
                                      value={walletAddress ? ReturnAmount : ""}
                                      className=""
                                      onChange={(e) => {
                                        Return_ammount(
                                          e.target.value
                                          // e.target.value
                                        );
                                      }}
                                    />
                                  ) : (
                                    <input
                                      min="0"
                                      type="number"
                                      placeholder="0.0"
                                      value={walletAddress ? ReturnAmount : ""}
                                      className=""
                                      onChange={(e) => {
                                        Return_ammount(
                                          e.target.value
                                          // e.target.value
                                        );
                                      }}
                                    />
                                  )}

                                  {/* <img src={Bnb} className="img-fluid" alt="" />

                                  <h3>BNB</h3> */}

                                  <img
                                    src={RoninCoin}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <h3>MYA</h3>
                                </div>
                                <span style={{ color: "red" }}>
                                  {returnmountError}
                                </span>
                              </div>

                              {/* <div className="content-search-middle">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M508.485 184.485l-92.485 92c-4.687 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.687-4.686-4.687-12.284 0-16.971L452.893 192H12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h440.905l-60.946-60.444c-4.687-4.686-4.687-12.284 0-16.971l7.07-7.07c4.687-4.686 12.284-4.686 16.971 0l92.485 92c4.687 4.686 4.686 12.284 0 16.97zm-504.97 160l92.485 92c4.687 4.686 12.284 4.686 16.971 0l7.07-7.07c4.687-4.686 4.687-12.284 0-16.971L59.095 352H500c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H59.107l60.934-60.444c4.687-4.686 4.687-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.687-16.97 0l-92.485 92c-4.686 4.686-4.687 12.284 0 16.97z"
                                  ></path>
                                </svg>
                              </div> */}

                              <div
                                className="text-center"
                                style={{
                                  marginTop: "4vh",
                                  marginBottom: "4vh",
                                }}
                              >
                                {walletAddress ? (
                                  <div className="text-center">
                                    {ReturnButton == "Please Wait" ? (
                                      <button
                                        className="btn btn-gradient"
                                        onClick={Return_Now}
                                        disabled
                                      >
                                        {" "}
                                        Please Wait
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-gradient"
                                        onClick={Return_Now}
                                      >
                                        {" "}
                                        Return
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <button
                                      className="btn btn-gradient"
                                      disabled
                                    >
                                      {" "}
                                      Connect Wallet
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="search-table-section">
                              <table>
                                <tbody>
                                  {/* <tr>
                                    <th>
                                      Borrowing
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
                                    <td className="pr-3">0</td>
                                  </tr> */}

                                  {/* <tr>
                                    <th>TX Fee</th>
                                    <td className="pr-3">0</td>
                                  </tr>
                                  <tr>
                                    <th>
                                      Interest{" "}
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
                                    <td className="pr-3">0%</td>
                                  </tr> */}
                                  {/* <tr>
                                    <th>Loan Period (Days):</th>
                                    <td className="py-0">
                                      <div className="table-btn">
                                        <button className="active">30</button>
                                        <button>90</button>
                                        <button>180</button>
                                      </div>
                                    </td>
                                  </tr> */}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="tab-content " id="tab-content-4">
                        <div className="it-title">
                          <p>Instantly Withdraw LINK</p>
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
                                        {walletAddress ? WithdrawBalance : ""}
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    className="btn-search-bal-right"
                                    onClick={max_withdrawFn}
                                  >
                                    Max
                                  </button>
                                </div>
                                <div className="content-search-bottom">
                                  {WithdrawButton == "Please Wait" ? (
                                    <input
                                      min="0"
                                      type="number"
                                      placeholder="0.0"
                                      disabled
                                      value={
                                        walletAddress ? WithdrawalAmount : ""
                                      }
                                      className=""
                                      onChange={(e) => {
                                        Withdraw_ammount(
                                          e.target.value
                                          // e.target.value
                                        );
                                      }}
                                    />
                                  ) : (
                                    <input
                                      min="0"
                                      type="number"
                                      placeholder="0.0"
                                      value={
                                        walletAddress ? WithdrawalAmount : ""
                                      }
                                      className=""
                                      onChange={(e) => {
                                        Withdraw_ammount(
                                          e.target.value
                                          // e.target.value
                                        );
                                      }}
                                    />
                                  )}

                                  {/* <img src={Bnb} className="img-fluid" alt="" />

                                  <h3>BNB</h3> */}

                                  <img
                                    src={Chainlink}
                                    className="img-fluid"
                                    alt=""
                                  />
                                  <h3>Link</h3>
                                </div>
                                <span style={{ color: "red" }}>
                                  {withdrawamountError}
                                </span>
                              </div>

                              {/* <div className="content-search-middle">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M508.485 184.485l-92.485 92c-4.687 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.687-4.686-4.687-12.284 0-16.971L452.893 192H12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h440.905l-60.946-60.444c-4.687-4.686-4.687-12.284 0-16.971l7.07-7.07c4.687-4.686 12.284-4.686 16.971 0l92.485 92c4.687 4.686 4.686 12.284 0 16.97zm-504.97 160l92.485 92c4.687 4.686 12.284 4.686 16.971 0l7.07-7.07c4.687-4.686 4.687-12.284 0-16.971L59.095 352H500c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H59.107l60.934-60.444c4.687-4.686 4.687-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.687-16.97 0l-92.485 92c-4.686 4.686-4.687 12.284 0 16.97z"
                                  ></path>
                                </svg>
                              </div> */}

                              <div
                                className="text-center"
                                style={{
                                  marginTop: "4vh",
                                  marginBottom: "4vh",
                                }}
                              >
                                {walletAddress ? (
                                  <div className="text-center">
                                    {WithdrawButton == "Please Wait" ? (
                                      <button
                                        className="btn btn-gradient"
                                        onClick={Withdraw_Now}
                                        disabled
                                      >
                                        Please Wait
                                      </button>
                                    ) : (
                                      <button
                                        className="btn btn-gradient"
                                        onClick={Withdraw_Now}
                                      >
                                        {" "}
                                        Withdraw
                                      </button>
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <button
                                      className="btn btn-gradient"
                                      disabled
                                    >
                                      {" "}
                                      Connect Wallet
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="search-table-section">
                              <table>
                                <tbody>
                                  {/* <tr>
                                    <th>
                                      Borrowing
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
                                    <td className="pr-3">0</td>
                                  </tr> */}

                                  {/* <tr>
                                    <th>TX Fee</th>
                                    <td className="pr-3">0</td>
                                  </tr>
                                  <tr>
                                    <th>
                                      Interest{" "}
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
                                    <td className="pr-3">0%</td>
                                  </tr> */}
                                  {/* <tr>
                                    <th>Loan Period (Days):</th>
                                    <td className="py-0">
                                      <div className="table-btn">
                                        <button className="active">30</button>
                                        <button>90</button>
                                        <button>180</button>
                                      </div>
                                    </td>
                                  </tr> */}
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
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Borrow;
