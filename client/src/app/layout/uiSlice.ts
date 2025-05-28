import { createSlice } from "@reduxjs/toolkit";

const getInitialDarkMode = ()=>{
  const storeDarkMode = localStorage.getItem('darkMode');
  return storeDarkMode ? JSON.parse(storeDarkMode):true;
}

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLoading: false,
    darkMode: getInitialDarkMode(),
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
      if (storeDarkMode !== null) {
        state.darkMode = JSON.parse(storeDarkMode);
      } else {
        state.darkMode = true; // default to true if nothing in storage
      }
    },
    lightModeOn: (state) => {
      localStorage.setItem("darkMode", JSON.stringify(false));
     const storeDarkMode = localStorage.getItem("darkMode");
      if (storeDarkMode !== null) {
        state.darkMode = JSON.parse(storeDarkMode);
      } else {
        state.darkMode = true; // default to true if nothing in storage
      }
    },
  },
});

export const { startLoading, stopLoading, darkModeOn, lightModeOn } =
  uiSlice.actions;
