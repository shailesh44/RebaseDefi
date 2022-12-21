import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "../components/Sidebar";

const contact_us = () => {
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
                        <div className="content-top-title text-center">
                          <h1>Contact Us</h1>
                          {/* <p>Please fill the form below</p> */}
                        </div>

                        <div className="token-sale-section">
                          <div className="token-sale-inner">
                            <div className="row">
                              <div className="col-xl-12">
                                <div className="token-sale-left">
                                  <div className="token-sale-left-inner">
                                    <div className="ts-right">
                                      <div className="ts-right-inner">
                                        <div className="ts-title text-center">
                                          <h4>
                                            For all enquiries, please email us
                                            using the form below.
                                          </h4>
                                        </div>
                                        <div className="ts-form">
                                          <div className="row">
                                            <div className="col-md-6 pe-md-2">
                                              <div className="form-group">
                                                <input
                                                  type="text"
                                                  placeholder="Enter Name"
                                                  className="form-control"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-md-6 ps-md-2">
                                              <div className="form-group">
                                                <input
                                                  type="email"
                                                  placeholder="Enter Email"
                                                  className="form-control"
                                                />
                                              </div>
                                            </div>
                                            <div className="col-lg-12">
                                              <div className="form-group">
                                                <textarea
                                                  className="form-control"
                                                  name=""
                                                  id=""
                                                  cols="30"
                                                  rows="10"
                                                ></textarea>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-lg-12">
                                            <div className="btn-outer">
                                              <button className="btn btn-gradient w-100">
                                                Submit
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

export default contact_us;
