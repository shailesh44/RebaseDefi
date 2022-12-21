import Web3Modal from "web3modal";
import { ethers } from "ethers";
import BorrowApi from "../components/AbiBorrow.json";
import AbiChainlink from "../components/AbiChainlink.json";
import { BorrowSmartContract, chainID } from "./config";
import { depositToken, SmartContractToken } from "./config";
import AbiErc20 from "../components/AbiErc20.json";
// import { ToastContainer, toast } from "react-toastify";

export const Deposit = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  value = ethers.utils.parseEther(value);
  const chainlink = new ethers.Contract(depositToken, AbiChainlink, signer);
  const borrowContract = new ethers.Contract(
    BorrowSmartContract,
    BorrowApi,
    signer
  );

  const approve = await chainlink.approve(BorrowSmartContract, value);
  const Approve = await approve.wait();

  console.log(Approve);
  const deposit = await borrowContract.deposit(depositToken, String(value));

  console.log(deposit);

  const depositfn = true;
  return depositfn;
};

export const Borrow_Amount = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  value = ethers.utils.parseEther(value);
  const myaContract = new ethers.Contract(SmartContractToken, AbiErc20, signer);

  const approve = await myaContract.approve(BorrowSmartContract, value);

  console.log(approve);

  const borrowContract = new ethers.Contract(
    BorrowSmartContract,
    BorrowApi,
    signer
  );
  const borrow = await borrowContract.borrow(SmartContractToken, value);
  // toast.success("Borrow Success");
  console.log(borrow);
  const borrowfn = true;
  return borrowfn;
};

export const Return_Amount = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  console.log(value);
  value = ethers.utils.parseEther(value).toString();

  const borrowContract = new ethers.Contract(
    BorrowSmartContract,
    BorrowApi,
    signer
  );
  console.log(value);
  console.log(borrowContract);
  const Return = await borrowContract.repay(SmartContractToken, value);
  // toast.success("Return Success");
  console.log(Return);
  const returnFn = true;
  return returnFn;
};

export const withdraw_Amount = async (value) => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  value = ethers.utils.parseEther(value);

  const borrowContract = new ethers.Contract(
    BorrowSmartContract,
    BorrowApi,
    signer
  );

  const Withdraw = await borrowContract.withdraw(depositToken, value);
  // toast.success("Withdraw Success");
  console.log(Withdraw);
  const withdrawFn = true;
  return withdrawFn;
};

export const initialAmount_Balance = async () => {
  const web3Modal = new Web3Modal({
    network: "bsc testnet",
    cacheProvider: true,
  });
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const wallet = signer.getAddress();
  const chainlink = new ethers.Contract(depositToken, AbiChainlink, signer);
  const borrowContract = new ethers.Contract(
    BorrowSmartContract,
    BorrowApi,
    signer
  );

  const myaContract = new ethers.Contract(SmartContractToken, AbiErc20, signer);
  var details = [];
  try {
    const max = (await borrowContract.maxBorrow()).toString();
    details[1] = (
      await borrowContract.getTokenValueFromEth(SmartContractToken, max)
    ).toString();
  } catch (e) {
    details[1] = 0;
  }
  console.log(details[1]);
  details[0] = (await chainlink.balanceOf(wallet)).toString();

  const bv = (await borrowContract.getAccountBorrowedValue(wallet)).toString();
  details[2] = //return
    (
      await borrowContract.getTokenValueFromEth(SmartContractToken, bv)
    ).toString();

  const cv = (
    await borrowContract.getAccountCollateralValue(wallet)
  ).toString();
  details[3] = (await borrowContract.getTokenValueFromEth(depositToken, cv)) //Widhraw
    .toString();

  details[4] = (await myaContract.balanceOf(wallet)).toString();

  for (let i = 0; i < 5; i++) {
    details[i] = ethers.utils.formatEther(details[i]);
  }
  console.log(details);

  return details;
};
