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
                  <Button variant="outlined" component="label" fullWidth startIcon={<AttachFileIcon />}>
                    Upload Insurance
                    <input type="file" name="insurance" onChange={handleFileChange} hidden />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" component="label" fullWidth startIcon={<AttachFileIcon />}>
                    Upload Tax
                    <input type="file" name="tax" onChange={handleFileChange} hidden />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" component="label" fullWidth startIcon={<AttachFileIcon />}>
                    Upload RC
                    <input type="file" name="rc" onChange={handleFileChange} hidden />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="contained" color="primary" onClick={handleSave} startIcon={<SaveIcon />} fullWidth>
                    Save
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)} startIcon={<CancelIcon />} fullWidth>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Name:</Typography>
                    <Typography>{profile.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Company Name:</Typography>
                    <Typography>{profile.company_name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Email:</Typography>
                    <Typography>{profile.email}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Vehicle Number:</Typography>
                    <Typography>{profile.vehicle_number}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Vehicle Type:</Typography>
                    <Typography>{profile.vehicle_type}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Registration Number:</Typography>
                    <Typography>{profile.registration_number}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Insurance:</Typography>
                    {profile.insurance_url ? (
                      <Avatar variant="rounded" src={profile.insurance_url} sx={{ width: 100, height: 100 }} />
                    ) : (
                      <Typography>No Insurance Document</Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6">Tax:</Typography>
                    {profile.tax_url ? (
                      <Avatar variant="rounded" src={profile.tax_url} sx={{ width: 100, height: 100 }} />
                    ) : (
                      <Typography>No Tax Document</Typography>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="h6">RC:</Typography>
                    {profile.rc_url ? (
                      <Avatar variant="rounded" src={profile.rc_url} sx={{ width: 100, height: 100 }} />
                    ) : (
                      <Typography>No RC Document</Typography>
                    )}
                  </Grid>
                </Grid>
                <Button variant="contained" color="primary" onClick={handleEdit} startIcon={<EditIcon />} sx={{ marginTop: 2 }}>
                  Edit
                </Button>
              </Box>
            )}
          </Paper>
        )}
      </Container>
    </Box>
  )
}

export default Profile
