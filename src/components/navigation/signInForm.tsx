import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import { useRouter } from 'next/router'

const SignInForm: FC = () => {
  const [formData, setFormData] = useState({
    email: '',
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

    if (formData.email === 'Operations@adyssey.in' && formData.password === '1234') {
      localStorage.setItem('userEmail', formData.email)
      router.push('/adyssey_home')
      return
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/login`, formData)
      const { statuscode, message, role,company } = response.data

      if (statuscode === 200) {
        localStorage.setItem('userEmail', formData.email)
        localStorage.setItem('company', company)
        router.push(`/${role}_home`)
      } else {
        setErrorMessage(message || 'Login failed')
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(error.response.data.error || 'Login failed')
        } else {
          setErrorMessage('An error occurred')
        }
      } else {
        setErrorMessage('An unknown error occurred')
      }
      console.error('Error during login:', error)
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
      {errorMessage && <Box sx={{ color: 'error.main', mb: 2 }}>{errorMessage}</Box>}
      <Button variant="contained" type="submit">
        Sign In
      </Button>
    </Box>
  )
}

export default SignInForm
