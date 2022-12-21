import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/footer";
import Header from "../components/header";
import VideoPlayer from "react-video-js-player";
import Video from "../images/video.mp4";
import Video1 from "../images/video-1.jpg";
import Video2 from "../images/video-2.jpg";
import Video3 from "../images/video-3.jpg";

const walkthrough_videos = () => {
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
                    <div className="custom-container-inner">
                      <h4 className="text-center mb-3">Walkthrough Videos</h4>

                      <div className="video-grid">
                        <div className="row">
                          <div className="col-lg-6 walkVideos">
                            {/* <div className="video-outer"> */}
                            <div className="videoBox">
                              <div className="videoInner">
                                <VideoPlayer
                                  className="video"
                                  src={Video}
                                  poster={Video1}
                                  width="420"
                                  height="250"
                                />
                              </div>
                            </div>
                            {/* Your browser does not support the video tag.                    */}
                          </div>
                          <div className="col-lg-6 walkVideos">
                            {/* <div className="video-outer"> */}
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
                            {/* <video controls poster={Video2}>
                                                    <source src={Video} type="video/mp4">
                                                    <source src={Video} type="video/ogg">
                                                    Your browser does not support the video tag.
                                                </video> */}
                            {/* </div> */}
                          </div>
                          <div className="col-lg-6 walkVideos">
                            <div className="videoBox">
                              <div className="videoInner">
                                <VideoPlayer
                                  className="video"
                                  src={Video}
                                  poster={Video3}
                                  width="420"
                                  height="250"
                                />
                              </div>
                            </div>
                            {/* <div className="video-outer">
                                                <video controls poster={Video3}>
                                                    <source src={Video} type="video/mp4">
                                                    <source src={Video} type="video/ogg">
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div> */}
                          </div>
                          <div className="col-lg-6 walkVideos">
                            <div className="videoBox">
                              <div className="videoInner">
                                <VideoPlayer
                                  className="video"
                                  src={Video}
                                  poster={Video1}
                                  width="420"
                                  height="250"
                                />
                              </div>
                            </div>
                            {/* <div className="video-outer">
                                                <video controls poster={Video1}>
                                                    <source src={Video} type="video/mp4">
                                                    <source src={Video} type="video/ogg">
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div> */}
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

export default walkthrough_videos;
