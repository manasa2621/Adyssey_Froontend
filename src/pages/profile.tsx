import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { AppBar, Toolbar, Button, TextField, Grid, Container, IconButton, Avatar } from '@mui/material'
import { useRouter } from 'next/router'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Cancel'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import MenuIcon from '@mui/icons-material/Menu'
import useMediaQuery from '@mui/material/useMediaQuery'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState<any>(null)
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    insurance: null,
    tax: null,
    rc: null,
  })
  const router = useRouter()
  const isSmallScreen = useMediaQuery('(max-width:600px)')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setFormData(profile)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target
    if (fileList && fileList[0]) {
      setFiles({
        ...files,
        [name]: fileList[0],
      })
    }
  }

  const handleSave = async () => {
    try {
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('name', formData.name)
      formDataToSubmit.append('company_name', formData.company_name)
      formDataToSubmit.append('email', formData.email)
      formDataToSubmit.append('vehicle_number', formData.vehicle_number)
      formDataToSubmit.append('vehicle_type', formData.vehicle_type)
      formDataToSubmit.append('registration_number', formData.registration_number)
      formDataToSubmit.append('status', formData.status ? 'true' : 'false')

      // Append files
      if (files.insurance) {
        const insuranceResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
          files.insurance,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        formDataToSubmit.append('insuranceUrl', insuranceResponse.data.url)
      } else {
        formDataToSubmit.append('insuranceUrl', profile.insurance_url)
      }

      if (files.tax) {
        const taxResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
          files.tax,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        formDataToSubmit.append('taxUrl', taxResponse.data.url)
      } else {
        formDataToSubmit.append('taxUrl', profile.tax_url)
      }

      if (files.rc) {
        const rcResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/upload`,
          files.rc,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        formDataToSubmit.append('rcUrl', rcResponse.data.url)
      } else {
        formDataToSubmit.append('rcUrl', profile.rc_url)
      }

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/update_profile`, formDataToSubmit, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Refresh data after update
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user_profile?email=${formData.email}`)
      setProfile(response.data[0])
      setIsEditing(false)
    } catch (error) {
      setError('Error updating profile data')
    }
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail')
        if (!userEmail) {
          setError('No email found in local storage')
          return
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/user_profile?email=${userEmail}`)
        setProfile(response.data[0])
        setFormData(response.data[0]) // Initialize form data
      } catch (error) {
        setError('Error fetching profile data')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
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
    <Box sx={{ padding: 3 }}>
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
      <Container sx={{ marginTop: 3 }}>
        {loading ? (
          <Typography>Loading...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Paper sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              User Profile
            </Typography>
            {isEditing ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Name" name="name" value={formData.name || ''} onChange={handleChange} fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Company Name"
                    name="company_name"
                    value={formData.company_name || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    fullWidth
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Vehicle Number"
                    name="vehicle_number"
                    value={formData.vehicle_number || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Vehicle Type"
                    name="vehicle_type"
                    value={formData.vehicle_type || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Registration Number"
                    name="registration_number"
                    value={formData.registration_number || ''}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Insurance
                    <AttachFileIcon sx={{ ml: 1 }} />
                    <input
                      type="file"
                      name="insurance"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                  {profile.insurance_url && (
                    <a href={profile.insurance_url} target="_blank" rel="noopener noreferrer">
                      View Insurance
                    </a>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload Tax
                    <AttachFileIcon sx={{ ml: 1 }} />
                    <input
                      type="file"
                      name="tax"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                  {profile.tax_url && (
                    <a href={profile.tax_url} target="_blank" rel="noopener noreferrer">
                      View Tax
                    </a>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" component="label">
                    Upload RC
                    <AttachFileIcon sx={{ ml: 1 }} />
                    <input
                      type="file"
                      name="rc"
                      onChange={handleFileChange}
                      hidden
                    />
                  </Button>
                  {profile.rc_url && (
                    <a href={profile.rc_url} target="_blank" rel="noopener noreferrer">
                      View RC
                    </a>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<CancelIcon />}
                    onClick={() => setIsEditing(false)}
                    sx={{ ml: 2 }}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Name: {profile.name}</Typography>
                  <IconButton color="primary" onClick={handleEdit}>
                    <EditIcon />
                  </IconButton>
                </Box>
                <Typography variant="body1">Company Name: {profile.company_name}</Typography>
                <Typography variant="body1">Email: {profile.email}</Typography>
                <Typography variant="body1">Vehicle Number: {profile.vehicle_number}</Typography>
                <Typography variant="body1">Vehicle Type: {profile.vehicle_type}</Typography>
                <Typography variant="body1">Registration Number: {profile.registration_number}</Typography>
                {profile.insurance_url && (
                  <Typography variant="body1">
                    Insurance: <a href={profile.insurance_url} target="_blank" rel="noopener noreferrer">View</a>
                  </Typography>
                )}
                {profile.tax_url && (
                  <Typography variant="body1">
                    Tax: <a href={profile.tax_url} target="_blank" rel="noopener noreferrer">View</a>
                  </Typography>
                )}
                {profile.rc_url && (
                  <Typography variant="body1">
                    RC: <a href={profile.rc_url} target="_blank" rel="noopener noreferrer">View</a>
                  </Typography>
                )}
              </Box>
            )}
          </Paper>
        )}
      </Container>
    </Box>
  )
}

export default Profile
