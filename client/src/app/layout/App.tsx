import { useEffect, useState } from "react"
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import {   Box, Container, createTheme, CssBaseline, ThemeProvider    } from "@mui/material";
import NavBar from "./NavBar";


function App() {
const [products,setProduct] = useState<Product[]>([]);
const [darkMode, setDarkMode] = useState(false);
    
const toggleTheme = () => {
    setDarkMode(prev => !prev); // ✅ toggles the state properly
  };
const palleteType= darkMode ? 'dark':'light'
const theme = createTheme({
  palette:{
    mode:palleteType,
    background:{default : (palleteType==='light')
      ?   'radial-gradient(circle,rgb(38, 89, 177), #6b8ecf)'
        : 'radial-gradient(circle,rgb(6, 42, 105), #6b8ecf)'} 
  }
})
useEffect(()=>{
 fetch('https://localhost:5001/api/products').then(response=>response.json())
 .then(data=>setProduct(data)); 
  },[])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <NavBar toggleTheme={toggleTheme} darkMode={darkMode}/>
      <Box sx={{minHeight:'100vh',background: darkMode ?   'radial-gradient(circle,#1e3a3a,#111b27)'
        : 'radial-gradient(circle,#baecf9,#fof9ff)', py:6}}
        > 
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
export default App
