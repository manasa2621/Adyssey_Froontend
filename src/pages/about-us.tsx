import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Header from '@/components/header/header'
import Footer from '@/components/footer/footer'
import { keyframes } from '@mui/system'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const AboutUs: React.FC = () => {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Header />
      <Container sx={{ flexGrow: 1, py: 6, bgcolor: 'white', borderRadius: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color: 'darkgreen' }}>
            Literally Driving Your Business Crazy
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.2rem', color: '#333', fontFamily: 'Arial, sans-serif' }}>
            We offer you the best service in any advertising industry, providing you mobile billboards as India’s first
            tech-enabled truck side marketing company.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'space-between',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          <Card
            sx={{
              width: isSmallScreen ? '100%' : '30%',
              borderRadius: 10,
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
              my: 4,
              animation: `${fadeIn} 0.8s ease-in-out`,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', mb: 2, color: 'darkgreen', fontFamily: 'Arial, sans-serif' }}
              >
                Practical
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: '#333', fontSize: '1.1rem', fontFamily: 'Arial, sans-serif' }}
              >
                We take pride in providing real-life difference in branding your product without hassle.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: isSmallScreen ? '100%' : '30%',
              borderRadius: 10,
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
              my: 4,
              animation: `${fadeIn} 0.8s ease-in-out`,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', mb: 2, color: 'darkgreen', fontFamily: 'Arial, sans-serif' }}
              >
                Loyal
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: '#333', fontSize: '1.1rem', fontFamily: 'Arial, sans-serif' }}
              >
                We are in the business to form elastic relationships with our clients and also our partners.
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: isSmallScreen ? '100%' : '30%',
              borderRadius: 10,
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
              my: 4,
              animation: `${fadeIn} 0.8s ease-in-out`,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                sx={{ fontWeight: 'bold', mb: 2, color: 'darkgreen', fontFamily: 'Arial, sans-serif' }}
              >
                Innovative
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 2, color: '#333', fontSize: '1.1rem', fontFamily: 'Arial, sans-serif' }}
              >
                We are always in motion, just like our fleet. We aim to transform outdoor advertising by making it easy
                and effective.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default AboutUs
