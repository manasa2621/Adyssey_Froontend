// pages/agency_home.tsx

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const AgencyHome: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: 'background.default',
        p: 3,
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the Agency Home Page
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a simple Next.js page for agency users.
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained">Go to Home</Button>
      </Link>
    </Box>
  );
};

export default AgencyHome;
