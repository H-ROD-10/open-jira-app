import {useContext} from 'react';
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { UIContext } from '../../context/ui';


export const NavBar = () => {

  const {openSideMenu} = useContext(UIContext)
  return (
    <AppBar position="sticky">
        <Toolbar>
            <IconButton 
              size="large" 
              edge='start' 
              onClick={openSideMenu}
            >
                <MenuOutlinedIcon/>
            </IconButton>
            <Typography variant="h6">OpenJira</Typography>
        </Toolbar>
    </AppBar>
  )
}
