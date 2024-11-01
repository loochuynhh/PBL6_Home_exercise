import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar({ menuItems = [] }) {  // Provide a default empty array
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Box>
          {menuItems && menuItems.length > 0 && menuItems.map((item) => (  // Add a check
            <Button
              key={item.name}
              color="inherit"
              component={Link}
              to={item.path}
              startIcon={item.icon && <item.icon />}
            >
              {item.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;