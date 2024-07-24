import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import axios from 'axios'
const PartnerHome: React.FC = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleType: '',
    registrationNumber: '',
    vehicleDimention: '',
    vehicleRoute: '',
    status: '', // Add the missing status property
    insurance: null as File | null,
    tax: null as File | null,
    rc: null as File | null,
  })

  const [fileUrls, setFileUrls] = useState({
    insuranceUrl: '',
    taxUrl: '',
    rcUrl: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      const file = files[0]
      const formDataToSend = new FormData()
      formDataToSend.append('file', file)

      try {
        const response = await axios.post('http://localhost:3002/upload', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        const { url } = response.data
        setFileUrls((prevUrls) => ({
          ...prevUrls,
          [`${name}Url`]: url,
        }))
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem('userEmail') || ''
    const allDetails = {
      vehicleNumber: formData.vehicleNumber,
      vehicleType: formData.vehicleType,
      registrationNumber: formData.registrationNumber,
      vehicleDimention: formData.vehicleDimention,
      vehicleRoute: formData.vehicleRoute,
      status: formData.status, // Include status in the submitted details
      insuranceUrl: fileUrls.insuranceUrl,
      taxUrl: fileUrls.taxUrl,
      rcUrl: fileUrls.rcUrl,
      email: userEmail,
    }
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/trucking`, allDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('Response from server:', response.data)
      // Handle success, e.g., display a success message
    } catch (error) {
      console.error('Error submitting data:', error)
      // Handle error, e.g., display an error message
    }

    // Save details to local storage
    localStorage.setItem('vehicleDetails', JSON.stringify(allDetails))

    // Log details to console
    console.log('Submitted details:', allDetails)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', bgcolor: '#f8f8f8' }}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          p: 3,
          width: '100%',
          maxWidth: 500,
          margin: '0 auto',
          bgcolor: 'background.paper',
          border: '1px solid #ccc',
          borderRadius: 2,
          boxShadow: 3,
        }}
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          handleSubmit();
        }}
        
      >
        <TextField
          label="Vehicle Number"
          variant="outlined"
          required
          name="vehicleNumber"
          value={formData.vehicleNumber}
          onChange={handleChange}
          fullWidth
        />
        <FormControl variant="outlined" required fullWidth>
          <InputLabel>Vehicle Type</InputLabel>
          <Select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleSelectChange} // Handle Select change
            label="Vehicle Type"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Car">Car</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Vehicle Dimension"
          variant="outlined"
          required
          name="vehicleDimention"
          value={formData.vehicleDimention}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Route of the Vehicle"
          variant="outlined"
          required
          name="vehicleRoute"
          value={formData.vehicleRoute}
          onChange={handleChange}
          fullWidth
        />
        <FormControl variant="outlined" required fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleSelectChange} // Handle Select change
            label="Status"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Registration Number"
          variant="outlined"
          required
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" component="label" fullWidth>
          Upload Insurance
          <input
            type="file"
            hidden
            name="insurance"
            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
        </Button>
        <Button variant="contained" component="label" fullWidth>
          Upload Tax
          <input type="file" hidden name="tax" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleFileChange} />
        </Button>
        <Button variant="contained" component="label" fullWidth>
          Upload RC
          <input type="file" hidden name="rc" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" onChange={handleFileChange} />
        </Button>
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </Box>
    </Box>
  )
}

export default PartnerHome
