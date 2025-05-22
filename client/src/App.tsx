import { useEffect, useState } from "react"
import type { Product } from "./Product";

function App() {
const [products,setProduct] = useState<Product[]>([]);

useEffect(()=>{
 fetch('https://localhost:5001/api/products').then(response=>response.json())
 .then(data=>setProduct(data));
  },[])

const addProduct =()=>{
      setProduct(prevState=>[...prevState,{
      name : 'Prod'+ (prevState.length+1),
      price : (prevState.length*100+100),
      id : prevState.length+1,
      quantityInStock : 100,
      description : "",
      type:"Test",
      brand :"Test",
      pictureUrl:""
    }]);
}
  return (
      <div>
        <h1 style={{color:'red'}}>Re-store</h1>
        <ul>{
          products.map((item,index) => (<li key ={index}>
            {item.name} -{item.price}
          </li>))}
        </ul>
        <button onClick={()=>addProduct()}>Add Product</button>
      </div>
  )
}
export default App
