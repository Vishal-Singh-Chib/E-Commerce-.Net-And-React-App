import { useEffect, useState } from "react"
import type { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Button, Container, Typography } from "@mui/material";

function App() {
const [products,setProduct] = useState<Product[]>([]);

useEffect(()=>{
 fetch('https://localhost:5001/api/products').then(response=>response.json())
 .then(data=>setProduct(data)); 
  },[])

const addProduct =()=>{
      setProduct(prevState=>[...prevState,{
      name : 'ProductNo'+ (prevState.length+1),
      price : (prevState.length*100+100),
      id : prevState.length+1,
      quantityInStock : 100,
      description : "",
      type:"Test1",
      brand :"Test1",
      pictureUrl:""
    }]);
}
  return (
      <Container>
        <Typography variant='h4'>Re-store</Typography>
         <Button variant='contained' onClick={addProduct}>Add Product</Button>
        <Catalog products ={products}/>
      </Container>
  )
}
export default App
