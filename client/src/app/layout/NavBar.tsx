import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
 
  Box,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import ThreePIcon from '@mui/icons-material/ThreeP';
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../store/store";

const midLinks = [ 
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightLinks = [
  { title: "register / login", path: "/login" }
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  textDecoration: "none",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "#baecf9",
  },
};
type Props = {
  toggleTheme: () => void;
  darkMode: boolean;
};
export default function NavBar({ toggleTheme, darkMode }: Props) {
  const {isLoading} = useAppSelector(state=>state.ui);
  return (
    <AppBar position="fixed">
      <Toolbar sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <Box display='flex' alignItems='center'>
           <IconButton style={{ color: "white" }}>
          <ThreePIcon></ThreePIcon>
          </IconButton>
          <Typography component={NavLink} to="/" variant="h6" sx={navStyles}>
            SOCIAL-PLATFORM
          </Typography>
          
         
          <List sx={{ display: "flex",alignContent:'flex-start' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {" "}
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        </Box>
        

       <Box display='flex' alignItems='center'>
         <IconButton onClick={toggleTheme}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
        <List sx={{ display: "flex" }}>
          {" "}
          {rightLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {" "}
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
       </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{width:'100%'}}>
          <LinearProgress color='secondary'/>
        </Box>
      )}
    </AppBar>
  );
}

//    <Box display='flex' justifyContent='center' gap={3} marginY={3}>
//    <Typography variant='h4'>Re-store</Typography>
//          <Button variant='contained' onClick={addProduct}>Add Product</Button>
//         </Box>
