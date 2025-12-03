import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seller: null,
  isSellerAuthenticated: false,
  sellerLoading: true,
};

const sellerAuthSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {
    setSellerCredentials: (state, action) => {
      state.seller = action.payload;
      state.isSellerAuthenticated = true;
      state.sellerLoading = false;
    },
    sellerLogoutState: (state) => {
      state.seller = null;
      state.isSellerAuthenticated = false;
      state.sellerLoading = false;
    },
    finishSellerLoading: (state) => {
      state.sellerLoading = false;
    },
  },
});

export const { setSellerCredentials, sellerLogoutState, finishSellerLoading } =
  sellerAuthSlice.actions;

export default sellerAuthSlice.reducer;
