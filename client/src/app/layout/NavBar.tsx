import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
  
const midLinks = [
  {title : 'catalog',path: '/catalog'},
  {title : 'about',path: '/about'},
  {title : 'contact',path: '/contact'}
]

const rightLinks = [
  {title : 'login',path: '/login'},
  {title : 'register',path: '/register' }
]

type Props = {
    toggleTheme: () => void,
    darkMode:boolean
}
export default function NavBar({toggleTheme,darkMode} : Props) {

  return (
    <AppBar position='fixed'>
        <Toolbar>
            <Typography component={NavLink} to='/' variant='h6'>RE-STORE</Typography>
            <IconButton onClick={toggleTheme}>
                {darkMode ?<DarkMode/>:<LightMode sx={{color:'yellow'}}/>}
            </IconButton>
            <List
             sx={{display:'flex'}}
>           {midLinks.map(({title,path})=>(
              <ListItem
              component={NavLink} to={path}
               key={path} 
               sx={{color:'inherit',typography:'h6',
                textDecoration:'none', '&:hover':{
                  color:'grey.500'
                },
                '&.active' :{
                  color:'#baecf9'
                }
               }}
            > {title.toUpperCase()}</ListItem>
            ))}
            </List> 

            <IconButton style={{color:'white'}}>
              <Badge badgeContent='4' color='secondary'>
             <ShoppingCart></ShoppingCart>
              </Badge>
            </IconButton>
            <List
             sx={{display:'flex'}}
>           {rightLinks.map(({title,path})=>(
              <ListItem  
              component={NavLink} to={path} key={path} sx={{color:'inherit',typography:'h6'}}
            > {title.toUpperCase()}
            </ListItem>
            ))}
            </List> 
        </Toolbar>  
    </AppBar>
  )
}

//    <Box display='flex' justifyContent='center' gap={3} marginY={3}>
//    <Typography variant='h4'>Re-store</Typography>
//          <Button variant='contained' onClick={addProduct}>Add Product</Button>
//         </Box>