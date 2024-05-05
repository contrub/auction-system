import * as React from 'react';
import {AppBar, Drawer, IconButton, Toolbar} from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from '@mui/icons-material/Menu';

export default function Navbar() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}/>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon/>
                </IconButton>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </Toolbar>
        </AppBar>
    );
}
