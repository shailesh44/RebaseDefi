import { walletDetails } from "../actionType"
const initialState = {
  walletData: {},
}
export default function walletDetail(state = initialState, { type, payload }) {
  switch (type) {
    case walletDetails.WALLET_DETAILS_DATA: {
      return {
        ...state,  walletData:payload
      }
    }
    case walletDetails.REMOVE_WALLET_DETAILS_DATA: {
      return {
        ...state,  walletData:{}
      }
    }
    default:
      return state
  }
}