import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

 
type Props = {
    toggleTheme: () => void,
    darkMode:boolean
}
export default function NavBar({toggleTheme,darkMode} : Props) {

  return (
    <AppBar position='fixed'>
        <Toolbar>
            <Typography variant='h6'>RE-STORE</Typography>
            <IconButton onClick={toggleTheme}>
                {darkMode ?<DarkMode/>:<LightMode sx={{color:'yellow'}}/>}
            </IconButton>
        </Toolbar>
       
    </AppBar>
  )
}

//    <Box display='flex' justifyContent='center' gap={3} marginY={3}>
//    <Typography variant='h4'>Re-store</Typography>
//          <Button variant='contained' onClick={addProduct}>Add Product</Button>
//         </Box>