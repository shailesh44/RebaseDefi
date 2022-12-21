import { React, useState, useEffect } from "react";
import axios from "axios";

import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import AbiStaking from "../components/AbiStaking.json";
import AbiErc from "../components/AbiErc20.json";
import AbiBorrow from "../components/AbiBorrow.json";
import AbiDistributor from "../components/AbiDistributor.json";
import { BorrowSmartContract, SmartContractToken } from "../pages/config";
import { myaPrice, distributor } from "../pages/config";
import { SmartContractStaking } from "../pages/config";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { APY_percent, rate_calculate } from "../pages/config";
const Account = () => {
  const [TokenBalanceAmount, setTokenBalanceAmount] = useState("");
  const [dailyEarning, setDailyEarning] = useState("");
  const [apy, setApy] = useState(APY_percent);
  const [DailyRoi, setDailyRoi] = useState("");
  const [MonthlyRoi, setMonthlyRoi] = useState("");
  const [earn, setEarn] = useState("");
  const [MonthlyRoiUSD, setMonthlyRoiUSD] = useState("");
  const [ExpectedRewardsInDollar, setExpectedRewardsInDollar] = useState("");
  const [ExpectedRewards, setExpectedRewards] = useState("");
  const [Rewardyeild, setRewardyeild] = useState("");
  const [min, setMin] = useState();
  const [second, setSecond] = useState();
  const [hour, setHour] = useState();
  const [RebaseTime, setRebaseTime] = useState("");
  const [Btime, setBtime] = useState("");
  const [timer, setTimer] = useState("");
  const [walletDetail, setwalletDetail] = useState("");
  const [WalletAddress, setWalletAddress] = useState("");
  const [SumAmount, setSumAmount] = useState("");

  let flagData = JSON.parse(localStorage.getItem("isFlag"));

  let hexaNumber = JSON.parse(localStorage.getItem("hexaDate"));

  const walletInfo = useSelector((state) => state.walletDetail);
  const { walletData } = walletInfo;

  setTimeout(() => {
    var walletDatas = walletData;
    if (walletDatas) {
      setwalletDetail(walletDatas);
      setWalletAddress(walletDatas.account);
    }
  }, 0);

  useEffect(() => {
    const walletData = JSON.parse(localStorage.getItem("walletDetails"));
    console.log(walletData, "wallet..1");

    if (flagData == true) {
      const rebase = async () => {
        const web3Modal = new Web3Modal({
          network: "bsc testnet",
          cacheProvider: true,
        });
        const connection = await web3Modal.connect();
        var provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const stakingContract = new ethers.Contract(
          SmartContractStaking,
          AbiStaking,
          signer
        );
         var extra = Number((await stakingContract.epoch())[2].toString());
        // // var extras = await stakingContract.epoch()["endBlock"];
        // console.log(extra);

        // var provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/")

        // var rebaseTimestamp = (await provider.getBlock(0)).timestamp+(extra*3*1000);
        //   console.log(rebaseTimestamp,"ahahahah");
        // console.log("end ", new Date().getTime());

        // let endDate = rebaseTimestamp * 1000;
        // console.log(endDate, extra, "enddate");
        
        
        
        axios.get("https://api-testnet.bscscan.com/api?module=block&action=getblockcountdown&blockno="+extra+"&apikey=TDNQ3QT7TR8I8BWVCM7JJ89I3XZZ4TSY4B")
        .then(
          res => {
            console.log(res.data.result.EstimateTimeInSec);
            var endDate = new Date().getTime()+Number(res.data.result.EstimateTimeInSec*1000);
            console.log(endDate,"agag")
            
           
      
          var x = setInterval(function timerebase () {
            
           
            
            console.log(endDate);
            var now = new Date().getTime();
            var distance = endDate - now ;
  
            var hours = Math.floor(distance/(3600*1000));
            console.log(distance);
            var minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setMin(minutes);
            setSecond(seconds);
            setHour(hours);
            const time = `${hours}:${minutes}:${seconds}`;
            setRebaseTime(time);
            // var countDownDate= countDownDate-1;
            if (distance < 0) {
              clearInterval();
              console.log("EXPIRED");
            }
          }
        
        , 500,endDate);
        
            
        
      }
      )
          
        
      };
        rebase();
    }
  }, []);

  useEffect(() => {
    if (flagData == true) {
      available();
      Balance_my();
    }
  }, []);
  //Function for Balance

  const Balance_my = async () => {
    var sumAmount;
    console.log("Blanck _myamoto");

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
    const dist = new ethers.Contract(distributor, AbiDistributor, signer);

    const token_contract = new ethers.Contract(
      SmartContractToken,
      AbiErc,
      signer
    );

    console.log("**", token_contract);

    const address = await provider.listAccounts();
    const wallet_address = address[0];

    // setExpectedRewards(Number(expected_Rewards).toFixed(2));
    console.log(wallet_address);

    try {
      const blnc = await token_contract.balanceOf(wallet_address);
      const mya_blnc = Number(
        ethers.utils.formatEther(blnc).toString()
      ).toFixed(2); // BALANCE
      setTokenBalanceAmount(mya_blnc - 0.01);
      console.log(mya_blnc, "balance of myas");
    } catch (error) {
      console.log(error);
    }

    try {
      setDailyRoi(rate_calculate);

      const rewardYieldd = Number(apy) - 100;
      console.log(rewardYieldd, apy);
      setRewardyeild(rewardYieldd);

      setMonthlyRoiUSD(
        ((SumAmount * DailyRoi * 30 * myaPrice) / 100).toFixed(2)
      );
      setMonthlyRoi(DailyRoi * 30);
    } catch (error) {
      console.log(error);
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
    const borrow = new ethers.Contract(BorrowSmartContract, AbiBorrow, signer);
    const address = await provider.listAccounts();
    const wallet_address = address[0];

    let endDate =
      Number((await borrow.userBorrows(wallet_address))[2].toString()) * 1000;
    var countDownDate = new Date(endDate).getTime();
    var x = setInterval(function () {
      var now = new Date().getTime();

      var distance = countDownDate - now;
      if (distance <= 0) {
        distance = 0;
      }

      var hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const time = `${hours}:${minutes}:${seconds}`;
      // console.log(time, "#########################");
      setBtime(time);
      if (distance < 0) {
        clearInterval(x);
        console.log("EXPIRED");
      }
    }, 1000);

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
      var rebase = Number(alltakes[i][4].toString());
      if (now > end && paid == "false") {
        all.push(amount);
        call.push(amount * rebase * 0.5);
      }
      console.log(now);
    }

    var sumAmount = 0; // Running the for loop
    for (let i = 0; i < all.length; i++) {
      sumAmount += all[i];
    }
    console.log(sumAmount);
    setSumAmount(sumAmount);

    var sumRewards = 0; // Running the for loop
    for (let i = 0; i < call.length; i++) {
      sumRewards += call[i];
    }

    setExpectedRewards(sumRewards);
    const expected_RewardsinDollar = Number(sumRewards) * myaPrice;
    setExpectedRewardsInDollar(expected_RewardsinDollar.toFixed(3));
    const amt = ((Number(sumAmount) * 0.5) / 90).toFixed(2);
    setDailyEarning(amt);

    // const blockNumber = epoch.endBlock;
    // const timestamp = (await provider.getBlock(blockNumber)).timestamp;
    // console.log(timestamp);

    return [sumAmount, sumRewards];
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
                              <div className="col-xl-12">
                                <div className="token-sale-left">
                                  <div className="token-sale-left-inner">
                                    <div className="row justify-content-center">
                                      <div className="col-lg-12">
                                        <div className="ts-left">
                                          <div className="ts-left-inner">
                                            <div className="ts-title text-center">
                                              <h4>Your Account</h4>
                                            </div>
                                            <div className="ac-box-outer">
                                              <div className="row">
                                                <div className="col-lg-3">
                                                  <div className="ac-box">
                                                    <div className="ac-box-inner">
                                                      <p>APY</p>
                                                      <h4>
                                                        {" "}
                                                        {WalletAddress
                                                          ? apy
                                                          : "0"}
                                                      </h4>
                                                      <p>
                                                        Daily ROI{" "}
                                                        {WalletAddress
                                                          ? DailyRoi
                                                          : "0"}
                                                        %
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-lg-3">
                                                  <div className="ac-box">
                                                    <div className="ac-box-inner">
                                                      <p>Your Balance</p>
                                                      <h4 className="text-gr">
                                                        $
                                                        {WalletAddress
                                                          ? (
                                                              TokenBalanceAmount *
                                                              myaPrice
                                                            ).toFixed(2)
                                                          : "0"}
                                                      </h4>
                                                      <p>
                                                        {WalletAddress
                                                          ? Number(
                                                              TokenBalanceAmount
                                                            ).toFixed(2)
                                                          : "0"}{" "}
                                                        MYA
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-lg-3">
                                                  <div className="ac-box">
                                                    <div className="ac-box-inner">
                                                      <p>Next Rebase:</p>
                                                      <h4>
                                                        {WalletAddress
                                                          ? RebaseTime
                                                          : ""}
                                                      </h4>
                                                      <p>
                                                        Interest Coming in Your
                                                        Wallet
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-lg-3">
                                                  <div className="ac-box">
                                                    <div className="ac-box-inner">
                                                      <p>Your Earnings/Daily</p>
                                                      <h4 className="text-gr">
                                                        ${" "}
                                                        {WalletAddress
                                                          ? dailyEarning
                                                          : "0"}
                                                      </h4>
                                                      <p>
                                                        {WalletAddress
                                                          ? earn
                                                          : "0"}{" "}
                                                        MYA
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div className="col-lg-12">
                                                  <div className="ac-box">
                                                    <div className="ac-box-inner">
                                                      <table className="table table-borderless">
                                                        <tbody>
                                                          <tr>
                                                            <td className="text-white">
                                                              Current MYA Price
                                                            </td>
                                                            <td className="text-end text-gr">
                                                              $ {myaPrice} USD
                                                            </td>
                                                          </tr>

                                                          <tr>
                                                            <td className="text-white">
                                                              Total Staked
                                                              Balance
                                                            </td>
                                                            <td className="text-end text-white">
                                                              {WalletAddress
                                                                ? SumAmount
                                                                : "0"}{" "}
                                                              MYA
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td className="text-white">
                                                              Total Expected
                                                              Reward Amount
                                                            </td>
                                                            <td className="text-end text-white">
                                                              {WalletAddress
                                                                ? ExpectedRewards
                                                                : "0"}{" "}
                                                              MYA
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td className="text-white">
                                                              Total Expected
                                                              Reward Amount USD
                                                            </td>
                                                            <td className="text-end text-gr">
                                                              {WalletAddress
                                                                ? ExpectedRewardsInDollar
                                                                : "0"}{" "}
                                                              USD
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td className="text-white">
                                                              Expected Reward
                                                              Yield
                                                            </td>
                                                            <td className="text-end text-white">
                                                              {WalletAddress
                                                                ? Rewardyeild
                                                                : "0"}
                                                              %
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td className="text-white">
                                                              ROI (30-Day Rate)
                                                            </td>
                                                            <td className="text-end text-gr">
                                                              {WalletAddress
                                                                ? MonthlyRoi
                                                                : "0"}
                                                              %
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td className="text-white">
                                                              ROI (30-Day Rate)
                                                              USD
                                                            </td>
                                                            <td className="text-end text-gr">
                                                              ${" "}
                                                              {WalletAddress
                                                                ? MonthlyRoiUSD
                                                                : "0"}{" "}
                                                              USD
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td className="text-white">
                                                              Time Left for
                                                              Dilution
                                                            </td>
                                                            <td className="text-end text-gr">
                                                              {" "}
                                                              {WalletAddress
                                                                ? Btime
                                                                : "0"}{" "}
                                                            </td>
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

export default Account;
