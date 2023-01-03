import {useContext} from 'react';
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { UIContext } from '../../context/ui';
import NextLink from 'next/link';
import { Link } from '@mui/material';


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
            <NextLink href={'/'} passHref legacyBehavior>
              
                <Link underline='none' color={'white'}>
                  <Typography variant="h6">OpenJira</Typography>
                </Link>
            
            </NextLink>
        </Toolbar>
    </AppBar>
  )
}
