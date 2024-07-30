import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, Box, Card, CardContent, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
  AppBar, Toolbar, useMediaQuery, Drawer, List, ListItem, ListItemText
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MenuIcon from '@mui/icons-material/Menu';

const Help: React.FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [responses, setResponses] = useState<any[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<any | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewAllOpen, setViewAllOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : '';

  useEffect(() => {
    if (userEmail) {
      fetchResponses();
    }
  }, [userEmail]);

  const fetchResponses = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/help_response`, {
        params: { email: userEmail },
      });
      setResponses(response.data);
    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/help`, {
        email: userEmail,
        query: query,
      });
      alert('Query sent successfully');
      setQuery('');
      fetchResponses();
    } catch (error) {
      console.error('Error sending help request:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/response_help`, {
        params: { id },
      });
      fetchResponses();
    } catch (error) {
      console.error('Error deleting response:', error);
    }
  };

  const handleViewResponse = (response: any) => {
    setSelectedResponse(response);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedResponse(null);
  };

  const handleViewAllResponses = () => {
    setViewAllOpen(true);
  };

  const handleCloseViewAllDialog = () => {
    setViewAllOpen(false);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem button onClick={() => handleNavigation('/user_home')}>
          <ListItemText primary="User Home" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/our-fleet')}>
          <ListItemText primary="Our Fleet" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/revenue')}>
          <ListItemText primary="Revenue" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/contract')}>
          <ListItemText primary="Contract" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/profile')}>
          <ListItemText primary="Profile" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/help')}>
          <ListItemText primary="Help" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/')}>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          {isSmallScreen ? (
            <>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
                {drawer}
              </Drawer>
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => handleNavigation('/user_home')}>
                User Home
              </Typography>
              <Button color="inherit" onClick={() => handleNavigation('/our-fleet')}>Our Fleet</Button>
              <Button color="inherit" onClick={() => handleNavigation('/revenue')}>Revenue</Button>
              <Button color="inherit" onClick={() => handleNavigation('/contract')}>Contract</Button>
              <Button color="inherit" onClick={() => handleNavigation('/profile')}>Profile</Button>
              <Button color="inherit" onClick={() => handleNavigation('/help')}>Help</Button>
              <Button color="inherit" onClick={() => handleNavigation('/')}>Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4} display="flex" justifyContent="center">
          <Card sx={{ minWidth: 300, maxWidth: 600, width: '100%', p: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#3f51b5', fontWeight: 'bold' }}>
                Help Center
              </Typography>
              <TextField
                label="Enter your query"
                variant="outlined"
                fullWidth
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                margin="normal"
                InputLabelProps={{ style: { color: '#3f51b5' } }}
                InputProps={{ style: { fontSize: '1.2rem' } }}
              />
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  sx={{ fontSize: '1rem', padding: '10px 20px' }}
                >
                  Send
                </Button>
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <IconButton color="primary" onClick={handleViewAllResponses}>
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Dialog open={viewAllOpen} onClose={handleCloseViewAllDialog} fullWidth maxWidth="md">
          <DialogTitle>All Queries and Responses</DialogTitle>
          <DialogContent>
            {responses.length === 0 ? (
              <Typography>No queries or responses available.</Typography>
            ) : (
              responses.map((response) => (
                <Card key={response.id} sx={{ mb: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Box display="flex" flexDirection="column">
                      <Typography variant="body1"><strong>Query:</strong> {response.query}</Typography>
                      <Typography variant="body1"><strong>Response:</strong> {response.response}</Typography>
                      <Box display="flex" justifyContent="flex-end" mt={2}>
                        <IconButton color="error" onClick={() => handleDelete(response.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseViewAllDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Response Details</DialogTitle>
          <DialogContent>
            {selectedResponse && (
              <>
                <Typography variant="subtitle1"><strong>Query:</strong> {selectedResponse.query}</Typography>
                <Typography variant="subtitle1"><strong>Response:</strong> {selectedResponse.response}</Typography>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Help;
