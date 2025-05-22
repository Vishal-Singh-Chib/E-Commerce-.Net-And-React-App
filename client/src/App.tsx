const products = [{
  name : 'Prod1',Price : 300
},{
  name : 'Prod2',Price : 400
},{
  name : 'Prod3',Price : 400
}]

function App() {
  return (
      <div>
        <h1 style={{color:'red'}}>Re-store</h1>
        <ul>
          {
          products.map((item,index) => (<li key ={index}>
            {item.name} -{item.Price}
          </li>))}
        </ul>
      </div>
  )
}
export default App
