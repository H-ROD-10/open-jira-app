
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import ListItem  from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import { UIContext } from "../../context/ui";


export const Sidebar = () => {

    const {sideMenuOpen, closeSideMenu} = useContext(UIContext)

    const menuItems = ['Inbox', 'Send Email', 'Starrred']
  return (
    <Drawer
        anchor="left"
        open={sideMenuOpen}
        onClose={closeSideMenu}
    
    >
        <Box sx={{ width: 250}}>
            <Box sx={{padding: '5px 10px'}}>
                <Typography variant="h4">Menu</Typography>

            </Box>
        
            <List>
                {menuItems.map((item, i) => (
                    <ListItem key={i}>
                        <ListItemButton>
                        <ListItemIcon>
                            {i % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                )
                )}
            </List>

            <Divider/>

        </Box>
       
    </Drawer>
  )
}
