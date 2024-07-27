import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useRouter } from 'next/router';

const Revenue: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => handleNavigation('/user_home')}>
            User Home
          </Typography>
          <Button color="inherit" onClick={() => handleNavigation('/our-fleet')}>
            Our Fleet
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/revenue')}>
            Revenue
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/contract')}>
            Contract
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/profile')}>
            profile
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/help')}>
            Help
          </Button>
          <Button color="inherit" onClick={() => handleNavigation('/')}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ p: 3 }}>
        <Typography variant="h4">Welcome to Revenue</Typography>
        {/* Add content here */}
      </Box>
     
    </Box>
  );
};

export default Revenue;
