import Web3Modal from "web3modal";
import AbiStaking from "../components/AbiStaking.json";
import Lp from "../components/AbiLpToken.json";
import Farm from "../components/AbiFarm.json";
import { LpToken, farmLP, SmartContractStaking } from "../pages/config";
import { ethers } from "ethers";

export const gasfeeEstimation_Stake = async (stakeAmount, stakingPeriod) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);

  const signer = provider.getSigner();
  const staking = new ethers.Contract(SmartContractStaking, AbiStaking, signer);
  const Deposit = await staking.estimateGas.stake(stakeAmount, stakingPeriod);

  return Deposit.toString();
};

export const gasfeeEstimation_unStake = async () => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);

  const signer = provider.getSigner();
  const staking = new ethers.Contract(SmartContractStaking, AbiStaking, signer);
  const Deposit = await staking.estimateGas.unstake();
  return Deposit.toString();
};

export const gasfeeEstimation_Farm = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();

  const provider = new ethers.providers.Web3Provider(connection);

  const signer = provider.getSigner();

  value = ethers.utils.parseEther(value);
  const FarmContract = new ethers.Contract(farmLP, Farm, signer);
  const LpTkn = new ethers.Contract(LpToken, Lp, signer);
  const approve = await LpTkn.approve(farmLP, value);
  const Approve = await approve.wait();
  const Deposit = await FarmContract.estimateGas.deposit(value);

  console.log("**", FarmContract);
  console.log("*", Deposit);

  return Deposit.toString();
};

export const apyEstimation = async () => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
};

export const GasEstimation_Farm = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  value = ethers.utils.parseEther(value);

  const FarmContract = new ethers.Contract(farmLP, Farm, signer);

  const LpTkn = new ethers.Contract(LpToken, Lp, signer);

  const Approve = await LpTkn.approve(farmLP, value);
  const result = await Approve.wait();
  console.log(result);
  console.log(Approve);
  const Deposit = await FarmContract.estimateGas.deposit(value);
  console.log(Deposit.toString());
  return Deposit.toString();
};

export const GasEstimation_unstake = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  value = ethers.utils.parseEther(value);

  const FarmLp = new ethers.Contract(farmLP, Farm, signer);
  const withdraw = await FarmLp.estimateGas.withdraw(value, true);
  console.log(withdraw);

  console.log(withdraw.toString());
  return withdraw.toString();
};
