
import { useEffect, useState } from "react";
import type { Product } from "../../app/models/product"
import ProductList from "./ProductList";

export default function Catalog() {

  const [products,setProduct] = useState<Product[]>([]);

  useEffect(()=>{
 fetch('https://localhost:5001/api/products').then(response=>response.json())
 .then(data=>setProduct(data)); 
  },[])
  return (
    <>
        <ProductList products={products}/>
    </>
  )
}
