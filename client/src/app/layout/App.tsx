import {   Box, Container, createTheme, CssBaseline, ThemeProvider    } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { darkModeOn, lightModeOn } from "./uiSlice";

function App() {
const {darkMode} =   useAppSelector(state=>state.ui);
const dispatch = useAppDispatch();

const toggleTheme = () => {
    if(darkMode)   
     dispatch(lightModeOn());
      else dispatch(darkModeOn());
  };
const palleteType= darkMode ? 'dark':'light'
const theme = createTheme({
  palette:{
    mode:palleteType,
    background:{default : (palleteType==='light')
      ?   'radial-gradient(circle,rgb(198, 211, 231),rgb(147, 168, 209))'
        : 'radial-gradient(circle,rgb(6, 42, 105), #6b8ecf)'} 
  }
})

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar toggleTheme={toggleTheme} darkMode={darkMode}/>
      <Box sx={{minHeight:'100vh',background: darkMode ?   'radial-gradient(circle,#1e3a3a,#111b27)'
        : 'radial-gradient(circle,rgb(198, 211, 231),rgb(147, 168, 209))', py:6}}
        > 
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
export default App
