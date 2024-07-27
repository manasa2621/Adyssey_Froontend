import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { AppBar, Toolbar, Button, TextField, Grid, Container } from '@mui/material'
import { useRouter } from 'next/router'
import Link from '@mui/material/Link'

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
      if (files.insurance) formDataToSubmit.append('insurance', files.insurance)
      if (files.tax) formDataToSubmit.append('tax', files.tax)
      if (files.rc) formDataToSubmit.append('rc', files.rc)

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/update_profile`, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <Typography color="error">{error}</Typography>

  return (
    <Box sx={{ padding: 3 }}>
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
      <Container sx={{ marginTop: 3 }}>
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
                <input type="file" name="insurance" onChange={handleFileChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input type="file" name="tax" onChange={handleFileChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <input type="file" name="rc" onChange={handleFileChange} />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Box>
              <Typography variant="h6">Name: {profile.name}</Typography>
              <Typography variant="h6">Company Name: {profile.company_name}</Typography>
              <Typography variant="h6">Email: {profile.email}</Typography>
              <Typography variant="h6">Vehicle Number: {profile.vehicle_number}</Typography>
              <Typography variant="h6">Vehicle Type: {profile.vehicle_type}</Typography>
              <Typography variant="h6">Registration Number: {profile.registration_number}</Typography>
              <Typography variant="h6">
                Insurance:
                {profile.insurance_url ? (
                  <Link href={profile.insurance_url} target="_blank" rel="noopener noreferrer">
                    View
                  </Link>
                ) : (
                  ' N/A'
                )}
              </Typography>
              <Typography variant="h6">
                Tax:
                {profile.tax_url ? (
                  <Link href={profile.tax_url} target="_blank" rel="noopener noreferrer">
                    View
                  </Link>
                ) : (
                  ' N/A'
                )}
              </Typography>
              <Typography variant="h6">
                RC:
                {profile.rc_url ? (
                  <Link href={profile.rc_url} target="_blank" rel="noopener noreferrer">
                    View
                  </Link>
                ) : (
                  ' N/A'
                )}
              </Typography>
              <Typography variant="h6">Status: {profile.status ? 'Active' : 'Inactive'}</Typography>
              <Button variant="contained" color="primary" onClick={handleEdit}>
                Edit
              </Button>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default Profile
