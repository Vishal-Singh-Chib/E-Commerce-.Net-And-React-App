import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/store";
import { setUnauthorizedPopup } from "./uiSlice";
import { useEffect } from "react";

export default function UnAuthorized() {
  const dispatch = useDispatch();
  const { showUnauthorizedPopup } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(setUnauthorizedPopup(false));
    } else {
      dispatch(setUnauthorizedPopup(true));
    }
  }, [dispatch]);

  const handleClose = () => {
    dispatch(setUnauthorizedPopup(false));
  };

  return (
    <>
      <Snackbar
        open={showUnauthorizedPopup}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" onClose={handleClose}>
          Unauthorized! Please log in again.
        </Alert>
      </Snackbar>
    </>
  );
}
