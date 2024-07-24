import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import axios from 'axios'

const SignUpForm: FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    company_name: '',
    role: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState<string>('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const response = await axios.post(`process.env.REACT_APP_BASE_URL/employees`, formData)
      console.log('Data submitted successfully:', response.data)
      alert('Registration successful')
      router.reload() // Refresh the page
    } catch (error: any) {
      console.error('Error submitting data:', error)
      setErrorMessage('Error submitting data. Please try again.')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        p: 2,
        width: '100%',
        maxWidth: 400,
        bgcolor: 'background.paper',
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 24,
      }}
    >
      <TextField
        label="First Name"
        variant="outlined"
        required
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        required
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <TextField
        label="Company Name"
        variant="outlined"
        required
        name="company_name"
        value={formData.company_name}
        onChange={handleChange}
      />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        required
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        required
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">I am a</FormLabel>
        <RadioGroup name="role" value={formData.role} onChange={handleChange}>
          <FormControlLabel value="Brand" control={<Radio />} label="Brand" />
          <FormControlLabel value="Agency" control={<Radio />} label="Agency" />
          <FormControlLabel value="Partner" control={<Radio />} label="Truck Owner/Operator" />
          <FormControlLabel value="LeasingCompany" control={<Radio />} label="Truck Leasing Company" />
        </RadioGroup>
      </FormControl>
      {errorMessage && <Box sx={{ color: 'error.main', mb: 2 }}>{errorMessage}</Box>}
      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  )
}

export default SignUpForm
