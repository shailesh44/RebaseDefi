import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import { Link } from "react-router-dom";
import Bnb from "../images/bnb.svg";
import RoninCoin from "../images/ronin-coin.png";

const tokenSale = () => {
  return (
    <>
      <div className="app-page">
        <Header />

        <div className="content-area">
          <div className="custom-container">
            <div className="content-area-inner">
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3 col-xl-2">
                  <div className="content-left">
                    <div className="side-menu">
                      <ul>
                        <li className="active">
                          <Link to="/token-sale">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 540 540"
                            >
                              <path
                                fill="currentColor"
                                d="M341.65 181.65l-11.31-11.31c-6.25-6.25-16.38-6.25-22.63 0L170.35 307.72c-6.25 6.25-6.25 16.38 0 22.63l11.31 11.31c6.25 6.25 16.38 6.25 22.63 0l137.37-137.37c6.24-6.26 6.24-16.39-.01-22.64zM192 224c17.67 0 32-14.33 32-32s-14.33-32-32-32-32 14.33-32 32 14.33 32 32 32zm128 64c-17.67 0-32 14.33-32 32s14.33 32 32 32 32-14.33 32-32-14.33-32-32-32zm192-32c0-36.5-18.8-68.4-46.7-86.7 6.8-32.9-2.7-68.7-28.3-94.3-25.6-25.7-61.5-35.1-94.3-28.3C324.2 18.7 292.3 0 256 0s-68.3 18.7-86.7 46.7C136.4 39.9 100.6 49.4 75 75c-25.7 25.6-35.1 61.5-28.3 94.3C18.6 187.8 0 219.8 0 256c0 36.3 18.7 68.3 46.7 86.7-6.8 32.9 2.7 68.7 28.3 94.3 25.6 25.7 61.2 35.1 94.3 28.3 18.5 28.1 50.5 46.7 86.7 46.7 36.4 0 68.3-18.8 86.7-46.7 33.1 6.8 68.7-2.7 94.3-28.3 25.7-25.6 35.1-61.5 28.3-94.3 28.1-18.5 46.7-50.5 46.7-86.7zm-108.3 61.3c9.1 19.9 30.3 54.8-.7 85.8-28 28-55.3 14.5-85.8.7-7.7 20.6-17.3 60.2-61.2 60.2-45.3 0-54.7-42.8-61.2-60.2-21.1 9.6-54.9 30.2-85.9-.8-32-32-8.4-68.9-.7-85.8C87.6 309.5 48 299.9 48 256c0-45.3 42.8-54.7 60.3-61.3-9.1-19.9-30.3-54.8.7-85.8 32-32 68.9-8.4 85.8-.7C202.5 87.6 212.1 48 256 48c45.3 0 54.7 42.8 61.2 60.4 19.9-9.1 54.8-30.3 85.8.7 32 32 8.4 68.9.7 85.8 20.6 7.7 60.2 17.3 60.2 61.2 0 45.3-42.8 54.7-60.2 61.2z"
                              ></path>
                            </svg>
                            <span>Token Sale</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/stake">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M508.485 168.485l-100.375 100c-4.686 4.686-12.284 4.686-16.97 0l-19.626-19.626c-4.753-4.753-4.675-12.484.173-17.14L422.916 184H12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h410.916l-51.228-47.719c-4.849-4.656-4.927-12.387-.173-17.14l19.626-19.626c4.686-4.686 12.284-4.686 16.97 0l100.375 100c4.685 4.686 4.685 12.284-.001 16.97zm-504.97 192l100.375 100c4.686 4.686 12.284 4.686 16.97 0l19.626-19.626c4.753-4.753 4.675-12.484-.173-17.14L89.084 376H500c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12H89.084l51.228-47.719c4.849-4.656 4.927-12.387.173-17.14l-19.626-19.626c-4.686-4.686-12.284-4.686-16.97 0l-100.375 100c-4.686 4.686-4.686 12.284.001 16.97z"
                              ></path>
                            </svg>{" "}
                            <span>Stake</span>
                          </Link>
                        </li>

                        <li>
                          <Link to="/borrow">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 640 512"
                            >
                              <path
                                fill="currentColor"
                                d="M288.1 285.1c3.8 3.9 10.1 3.9 14 .1l117.8-116.8c3.9-3.8 3.9-10.1.1-14L396.8 131c-3.8-3.9-10.1-3.9-14-.1l-87.4 86.7-37.9-38.2c-3.8-3.9-10.1-3.9-14-.1l-23.4 23.2c-3.9 3.8-3.9 10.1-.1 14l68.1 68.6zM592 272h-80V38.2C512 17.1 497.5 0 479.7 0H160.3C142.5 0 128 17.1 128 38.2V272H48c-26.5 0-48 21.5-48 48v144c0 26.5 21.5 48 48 48h544c26.5 0 48-21.5 48-48V320c0-26.5-21.5-48-48-48zM464 48v320H176V48h288zm128 416H48V320h80v48h-22.4c-5.3 0-9.6 3.6-9.6 8v32c0 4.4 4.3 8 9.6 8h428.8c5.3 0 9.6-3.6 9.6-8v-32c0-4.4-4.3-8-9.6-8H512v-48h80v144z"
                              ></path>
                            </svg>
                            <span>Borrow</span>
                          </Link>
                        </li>
                        <li>
                          <Link to="/roi">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M320 0C214 0 128 35.8 128 80v52.6C53.5 143.6 0 173.2 0 208v224c0 44.2 86 80 192 80s192-35.8 192-80v-52.7c74.5-11 128-40.5 128-75.3V80c0-44.2-86-80-192-80zm16 428.3C326 440 275.6 464 192 464S58 440 48 428.3v-39.5c35.2 16.6 86.6 27.2 144 27.2s108.8-10.6 144-27.2v39.5zm0-96C326 344 275.6 368 192 368S58 344 48 332.3v-44.9c35.2 20 86.6 32.6 144 32.6s108.8-12.7 144-32.6v44.9zM192 272c-79.5 0-144-21.5-144-48s64.5-48 144-48 144 21.5 144 48-64.5 48-144 48zm272 28.3c-7.1 8.3-34.9 22.6-80 30.4V283c31-4.6 58.7-12.1 80-22.2v39.5zm0-96c-7.1 8.3-34.9 22.6-80 30.4V208c0-7.2-2.5-14.2-6.8-20.9 33.8-5.3 64-14.8 86.8-27.8v45zM320 144c-5 0-9.8-.3-14.7-.5-26-7.9-56.8-13.2-90.4-14.9C191 120 176 108.6 176 96c0-26.5 64.5-48 144-48s144 21.5 144 48-64.5 48-144 48z"
                              ></path>
                            </svg>
                            <span>ROI</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="https://amato.gitbook.io/untitled/"
                            target="_blank"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="currentColor"
                                d="M508.485 168.485l-100.375 100c-4.686 4.686-12.284 4.686-16.97 0l-19.626-19.626c-4.753-4.753-4.675-12.484.173-17.14L422.916 184H12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h410.916l-51.228-47.719c-4.849-4.656-4.927-12.387-.173-17.14l19.626-19.626c4.686-4.686 12.284-4.686 16.97 0l100.375 100c4.685 4.686 4.685 12.284-.001 16.97zm-504.97 192l100.375 100c4.686 4.686 12.284 4.686 16.97 0l19.626-19.626c4.753-4.753 4.675-12.484-.173-17.14L89.084 376H500c6.627 0 12-5.373 12-12v-24c0-6.627-5.373-12-12-12H89.084l51.228-47.719c4.849-4.656 4.927-12.387.173-17.14l-19.626-19.626c-4.686-4.686-12.284-4.686-16.97 0l-100.375 100c-4.686 4.686-4.686 12.284.001 16.97z"
                              ></path>
                            </svg>{" "}
                            <span>Docs</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-8 col-lg-9 col-xl-8">
                  <div className="content-right">
                    <div className="custom-container-inner mt-0">
                      <div className="content-section">
                        <div className="content-top-title text-center">
                          <h1>Token Sale</h1>
                          <p>Sale Period and Contribution</p>
                        </div>

                        <div className="token-sale-section mt-0">
                          <div className="token-sale-inner">
                            <div className="row">
                              <div className="col-xl-8">
                                <div className="token-sale-left">
                                  <div className="token-sale-left-inner">
                                    <div className="row">
                                      <div className="col-lg-4">
                                        <div className="ts-left">
                                          <div className="ts-left-inner">
                                            <div className="ts-title text-center">
                                              <h5>Sale Period Ends</h5>
                                            </div>
                                            <div className="ts-circle">
                                              <div className="circle-box">
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                                  viewBox="0 0 200 200"
                                                  className="chart"
                                                >
                                                  <defs>
                                                    <linearGradient
                                                      id="c"
                                                      x1="-9.647%"
                                                      x2="56.813%"
                                                      y1="0%"
                                                      y2="56.187%"
                                                    >
                                                      <stop
                                                        offset="0%"
                                                        stopColor="#60fbd0"
                                                      ></stop>
                                                      <stop
                                                        offset="100%"
                                                        stopColor="#60fbd0"
                                                      ></stop>
                                                    </linearGradient>
                                                    <linearGradient
                                                      id="e"
                                                      x1="71.293%"
                                                      x2="30.105%"
                                                      y1="50%"
                                                      y2="118.988%"
                                                    >
                                                      <stop
                                                        offset="0%"
                                                        stopColor="#60fbd0"
                                                      ></stop>
                                                      <stop
                                                        offset="100%"
                                                        stopColor="#60fbd0"
                                                      ></stop>
                                                    </linearGradient>
                                                    <circle
                                                      id="b"
                                                      cx="100"
                                                      cy="100"
                                                      r="100"
                                                    ></circle>
                                                    <circle
                                                      id="a"
                                                      cx="100"
                                                      cy="100"
                                                      r="100"
                                                    ></circle>
                                                    <mask
                                                      id="f"
                                                      width="200"
                                                      height="200"
                                                      x="0"
                                                      y="0"
                                                      fill="#fff"
                                                      maskContentUnits="userSpaceOnUse"
                                                      maskUnits="objectBoundingBox"
                                                    >
                                                      <use xlinkHref="#a"></use>
                                                    </mask>
                                                  </defs>
                                                  <g
                                                    fill="none"
                                                    fillRule="evenodd"
                                                  >
                                                    <mask id="d" fill="#fff">
                                                      <use xlinkHref="#b"></use>
                                                    </mask>
                                                    <path
                                                      stroke="url(#e)"
                                                      strokeWidth="20"
                                                      d="M100 200c55.228 0 100-44.772 100-100S155.228 0 100 0 0 44.772 0 100s44.772 100 100 100z"
                                                      mask="url(#d)"
                                                    ></path>
                                                    <g
                                                      stroke="url(#c)"
                                                      stroke-dasharray="1,1000"
                                                      strokeWidth="50"
                                                      mask="url(#d)"
                                                      transform="rotate(90 100 100)"
                                                    >
                                                      <use
                                                        mask="url(#f)"
                                                        xlinkHref="#a"
                                                      ></use>
                                                    </g>
                                                  </g>
                                                </svg>
                                                <div className="circle-box-content">
                                                  {/* <h3>$48,518,184.68</h3> */}
                                                  <div id="geeks-countdown">
                                                    <div id="clock"></div>
                                                    <div id="units">
                                                      <span>Days</span>
                                                      <span>Hours</span>
                                                      <span>Minutes</span>
                                                      {/* <span>Seconds</span> */}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-lg-8">
                                        <div className="ts-right">
                                          <div className="ts-right-inner">
                                            <div className="ts-title text-center">
                                              <h5>Your Contribution</h5>
                                            </div>
                                            <div className="ts-form">
                                              <div className="form-group">
                                                <select
                                                  name=""
                                                  id="dpst_wdrl"
                                                  className="form-control"
                                                >
                                                  <option defaultValue="Deposit">
                                                    Deposit
                                                  </option>
                                                  <option defaultValue="Withdraw">
                                                    Withdraw
                                                  </option>
                                                </select>
                                              </div>
                                              <div className="mb-3">
                                                <div className="row">
                                                  <div className="col-md-6 dpst_wdrl">
                                                    <label
                                                      htmlFor=""
                                                      className="btn-deposit"
                                                    >
                                                      I want to deposit
                                                    </label>
                                                    <label
                                                      htmlFor=""
                                                      className="btn-withdraw"
                                                    >
                                                      I want to withdraw
                                                    </label>
                                                  </div>
                                                  <div className="col-md-6">
                                                    <div className="table-btn">
                                                      <button className="active">
                                                        0
                                                      </button>
                                                      <button className="">
                                                        25%
                                                      </button>
                                                      <button>50%</button>
                                                      <button>75%</button>
                                                      <button>100%</button>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="form-group mb-2">
                                                <div className="form-group-cur">
                                                  <input
                                                    type="text"
                                                    defaultValue="0"
                                                    className="form-control"
                                                  />
                                                  <div className="curr-box">
                                                    <img
                                                      src={Bnb}
                                                      className="img-fluid"
                                                      alt=""
                                                    />
                                                    {/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 254 254" style="enable-background:new 0 0 254 254;" xml:space="preserve"><style type="text/css">	.st0{fillRule:evenodd;clip-rule:evenodd;fill:#E84142;}.st1{fill:#FFFFFF;}</style>
<g>	<circle className="st0" cx="127" cy="127" r="127"></circle><path className="st1" d="M171.8,130.3c4.4-7.6,11.5-7.6,15.9,0l27.4,48.1c4.4,7.6,0.8,13.8-8,13.8h-55.2c-8.7,0-12.3-6.2-8-13.8
		L171.8,130.3z M118.8,37.7c4.4-7.6,11.4-7.6,15.8,0l6.1,11L155.1,74c3.5,7.2,3.5,15.7,0,22.9l-48.3,83.7
		c-4.4,6.8-11.7,11.1-19.8,11.6H46.9c-8.8,0-12.4-6.1-8-13.8L118.8,37.7z"></path>
</g></svg> */}
                                                    <p>BNB</p>
                                                  </div>
                                                </div>
                                                <p className="m-0 mt-2 text-md-end">
                                                  Wallet balance: 0
                                                </p>
                                              </div>
                                              <div className="form-group">
                                                <label
                                                  htmlFor=""
                                                  className="mb-3 text-center d-block"
                                                >
                                                  Locked amount
                                                </label>
                                                <div className="form-progress form-progress-locked">
                                                  <div className="progress">
                                                    <div
                                                      className="progress-bar"
                                                      role="progressbar"
                                                      aria-valuenow="0"
                                                      aria-valuemin="0"
                                                      aria-valuemax="100"
                                                      style={{ width: "0%" }}
                                                    ></div>
                                                  </div>
                                                </div>
                                                <p className="m-0 mt-2 text-md-end">
                                                  0/0
                                                </p>
                                              </div>
                                              <div className="btn-outer dpst_wdrl">
                                                <button className="btn btn-gradient w-100 btn-deposit">
                                                  Deposit
                                                </button>
                                                <button className="btn btn-gradient w-100 btn-withdraw">
                                                  Withdraw
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-4">
                                <div className="token-sale-right">
                                  <div className="token-sale-right-inner">
                                    <div className="row">
                                      <div className="col-xl-12 col-lg-6 p-xl-0 pe-lg-3">
                                        <div className="ts-sidebar-box">
                                          <div className="ts-sidebar-box-inner">
                                            <div className="tss-title text-center">
                                              <h5>Total BNB Contributed</h5>
                                            </div>
                                            <div className="curr-box">
                                              <img
                                                src={Bnb}
                                                className="img-fluid"
                                                alt=""
                                              />
                                              {/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 254 254" style="enable-background:new 0 0 254 254;" xml:space="preserve"><style type="text/css">	.st0{fillRule:evenodd;clip-rule:evenodd;fill:#E84142;}.st1{fill:#FFFFFF;}</style>
<g>	<circle className="st0" cx="127" cy="127" r="127"></circle><path className="st1" d="M171.8,130.3c4.4-7.6,11.5-7.6,15.9,0l27.4,48.1c4.4,7.6,0.8,13.8-8,13.8h-55.2c-8.7,0-12.3-6.2-8-13.8
		L171.8,130.3z M118.8,37.7c4.4-7.6,11.4-7.6,15.8,0l6.1,11L155.1,74c3.5,7.2,3.5,15.7,0,22.9l-48.3,83.7
		c-4.4,6.8-11.7,11.1-19.8,11.6H46.9c-8.8,0-12.4-6.1-8-13.8L118.8,37.7z"></path>
</g></svg> */}
                                              <p>0</p>
                                            </div>

                                            <hr className="my-4" />

                                            <div className="tss-title text-center">
                                              <h5>Est. Current Token Price</h5>
                                            </div>
                                            <div className="curr-box">
                                              <img
                                                src={Bnb}
                                                className="img-fluid"
                                                alt=""
                                              />
                                              {/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 254 254" style="enable-background:new 0 0 254 254;" xml:space="preserve"><style type="text/css">	.st0{fillRule:evenodd;clip-rule:evenodd;fill:#E84142;}.st1{fill:#FFFFFF;}</style>
<g>	<circle className="st0" cx="127" cy="127" r="127"></circle><path className="st1" d="M171.8,130.3c4.4-7.6,11.5-7.6,15.9,0l27.4,48.1c4.4,7.6,0.8,13.8-8,13.8h-55.2c-8.7,0-12.3-6.2-8-13.8
		L171.8,130.3z M118.8,37.7c4.4-7.6,11.4-7.6,15.8,0l6.1,11L155.1,74c3.5,7.2,3.5,15.7,0,22.9l-48.3,83.7
		c-4.4,6.8-11.7,11.1-19.8,11.6H46.9c-8.8,0-12.4-6.1-8-13.8L118.8,37.7z"></path>
</g></svg> */}
                                              <p>0</p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-xl-12 col-lg-6 p-xl-0 ps-lg-3">
                                        <div className="ts-sidebar-box">
                                          <div className="ts-sidebar-box-inner">
                                            <div className="tss-title text-center">
                                              <h5>Your BNB Contributed</h5>
                                            </div>
                                            <div className="curr-box">
                                              <img
                                                src={Bnb}
                                                className="img-fluid"
                                                alt=""
                                              />
                                              {/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 254 254" style="enable-background:new 0 0 254 254;" xml:space="preserve"><style type="text/css">	.st0{fillRule:evenodd;clip-rule:evenodd;fill:#E84142;}.st1{fill:#FFFFFF;}</style>
<g>	<circle className="st0" cx="127" cy="127" r="127"></circle><path className="st1" d="M171.8,130.3c4.4-7.6,11.5-7.6,15.9,0l27.4,48.1c4.4,7.6,0.8,13.8-8,13.8h-55.2c-8.7,0-12.3-6.2-8-13.8
		L171.8,130.3z M118.8,37.7c4.4-7.6,11.4-7.6,15.8,0l6.1,11L155.1,74c3.5,7.2,3.5,15.7,0,22.9l-48.3,83.7
		c-4.4,6.8-11.7,11.1-19.8,11.6H46.9c-8.8,0-12.4-6.1-8-13.8L118.8,37.7z"></path>
</g></svg> */}
                                              <p>0</p>
                                            </div>

                                            <hr className="my-4" />

                                            <div className="tss-title text-center">
                                              <h5>Est. MIYAMOTO Received</h5>
                                            </div>
                                            <div className="curr-box">
                                              <img
                                                src={RoninCoin}
                                                className="img-fluid"
                                                alt=""
                                              />
                                              {/* <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 254 254" style="enable-background:new 0 0 254 254;" xml:space="preserve"><style type="text/css">	.st0{fillRule:evenodd;clip-rule:evenodd;fill:#E84142;}.st1{fill:#FFFFFF;}</style>
<g>	<circle className="st0" cx="127" cy="127" r="127"></circle><path className="st1" d="M171.8,130.3c4.4-7.6,11.5-7.6,15.9,0l27.4,48.1c4.4,7.6,0.8,13.8-8,13.8h-55.2c-8.7,0-12.3-6.2-8-13.8
		L171.8,130.3z M118.8,37.7c4.4-7.6,11.4-7.6,15.8,0l6.1,11L155.1,74c3.5,7.2,3.5,15.7,0,22.9l-48.3,83.7
		c-4.4,6.8-11.7,11.1-19.8,11.6H46.9c-8.8,0-12.4-6.1-8-13.8L118.8,37.7z"></path>
</g></svg> */}
                                              <p>0</p>
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

export default tokenSale;
