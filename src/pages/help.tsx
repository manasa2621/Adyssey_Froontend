import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { AppBar, Toolbar  } from '@mui/material'
import { useRouter } from 'next/router'

const Help: React.FC = () => {
    const router = useRouter();

    const handleNavigation = (path: string) => {
      router.push(path);
    };
  const [query, setQuery] = useState<string>('');
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '';

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/help`, {
        email: userEmail,
        query: query,
      });
      alert('query sent succesfully');
      setQuery('');
    } catch (error) {
      console.error('Error sending help request:', error);
    }
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
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Help Center
        </Typography>

        <TextField
          label="Enter your query"
          variant="outlined"
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          margin="normal"
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </Box>
    </Container>
    
    </Box>
  );
};

export default Help;
