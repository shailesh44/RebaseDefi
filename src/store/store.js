// import { configureStore, createSlice } from "@reduxjs/toolkit";
// import walletReducer from "./walletSlice";

// const store = configureStore({
//   reducer: {
//     Wallet:walletReducer,
//   },
// });
// export default store;
import { createStore,applyMiddleware,compose} from "redux";
import rootReducer from "./rootReducer";
import ReduxThunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreMiddleware=composeEnhancers(applyMiddleware(
ReduxThunk
))(createStore)
const store=createStoreMiddleware(rootReducer);
export default store