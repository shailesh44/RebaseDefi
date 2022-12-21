import { React, useEffect } from "react";
import LogoNew from "../images/logo-new.png";
import Lg1 from "../images/lg1.png";
import Lg2 from "../images/lg2.png";
import ImgCup from "../images/img-cup.jpg";
import LitePaper from "../images/litepaper.pdf";
import { Link } from "react-router-dom";

const Index = ({ wallet }) => {
  useEffect(() => {
    console.log(wallet);
    document.getElementById("exampleModalLabel").style.display = "block";
  }, []);

  const LitePaperOpen = () => {
    console.log("litepaper.........");
    window.open(LitePaper, "_blank");
  };

  return (
    <>
      <div className="home-container">
        <div className="home-container-inner">
          <div className="container">
            <div className="home-box-outer">
              <div className="top-lg text-center">
                <img src={Lg1} className="img-fluid" alt="" />
                <img src={Lg2} className="img-fluid" alt="" />
              </div>
              <div className="home-box-top-logo text-center">
                <img src={LogoNew} className="img-fluid" alt="" />
                <div className="pwd">
                  <p>Powered by Artificial Intelligence</p>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="home-box-left">
                    {/* <div className="home-box-logo">
                                <img src="images/logo-new.png" className="img-fluid" alt=""/>
                            </div> */}
                    <div className="home-box-cup">
                      <img src={ImgCup} className="img-fluid" alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="home-box-right">
                    <div className="home-box-content">
                      <p>MIYAMOTO: Samurai warrior without a master.</p>
                      <p>
                        "There is more than one path to the top of the mountain"
                      </p>
                      <p className="home-box-name text-end">Miyamoto Musashi</p>
                    </div>
                    <div className="home-box-btn">
                      {/* <button onclick="location.href = 'pre-sale.php';" className="btn btn-gradient me-3">Open App</button> */}
                      {/* <button onclick=" window.open('images/litepaper.pdf','_blank')" className="btn btn-gradient btn-blank-blue">Read the Litepaper</button> */}

                      <Link to="/pre-sale">
                        {" "}
                        <button className="btn btn-gradient me-3">
                          Open App{" "}
                        </button>{" "}
                      </Link>
                      <button
                        onClick={LitePaperOpen}
                        className="btn btn-gradient btn-blank-blue"
                      >
                        Read the Litepaper
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="index-copy text-center">
                <p>© 2022 Miyamoto Inc LLC - All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade term-modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Warning & Disclaimer
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>
                The below information does not provide any advice,
                representation, warranty, certification, guarantee, or promise
                relating to $MYA (Miyamoto tokens) or any uses thereof, nor does
                it provide an offer or agreement to enter into any transaction.{" "}
              </p>
              <p>
                Acquiring/holding/owning/using $MYA does not provide/guarantee
                you or anybody else dividends, profits, or any kind of returns.
                Acquiring $MYA tokens does not provide you with any rights in
                any jurisdiction.{" "}
              </p>
              <p>
                The entire Miyamoto Inc. LLC and Team
                (founders/owners/developers/advisors or any other) and ecosystem
                shall not be liable to you or anybody else for any damage or
                (and) losses arising out of or in any connections with $MYA.{" "}
              </p>
              <p>
                If you do not agree with any part of this disclaimer, please
                consider leaving this website and never acquire/hold/own/use
                $MYA.{" "}
              </p>
              <p>
                Any person considering acquiring $MYA should consider seeking
                independent financial advice or other professional advice.{" "}
              </p>
              <p>
                Please do not make any financial or any other decisions based on
                the information shared in this website.{" "}
              </p>
              <p>Use it solely at your own risk. </p>
              <p>
                None of the information is financial advice, so please consider
                your actions very carefully.{" "}
              </p>
              <p>As always DYOR, Do Your Own Research.</p>
              <p>
                By clicking Agree & Continue, you are hereby confirming that you
                have understood all the risks involved with this protocol and
                that you are the sole person responsible for any decision or
                action taken hereafter.
              </p>
              <p>In good faith</p>
              <p>Miyamoto Inc. LLC</p>

              <div className="form-check agree-tick">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  <p>
                    I confirm that I have read, consent and agree to PayPal's{" "}
                    <Link to="#">User Agreement</Link> and{" "}
                    <Link to="#">Privacy Policy</Link> (including the processing
                    and disclosing of my personal data), and I am of legal age.
                    I understand that I can change my communication preferences
                    any time in my PayPal Account. For more information about
                    PayPal, see our
                    <Link to="#">Key Payment and Service Information</Link>.
                  </p>
                </label>
              </div>
            </div>
            <div className="modal-footer modal-footer-agree-tick">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Agree & Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <script>

    jQuery(document).ready(function(){
        jQuery('#exampleModal').modal('show')
    });

    jQuery(document).ready(function(){

        jQuery(".agree-tick").click(function()
        {
            jQuery('.modal-footer-agree-tick').addclassName("active");
        })

    });
</script> */}
    </>
  );
};

export default Index;
