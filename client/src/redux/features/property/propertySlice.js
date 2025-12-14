import { createSlice } from "@reduxjs/toolkit";

const propertySlice = createSlice({
  name: "property",
  initialState: {
    selectedProperty: null,
  },
  reducers: {
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
  },
});

export const { setSelectedProperty, clearSelectedProperty } =
  propertySlice.actions;
export default propertySlice.reducer;
