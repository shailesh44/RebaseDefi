import { React, useEffect, useState } from "react";
import { SmartContractStaking } from "../pages/config";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import "./StakingCalculations.css";
import AbiStaking from "../components/AbiStaking.json";

const walletData = JSON.parse(localStorage.getItem("walletDetails"));

const StakingCalculations = () => {
  const [datainArray, setdatainArray] = useState([
    {
      amount: 0,
      datelocked: "",
      expiry: "",
      paid: "",
    },
  ]);

  useEffect(() => {
    if (walletData) {
      userStakes();
    }
  }, []);

  setTimeout(() => {
    if (walletData) {
      userStakes();
    }
  }, 5000);

  const userStakes = async () => {
    // console.log("je baat");
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

    const alltakes = await staking.getAllStakes(walletData.account);
    // console.log(alltakes);
    var all = [];
    for (let i = 0; i < alltakes.length; i++) {
      var x = {
        amount: 0,
        datelocked: "",
        expiry: "",
        paid: "",
      };

      x.amount = Number(ethers.utils.formatEther(alltakes[i][0].toString()));
      var end = new Date(
        (Number(alltakes[i][1].toString()) +
          Number(alltakes[i][2].toString())) *
          1000
      );
      x.expiry = end.toLocaleString();
      // console.log(end);

      x.datelocked = new Date(
        Number(alltakes[i][1].toString()) * 1000
      ).toLocaleString();

      x.paid = alltakes[i][3].toString();
      all.push(x);
    }
    // console.log(all);
    setdatainArray(all);
    // return all;
  };

  const Stkes = new Array(datainArray);

  // console.log(Stkes);
  // console.log(all[0]);

  return (
    <>
      {Stkes[0][0] ? (
        <div className="tableBox">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Amount</th>
                <th>Datelocked</th>
                <th>UnlockDate</th>
                <th>Claimed</th>
              </tr>

              {Stkes[0].map((Stkes, index) => (
                <tr data-index={index} className="trx">
                  <td>{Stkes.amount}</td>
                  <td>{Stkes.datelocked}</td>
                  <td>{Stkes.expiry}</td>
                  <td>{Stkes.paid == "false" ? "No" : "Yes"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default StakingCalculations;
