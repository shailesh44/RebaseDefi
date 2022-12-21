import { walletDetails } from "../actionType";

export const getWalletData = (data) => ({
    type: walletDetails.WALLET_DETAILS_DATA,
    payload: data
  })

  export const removeWalletData = () => ({
    type: walletDetails.REMOVE_WALLET_DETAILS_DATA
  })

    