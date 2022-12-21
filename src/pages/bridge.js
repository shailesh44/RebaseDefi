import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "react-video-js-player";
import Video2 from "../images/video-2.jpg";
import Video from "../images/video.mp4";

const Bridge = () => {
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
                  <div className="custom-container-inner_">
                    <h4 className="text-center mb-1">Bridge</h4>
                    <div className="it-title">
                      <p className="text-center">Tokens to bridge</p>
                    </div>

                    <div className="video-grid">
                      <div className="row justify-content-center">
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
                          <div className="ac-box">
                            <div className="ac-box-inner">
                              <div className="ts-form bs-form">
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="">
                                        <small>From Chain</small>
                                      </label>
                                      <select name="" className="form-control">
                                        <option>Avalance</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <label htmlFor="">
                                        <small>To Chain</small>
                                      </label>
                                      <select name="" className="form-control">
                                        <option>Fantom</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Amount"
                                      />
                                      <p
                                        style={{
                                          textAlign: "right",
                                          transform: "translateY(-32px)",
                                          translateX: "(-18px)",
                                          width: "50px",
                                          float: "right",
                                          marginRight: "10px",
                                        }}
                                      >
                                        Max
                                      </p>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <button
                                        type="button"
                                        className="btn btn-gradient w-100 btn-approve"
                                      >
                                        Approve
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="section-desc text-center">
                                <p className="m-0">
                                  <small>
                                    Note: The approve section transaction is
                                    only needed when bridge for the first time
                                    subsequent bridge only requires you to
                                    perform the "Bridge Transaction".
                                  </small>
                                </p>
                              </div>

                              <div className="bridge-table-section mt-4">
                                <table className="table table-borderless">
                                  <tbody>
                                    <tr>
                                      <td className="text-white">
                                        <small>Your Balance</small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>0wMYA</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>Expected</small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>0wMYA</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>Crosschain Fee</small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>0.0%</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>Minimum Crosschain Fee</small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>0.00056wMYA</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>Maximum Crosschain Fee</small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>0.015wMYA</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>Minimum Crosschain Amount</small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>75wMYA</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>Maximum Crosschain Amount</small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>75wMYA</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>
                                          Estimation Time of Crosschain Arrival
                                        </small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>10-30min</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>
                                          Crosschain amount larger than 15 wMYA
                                          could take upto
                                        </small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>12 hours</small>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="text-white">
                                        <small>Powered By</small>
                                      </td>
                                      <td className="text-white text-end">
                                        <small>Anyswap</small>
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

      <Footer />
    </>
  );
};

export default Bridge;
