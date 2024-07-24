import React, { useState, ChangeEvent } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const TruckingPartners: React.FC = () => {
  const [email, setEmail] = useState<string>('')

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }

  const handleSubmit = (): void => {
    // Handle submission logic here, such as sending the email to a server
    console.log('Submitted email:', email)
    // Optionally, clear the email field after submission
    setEmail('')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f0f0f0' }}>
      <Header />
      <Container sx={{ flexGrow: 1 }}>
        <Card variant="outlined" sx={{ p: 3, mt: 4, bgcolor: 'white' }}>
          <CardContent>
            <Typography variant="h4" sx={{ color: '#0b6623', fontWeight: 'bold', mb: 2 }}>
              Advertisers
            </Typography>
            <Card
              variant="outlined"
              sx={{
                mb: 2,
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
              }}
            />
            <Card
              variant="outlined"
              sx={{
                mb: 2,
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
              }}
            >
              <CardContent>
                Thank you for showing your interest in our Company. As we are still growing, our progress for these
                pages will be done slowly. Stay with us!
              </CardContent>
            </Card>
            <Card
              sx={{
                transition: 'box-shadow 0.3s',
                '&:hover': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
              }}
            >
              <CardContent>
                Please provide your email so we can update you about our progress:
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <TextField label="Email" variant="outlined" value={email} onChange={handleEmailChange} />
                  <Button variant="contained" onClick={handleSubmit} sx={{ ml: 2 }}>
                    Submit
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </Box>
  )
}

export default TruckingPartners
