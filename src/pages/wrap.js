import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";
import VideoPlayer from "react-video-js-player";
import Video2 from "../images/video-2.jpg";
import Video from "../images/video.mp4";

const Wrap = () => {
  const TabContent1 = () => {
    document.getElementById("tab-content-2").style.display = "none";
    document.getElementById("tab-content-1").style.display = "block";
    document.getElementById("wrap").style.color = "#4AE3D0";
    document.getElementById("unwrap").style.color = "white";
  };
  const TabContent2 = () => {
    document.getElementById("tab-content-1").style.display = "none";
    document.getElementById("tab-content-2").style.display = "block";
    document.getElementById("unwrap").style.color = "#4AE3D0";
    document.getElementById("wrap").style.color = "white";
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
                        <h1>
                          <a
                            onClick={TabContent1}
                            className="tab-title active"
                            id="wrap"
                            style={{ color: "#4AE3D0" }}
                          >
                            Wrap
                          </a>{" "}
                          /
                          <a
                            onClick={TabContent2}
                            className="tab-title active"
                            id="unwrap"
                            style={{ color: "white" }}
                          >
                            Unwrap
                          </a>
                        </h1>
                      </div>

                      <div className="tab-content active" id="tab-content-1">
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
                            <div className="row justify-content-center">
                              <div className="col-lg-12">
                                <div className="ac-box-outer">
                                  <div className="ac-box">
                                    <div className="ac-box-inner">
                                      <div className="row">
                                        <div className="col-lg-5">
                                          <h4>Wrap</h4>
                                        </div>
                                        <div className="col-lg-7 text-end">
                                          <p>
                                            <small>1 MYA=0.0041 wMYA</small>
                                          </p>
                                          <p>
                                            <small>Balance: 0 MYA</small>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="ts-form memo-form bs-form mt-3">
                                        <div
                                          className="form-group"
                                          style={{ position: "relative" }}
                                        >
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="MYA Amount"
                                          />
                                          {/* <p style={{textAlign: "right"; transform: translateY "(-32px)" ; translateX "(-18px)" }}>Max</p> */}
                                          <p
                                            style={{
                                              position: "absolute",
                                              right: "25px",
                                              top: "17px",
                                            }}
                                          >
                                            {" "}
                                            Max{" "}
                                          </p>
                                        </div>
                                        <div className="memo-swap">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M508.485 184.485l-92.485 92c-4.687 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.687-4.686-4.687-12.284 0-16.971L452.893 192H12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h440.905l-60.946-60.444c-4.687-4.686-4.687-12.284 0-16.971l7.07-7.07c4.687-4.686 12.284-4.686 16.971 0l92.485 92c4.687 4.686 4.686 12.284 0 16.97zm-504.97 160l92.485 92c4.687 4.686 12.284 4.686 16.971 0l7.07-7.07c4.687-4.686 4.687-12.284 0-16.971L59.095 352H500c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H59.107l60.934-60.444c4.687-4.686 4.687-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.687-16.97 0l-92.485 92c-4.686 4.686-4.687 12.284 0 16.97z"
                                            ></path>
                                          </svg>
                                        </div>
                                        <div className="form-group mt-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="WMYA Amount"
                                          />
                                        </div>
                                        <div className="btn-outer mt-3">
                                          <button
                                            type="button"
                                            className="btn btn-gradient w-100"
                                          >
                                            Approve
                                          </button>
                                        </div>

                                        <div className="text-center mt-3">
                                          <p>
                                            <small>
                                              Note: The "Approve" transaction is
                                              only needed when wrapping for the
                                              first time subsequent wrapping
                                              only requires you to perform the
                                              "Wrap" Transaction.
                                            </small>
                                          </p>
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

                      <div className="tab-content" id="tab-content-2">
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
                            <div className="row justify-content-center">
                              <div className="col-lg-12">
                                <div className="ac-box-outer">
                                  <div className="ac-box">
                                    <div className="ac-box-inner">
                                      <div className="row">
                                        <div className="col-lg-5">
                                          <h4>Unwrap</h4>
                                        </div>
                                        <div className="col-lg-7 text-end">
                                          <p>
                                            <small>1 MYA=0.0041 wMYA</small>
                                          </p>
                                          <p>
                                            <small>Balance: 0 MYA</small>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="ts-form memo-form bs-form mt-3">
                                        <div
                                          className="form-group"
                                          style={{ position: "relative" }}
                                        >
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="MYA Amount"
                                          />
                                          {/* <p style= {{ textAlign: "right" ; transform: translateY(-32px) ; translateX(-18px) }}  >Max</p> */}
                                          <p
                                            style={{
                                              position: "absolute",
                                              right: "25px",
                                              top: "17px",
                                            }}
                                          >
                                            {" "}
                                            Max{" "}
                                          </p>
                                        </div>
                                        <div className="memo-swap">
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                          >
                                            <path
                                              fill="currentColor"
                                              d="M508.485 184.485l-92.485 92c-4.687 4.686-12.284 4.686-16.97 0l-7.071-7.07c-4.687-4.686-4.687-12.284 0-16.971L452.893 192H12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h440.905l-60.946-60.444c-4.687-4.686-4.687-12.284 0-16.971l7.07-7.07c4.687-4.686 12.284-4.686 16.971 0l92.485 92c4.687 4.686 4.686 12.284 0 16.97zm-504.97 160l92.485 92c4.687 4.686 12.284 4.686 16.971 0l7.07-7.07c4.687-4.686 4.687-12.284 0-16.971L59.095 352H500c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H59.107l60.934-60.444c4.687-4.686 4.687-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.687-16.97 0l-92.485 92c-4.686 4.686-4.687 12.284 0 16.97z"
                                            ></path>
                                          </svg>
                                        </div>
                                        <div className="form-group mt-3">
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="WMYA Amount"
                                          />
                                        </div>
                                        <div className="btn-outer mt-3">
                                          <button
                                            type="button"
                                            className="btn btn-gradient w-100"
                                          >
                                            Approve
                                          </button>
                                        </div>

                                        <div className="text-center mt-3">
                                          <p>
                                            <small>
                                              Note: The "Approve" transaction is
                                              only needed when wrapping for the
                                              first time subsequent wrapping
                                              only requires you to perform the
                                              "Wrap" Transaction.
                                            </small>
                                          </p>
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
    </>
  );
};

export default Wrap;
