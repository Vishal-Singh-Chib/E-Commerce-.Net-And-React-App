// import { useEffect, useState } from "react";
// import type { Product } from "../../app/models/product";
 import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogAPI";
// import { Label } from "@mui/icons-material";


export default function ProductDetails() {

  // const [product, setProduct] = useState<Product | null>(null);
   const { id } = useParams();

  // useEffect(() => {
  //   fetch(`https://localhost:5001/api/products/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => setProduct(data))
  //     .catch((error) => console.log(error));
  // }, [id]);
 const {data:product,isLoading} =useFetchProductDetailsQuery(id ? parseInt(id) : 0);
 
  if (isLoading || !product) return   (
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
const productDetails = [
      {label : 'Name' ,value : product.name},
      {label : 'Description' ,value : product.description},
      {label : 'Type' ,value : product.type},
      {label : 'Brand' ,value : product.brand},
      {label : 'Quantity in stock' ,value : product.quantityInStock}
]

  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant='h3'>
           {product.name}
        </Typography>
         <Typography variant='h4' color='secondary'>
           ₹{(product.price/100).toFixed(2)}
        </Typography>
        <TableContainer>
        <Table sx={{'& td':{fontSize :'1rem'}}}>
                <TableBody>
                  {productDetails.map((details,index)=>(
                     <TableRow key ={index}>
                           <TableCell  
                                 sx={{font:'bold'}}>{details.label}
                           </TableCell>
                            <TableCell>
                              {details.value}
                           </TableCell>
                     </TableRow>
                  ))}
               

                </TableBody>
        </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
              <Grid2 size={6}>
                <TextField
                 variant='outlined' 
                 type='number'
                 label='Quantity in basket'
                 fullWidth
                 defaultValue={1}/>
              </Grid2>
              <Grid2 size={6}>
                <Button sx={{height:'55px'}} color='primary' 
                size='large' 
                 variant='contained'
                fullWidth>
              Add To Basket
                </Button>
              </Grid2>
        </Grid2>
      </Grid2>
      
     
    </Grid2>
  );
}
