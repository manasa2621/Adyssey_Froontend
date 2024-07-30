import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Box, Button, Container, TextField, Grid, Card, CardContent, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import { useRouter } from 'next/router'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import axios from 'axios'

interface RouteDetails {
  source: string
  destination: string
}

const UserHome: React.FC = () => {
  const router = useRouter()
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [source, setSource] = useState<string>('')
  const [destination, setDestination] = useState<string>('')

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail')
    if (userEmail) {
      fetchRouteDetails(userEmail)
    }
  }, [])

  const fetchRouteDetails = async (email: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/home?email=${email}`)
      const data: RouteDetails = response.data[0]
      setRouteDetails(data)
      setSource(data.source)
      setDestination(data.destination)
    } catch (error) {
      console.error('Error fetching route details:', error)
    }
  }

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleUpdateClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = async () => {
    try {
      const email = localStorage.getItem('userEmail')
      if (email) {
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/home`, {
          email,
          source,
          destination,
        })
        setRouteDetails({ source, destination })
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Error updating route details:', error)
    }
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        User Home
      </Typography>
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
  )

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
                Profile
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/help')}>
                Help
              </Button>
              <Button color="inherit" onClick={() => handleNavigation('/')}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4} textAlign="center">
          <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
            Welcome User
          </Typography>
        </Box>
        {routeDetails ? (
          <Box mt={4} display="flex" justifyContent="center">
            <Card sx={{ minWidth: 300, maxWidth: 800, width: '100%', p: 3, boxShadow: 3 }}>
              <CardContent>
                {isEditing ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        fullWidth
                        InputLabelProps={{ style: { color: '#3f51b5' } }}
                        InputProps={{ style: { fontSize: '1.2rem' } }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Destination"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        fullWidth
                        InputLabelProps={{ style: { color: '#3f51b5' } }}
                        InputProps={{ style: { fontSize: '1.2rem' } }}
                      />
                    </Grid>
                    <Grid item xs={12} mt={2}>
                      <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        Save
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Box mt={2}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      Your current source and destination is:
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', mt: 1 }}>
                      Source: {routeDetails.source}
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', mt: 1 }}>
                      Destination: {routeDetails.destination}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleUpdateClick} sx={{ mt: 2 }}>
                      Update
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Typography variant="h6" mt={4} textAlign="center">
            Loading...
          </Typography>
        )}
      </Container>
    </Box>
  )
}

export default UserHome
