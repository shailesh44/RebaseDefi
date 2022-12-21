import React from "react";

const mobile = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-container-inner">
          <div className="container">
            <div className="home-box-outer">
              <div className="home-box-top-logo text-center">
                <img src="images/logo-new.png" className="img-fluid" alt="" />
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="home-box-right">
                    <div className="home-box-content text-center">
                      <p>Miyamoto App is only available on desktop.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default mobile;
