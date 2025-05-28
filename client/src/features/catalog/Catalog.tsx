
// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/product"
import { Box, CircularProgress, Typography } from "@mui/material";
import ProductList from "./ProductList";
import { useFetchProductsQuery } from "./catalogAPI";

export default function Catalog() {

//   const [products,setProduct] = useState<Product[]>([]);

//   useEffect(()=>{
//  fetch('https://localhost:5001/api/products').then(response=>response.json())
//  .then(data=>setProduct(data)); 
//   },[])

 const {data,isLoading} =useFetchProductsQuery();

if (isLoading || !data) 
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress color="primary" />
      <Typography variant="h6" color="text.secondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
  return (
    <>
        <ProductList products={data}/>
    </>
  )
}
