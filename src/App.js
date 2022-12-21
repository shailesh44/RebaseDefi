import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Borrow from "./pages/borrow";
import Bridge from "./pages/bridge";
import Wrap from "./pages/wrap";
import ContactUs from "./pages/contact-us";
import Mobile from "../src/pages/mobile";
import ParkingPage from "./pages/parking-page";
import Roi from "../src/pages/roi";
import TokenSale from "./pages/token-sale";
import Stake from "../src/pages/stake";
import IndexPage from "../src/pages/index";
import PreSale from "../src/pages/presale";
import Account from "../src/pages/account";
import Swap from "../src/pages/swap";
import Calculator from "../src/pages/calculator";
import WalkthroughVideos from "../src/pages/walkthrough-videos";
import Farm from "../src/pages/farm";
import ErrorBoundary from "./components/ErrorBoundary";
import "../src/nc_assets/css/style.css";
import "./css/bootstrap.css";
import "./css/style.css";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <ErrorBoundary>
            {/* <div className="app-page"> */}
            {/* <Header /> */}

            <Route
              exact
              path="/"
              component={(props) => <IndexPage {...props} />}
            />
            <Route
              exact
              path="/borrow"
              component={(props) => <Borrow {...props} />}
            />

            <Route
              exact
              path="/bridge"
              component={(props) => <Bridge {...props} />}
            />

            <Route
              exact
              path="/wrap"
              component={(props) => <Wrap {...props} />}
            />

            <Route
              exact
              path="/contact-us"
              component={(props) => <ContactUs {...props} />}
            />

            <Route
              exact
              path="/mobile"
              component={(props) => <Mobile {...props} />}
            />

            <Route
              exact
              path="/parking-page"
              component={(props) => <ParkingPage {...props} />}
            />

            <Route
              exact
              path="/roi"
              component={(props) => <Roi {...props} />}
            />

            <Route
              exact
              path="/token-sale"
              component={(props) => <TokenSale {...props} />}
            />

            <Route
              exact
              path="/stake"
              component={(props) => <Stake {...props} />}
            />

            <Route
              exact
              path="/pre-sale"
              component={(props) => <PreSale {...props} />}
            />

            <Route
              exact
              path="/farm"
              component={(props) => <Farm {...props} />}
            />

            <Route
              exact
              path="/account"
              component={(props) => <Account {...props} />}
            />

            <Route
              exact
              path="/swap"
              component={(props) => <Swap {...props} />}
            />

            <Route
              exact
              path="/calculator"
              component={(props) => <Calculator {...props} />}
            />

            <Route
              exact
              path="/walkthrough-videos"
              component={(props) => <WalkthroughVideos {...props} />}
            />
            {/* </div> */}
          </ErrorBoundary>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
