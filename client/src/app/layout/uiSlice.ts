import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = () => {
  const storeDarkMode = localStorage.getItem("darkMode");
  return storeDarkMode ? JSON.parse(storeDarkMode) : true;
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    darkMode: getInitialDarkMode(),
    showUnauthorizedPopup: false, // ✅ added for popup
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    darkModeOn: (state) => {
      localStorage.setItem("darkMode", JSON.stringify(true));
      const storeDarkMode = localStorage.getItem("darkMode");
      state.darkMode = storeDarkMode ? JSON.parse(storeDarkMode) : true;
    },
    lightModeOn: (state) => {
      localStorage.setItem("darkMode", JSON.stringify(false));
      const storeDarkMode = localStorage.getItem("darkMode");
      state.darkMode = storeDarkMode ? JSON.parse(storeDarkMode) : true;
    },
    setUnauthorizedPopup: (state, action) => {
      state.showUnauthorizedPopup = action.payload;
    },
  }
});

export const {
  startLoading,
  stopLoading,
  darkModeOn,
  lightModeOn,
  setUnauthorizedPopup,
} = uiSlice.actions;

export default uiSlice.reducer;
