import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'


const PartnerHome: React.FC = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    vehicleType: '',
    registrationNumber: '',
    insurance: null as File | null,
    tax: null as File | null,
    rc: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name as string]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    setFormData({
      ...formData,
      [name as string]: files ? files[0] : null,
    })
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
          <Select name="vehicleType" value={formData.vehicleType} label="Vehicle Type">
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Car">Car</MenuItem>
            <MenuItem value="Truck">Truck</MenuItem>
            <MenuItem value="Bike">Bike</MenuItem>
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
