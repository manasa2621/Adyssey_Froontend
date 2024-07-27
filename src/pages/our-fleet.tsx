import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Card, CardContent, Grid } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'

const OurFleet: React.FC = () => {
    const router = useRouter();



  const [vehicleStats, setVehicleStats] = useState({
    total_vehicles: 0,
    active_vehicles: 0,
  })

  useEffect(() => {
    const fetchVehicleStats = async () => {
      const company_name = localStorage.getItem('company') || ''

      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/count`, {
          params: { company_name },
        })
        setVehicleStats(response.data)
      } catch (error) {
        console.error('Error fetching vehicle stats:', error)
      }
    }

    fetchVehicleStats()
  }, [])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
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
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Fleet Statistics
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Total Vehicles
                </Typography>
                <Typography variant="h2" color="text.secondary">
                  {vehicleStats.total_vehicles}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  Active Vehicles
                </Typography>
                <Typography variant="h2" color="text.secondary">
                  {vehicleStats.active_vehicles}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default OurFleet