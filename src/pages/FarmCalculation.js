// import AbiErc from "../components/AbiErc20.json";
import Lp from "../components/AbiLpToken.json";
import Farm from "../components/AbiFarm.json";
// import { SmartContractToken } from "../pages/config";
import { LpToken } from "../pages/config";
import { farmLP } from "../pages/config";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
// import { ToastContainer, toast } from "react-toastify";

export const deposit = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);

  const signer = provider.getSigner();
  value = ethers.utils.parseEther(value);
  const FarmContract = new ethers.Contract(farmLP, Farm, signer);

  //   const Approve = await approve(farmLP, value);
  //   console.log(Approve);
  const Deposit = await FarmContract.deposit(value);
  console.log("**", FarmContract);
  console.log("*", Deposit);
  const success = "Stake success";
  return success;
};

export const approve = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);

  const signer = provider.getSigner();

  const LpTkn = new ethers.Contract(LpToken, Lp, signer);

  const approve = await LpTkn.approve(farmLP, value);
  console.log("*", approve);
};

export const BlncOF = async () => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);
  const address = await provider.listAccounts();
  const wallet_address = address[0];
  const signer = provider.getSigner();

  const LpTkn = new ethers.Contract(LpToken, Lp, signer);

  const bAlnc = await LpTkn.balanceOf(wallet_address);
  const balance = Number(bAlnc.toString()) / 10 ** 18;
  return balance.toFixed(3);
  //   console.log("*", bAlnc.toString(), "lP TOKEN");
};

export const Balance_unstake = async () => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);
  const address = await provider.listAccounts();
  const wallet_address = address[0];

  const signer = provider.getSigner();

  const LpTkn = new ethers.Contract(LpToken, Lp, signer);

  const bAlnc = await LpTkn.balanceOf(wallet_address);
  const balance = Number(bAlnc.toString()) / 10 ** 18;
  return balance.toFixed(3);

  //   console.log("*", bAlnc.toString(), "lP TOKEN");
};

export const Farm_unstake = async (amount, boolean) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);
  const address = await provider.listAccounts();
  const wallet_address = address[0];
  amount = ethers.utils.parseEther(amount);
  const signer = provider.getSigner();

  const FarmLp = new ethers.Contract(farmLP, Farm, signer);
  console.log(amount, boolean);
  const amount_withdraw = amount * 10 ** 18;
  console.log(amount_withdraw);
  const withdraw = await FarmLp.withdraw(amount, boolean);

  // const balance = Number(bAlnc.toString()) / 10 ** 18;
  return withdraw;
};

export const Farm_unstake_Balance = async () => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);
  const address = await provider.listAccounts();
  const wallet_address = address[0];
  const signer = provider.getSigner();

  const FarmLp = new ethers.Contract(farmLP, Farm, signer);
  var unstakeBalance_1 = [];
  var unstakeBalance = await FarmLp.userInfo(wallet_address);
  unstakeBalance_1[0] = ethers.utils.formatEther(unstakeBalance[0].toString());
  unstakeBalance_1[1] = ethers.utils.formatEther(unstakeBalance[1].toString());
  return unstakeBalance_1;
};
