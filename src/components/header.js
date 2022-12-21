import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import LogoNew from "../images/logo-new.png";
import Favicon from "../images/Favicon.png";
import IconTerra from "../images/icon-terra.png";
import Featured from "../images/featured.png";
import LogoXd from "../images/logo-xd.svg";
import IconLeap from "../images/icon-leap.png";
import Web3Modal from "web3modal";
import Web3 from "web3";
import AbiErc20 from "./AbiErc20.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect, disconnect } from "../store/walletSlice";
import { getWalletData, removeWalletData } from "../store/action/walletAction";
import { useDispatch, useSelector } from "react-redux";
import WalletLink from "walletlink";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { SmartContractToken, chainID } from "../pages/config";

const Header = () => {
  const dispatch = useDispatch();
  const walletInfo = useSelector((state) => state.walletDetail);
  const { walletData } = walletInfo;
  const [walletAddress, setWalletAddress] = useState("");
  const [WalletConnected, setWalletConnected] = useState("");
  let flagData = JSON.parse(localStorage.getItem("isFlag"));

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

  const web3Modal = new Web3Modal({
    network: "rinkeby",
    theme: "dark",
    cacheProvider: true,
    providerOptions,
  });

  const connectData = async () => {
    var provider = await web3Modal.connect();
    var web3 = new Web3(provider);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    var accounts = await web3.eth.getAccounts();
    var account = accounts[0];
    // setWalletConnected("Disconnect Wallet");

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

  useMemo(() => {
    if (flagData == true) {
      console.log("true");
      connectData();
      setWalletConnected("Disconnect");
    } else {
      console.log("False");
      console.log("useEffect flag true");
      setWalletConnected("Connect");
    }
  }, [flagData]);

  const connectwallet = async () => {
    if (!window.ethereum) {
      console.log("Please install MetaMask to use this App!");
      toast.error("Add a wallet to your Browser !");
    } else {
      try {
        web3Modal.clearCachedProvider();

        var provider = await web3Modal.connect();
        var web3 = new Web3(provider);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        var accounts = await web3.eth.getAccounts();
        var account = accounts[0];
        setWalletConnected("Disconnect");

        const getBalance =
          (await web3.eth.getBalance(accounts[0])) / 1000000000000000000;
        console.log("balance = : ", getBalance);
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

        console.log(details, ".1details");

        localStorage.setItem("walletDetails", JSON.stringify(details));

        toast.success("Wallet Connected");
        dispatch(getWalletData(details));
        localStorage.setItem("isFlag", JSON.stringify(true));
        //dispatch(connect(details));
        window.location.reload();
      } catch {
        toast.error("Login Failed!");
      }
    }
  };

  async function switchEthereumChain() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainID }],
      });
    } catch (e) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chainID,
                chainName: "Bsc Test Network",
                nativeCurrency: {
                  name: "Binance",
                  symbol: "BNB", // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: ["https://testnet.bscscan.io"],
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      // console.error(e)
    }
  }
  async function disconnectwallet() {
    setWalletConnected("Connect");

    console.log("disconnected....");
    // dispatch(disconnect());
    web3Modal.clearCachedProvider();
    //  setWalletAddress("");
    localStorage.removeItem("walletDetails");
    dispatch(removeWalletData());
    localStorage.setItem("isFlag", JSON.stringify(false));
    localStorage.removeItem("hexaDate");
    toast.error("Wallet Disconnected");

    window.location.reload();
  }
  switchEthereumChain();
  return (
    <>
      <header>
        <div className="custom-container">
          <div className="header-inner">
            <div className="row align-items-center">
              <div className="col-md-3 col-12">
                <div className="header-left">
                  <div className="header-logo">
                    <a href="/">
                      <img src={LogoNew} className="img-fluid" alt="" />
                    </a>
                  </div>
                  <div className="header-logo logo-mobile">
                    <img src={Favicon} className="img-fluid" alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-12">
                <div className="header-right">
                  <div className="header-right-inner">
                    <div className="pwd">
                      <p>Powered by Artificial Intelligence</p>
                    </div>
                    {/* <PreSale details={connectedWalletDetails} /> */}

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
                    <div className="header-right-dropdown-outer leftBtn">
                      <button className="btn btn-grey btn-dpdwn">
                        <svg
                          width="16px"
                          height="16px"
                          viewBox="0 0 16 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12,8 C11.4478125,8 11,8.4478125 11,9 C11,9.5521875 11.4478125,10 12,10 C12.5521875,10 13,9.5521875 13,9 C13,8.4478125 12.5521875,8 12,8 Z M14.5,3 L14,3 L14,2.5 C14,1.6715625 13.3284375,1 12.5,1 L3,1 C1.343125,1 0,2.343125 0,4 L0,12 C0,13.656875 1.343125,15 3,15 L14,15 C15.1046875,15 16,14.1046875 16,13 L16,4.5 C16,3.6715625 15.3284375,3 14.5,3 Z M15,13 C15,13.55125 14.55125,14 14,14 L3,14 C1.8971875,14 1,13.1028125 1,12 L1,4 C1,2.8971875 1.8971875,2 3,2 L12.5,2 C12.775625,2 13,2.224375 13,2.5 L13,3 L3.5,3 C3.22375,3 3,3.22375 3,3.5 C3,3.77625 3.22375,4 3.5,4 L14.5,4 C14.775625,4 15,4.224375 15,4.5 L15,13 Z"
                            fill="currentColor"
                            fillRule="nonzero"
                          ></path>
                        </svg>{" "}
                        <span>Tools</span>
                      </button>
                      <div className="header-right-dropdown">
                        <ul>
                          <li>
                            <a
                              href="https://pancakeswap.finance/"
                              to="/"
                              rel="noreferrer noopener"
                              target="_blank"
                              className="btn btn-grey btn-blank"
                            >
                              <img
                                src={IconTerra}
                                className="img-fluid"
                                alt=""
                              />
                              <span>Buy on PancakeSwap</span>
                            </a>
                          </li>
                          {/* <li><a href="#" className="btn btn-grey btn-blank"><img src= {WalletConnect}  className="img-fluid" alt=""/><span>Add token to wallet</span></a></li> */}
                          <li>
                            <Link
                              to="/borrow"
                              className="btn btn-grey btn-blank"
                            >
                              <img src={LogoXd} className="img-fluid" alt="" />
                              <span>Borrow</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/wrap" className="btn btn-grey btn-blank">
                              <img
                                src={IconLeap}
                                className="img-fluid"
                                alt=""
                              />
                              <span>Wrap</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/bridge"
                              className="btn btn-grey btn-blank"
                            >
                              <img
                                src={IconTerra}
                                className="img-fluid"
                                alt=""
                              />
                              <span>Bridge</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/" className="btn btn-grey btn-blank">
                              <img
                                src={Featured}
                                className="/img-fluid"
                                alt=""
                              />
                              <span>Customize</span>
                            </Link>
                          </li>
                          <li>
                            <Link to="/" className="btn btn-grey btn-blank">
                              <img src={LogoXd} className="img-fluid" alt="" />
                              <span>Developer API</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              to="/walkthrough-videos"
                              className="btn btn-grey btn-blank"
                            >
                              <img
                                src={IconLeap}
                                className="img-fluid"
                                alt=""
                              />
                              <span>Walkthrough Videos</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="header-right-dropdown-outer">
                      <button
                        className="btn btn-grey btn-dpdwn"
                        onClick={
                          WalletConnected == "Connect"
                            ? connectwallet
                            : disconnectwallet
                        }
                      >
                        <svg
                          width="16px"
                          height="16px"
                          viewBox="0 0 16 16"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12,8 C11.4478125,8 11,8.4478125 11,9 C11,9.5521875 11.4478125,10 12,10 C12.5521875,10 13,9.5521875 13,9 C13,8.4478125 12.5521875,8 12,8 Z M14.5,3 L14,3 L14,2.5 C14,1.6715625 13.3284375,1 12.5,1 L3,1 C1.343125,1 0,2.343125 0,4 L0,12 C0,13.656875 1.343125,15 3,15 L14,15 C15.1046875,15 16,14.1046875 16,13 L16,4.5 C16,3.6715625 15.3284375,3 14.5,3 Z M15,13 C15,13.55125 14.55125,14 14,14 L3,14 C1.8971875,14 1,13.1028125 1,12 L1,4 C1,2.8971875 1.8971875,2 3,2 L12.5,2 C12.775625,2 13,2.224375 13,2.5 L13,3 L3.5,3 C3.22375,3 3,3.22375 3,3.5 C3,3.77625 3.22375,4 3.5,4 L14.5,4 C14.775625,4 15,4.224375 15,4.5 L15,13 Z"
                            fill="currentColor"
                            fillRule="nonzero"
                          ></path>
                        </svg>{" "}
                        <span> {WalletConnected} </span>
                      </button>

                      {/* {WalletConnected === "Disconnect Wallet" ? (
                        ""
                      ) : (
                        <div className="header-right-dropdown">
                          <ul>
                            <li>
                              <a
                                className="btn btn-grey btn-blank"
                                style={{ cursor: "pointer" }}
                                onClick={connectwallet}
                              >
                                <img
                                  src={LogoXd}
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Metamask</span>
                              </a>
                            </li>

                            <li>
                              <a className="btn btn-grey btn-blank">
                                <img
                                  src="images/walletconnect.svg"
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Wallet Connect</span>
                              </a>
                            </li>
                            <li>
                              <a className="btn btn-grey btn-blank">
                                <img
                                  src={LogoXd}
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Binance Wallet</span>
                              </a>
                            </li>
                            <li>
                              <a className="btn btn-grey btn-blank">
                                <img
                                  src={IconLeap}
                                  className="img-fluid"
                                  alt=""
                                />
                                <span>Trust Wallet</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
