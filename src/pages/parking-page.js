import React from "react";
import { Link } from "react-router-dom";
import NamecheapHd from "../nc_assets/img/logos/namecheap-hd.png";
import ReadyToGo from "../nc_assets/img/featured/600/ready-to-go.png";

const ParkingPage = () => {
  return (
    <>
      <header className="header">
        <div className="logo">
          <div>hosted by</div>
          <Link to="https://www.namecheap.com/">
            <img src={NamecheapHd} alt="Namecheap" />
          </Link>
        </div>
      </header>
      <div className="grid-row flex first four-fifths reset-mb">
        <div className="main fix-left margin-bottom">
          <div className="headline">
            <h1>Your website is ready to go!</h1>
          </div>
          <p className="help-block">
            <span className="nc-icon icon-checkmark" aria-hidden="true"></span>{" "}
            Hosting account was successfully created on the server
          </p>
          <p className="help-block">
            <span className="nc-icon icon-checkmark" aria-hidden="true"></span>{" "}
            Nameservers have been set up properly
          </p>
          <p className="help-block">
            <span className="nc-icon icon-checkmark" aria-hidden="true"></span>{" "}
            DNS propagation is completed
          </p>
        </div>
        <div className="aside">
          <picture>
            <img src={ReadyToGo} alt="Namecheap Parking Page" />
          </picture>
        </div>
      </div>
    </>
  );
};

export default ParkingPage;
