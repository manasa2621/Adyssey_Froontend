import React from 'react'
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useRouter } from 'next/router'

const Revenue: React.FC = () => {
  const router = useRouter()
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

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
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
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
      <Box component="main" sx={{ p: 3 }}>
        <Typography variant="h4">Welcome to Revenue</Typography>
        {/* Add content here */}
      </Box>
    </Box>
  )
}

export default Revenue
