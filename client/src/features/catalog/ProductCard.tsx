import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { Product } from "../../app/models/product"
import { Link } from "react-router-dom"

 type Props = {
    product :Product
 }

export default function ProductCard({product}:Props) {
  return (
    <Card elevation={3}
     sx={{
        width:250,
        borderRadius:2,
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-between'
    }}>
      <CardMedia 
      sx={{height:240,backgroundSize:'cover'}}
      image={product.pictureUrl ? product.pictureUrl : ''}
      title={product.name}     
      />
      <CardContent>
        <Typography 
        sx={{textTransform:'uppercase'}}
        gutterBottom variant='subtitle2'
        >       {product.name} 
        </Typography>
         <Typography 
         variant='h6'
        sx={{color:'secondary.main'}}
        >    
        ${(product.price/100).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent:'space-between'}}>
        <Button>Add To Card</Button>
        <Button LinkComponent={Link} to={`/catalog/${product.id}`} >View</Button>
      </CardActions>
    </Card>
  )
}
