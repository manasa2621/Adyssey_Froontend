import React, { FC, useRef } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { data } from './feature.data'
import ArtTrackIcon from '@mui/icons-material/ArtTrack'

interface StepProps {
  title: string
  description: string
  icon: JSX.Element
}

const Step: FC<StepProps> = ({ title, description, icon }) => {
  const [ref, inView] = useInView()

  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 200 }}
      initial={{ opacity: 0, x: 200 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'relative' }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          boxShadow: 1,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box
          sx={{
            mr: 1,
            backgroundColor: 'primary.main',
            borderRadius: '50%',
            height: 36,
            width: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'primary.contrastText',
            '& svg': {
              fontSize: 20,
            },
          }}
        >
          {icon}
        </Box>
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
          <Typography variant="h2" sx={{ fontSize: '2rem', mb: 1, color: 'secondary.main' }}>
            {title}
          </Typography>
          <Typography sx={{ lineHeight: 1.8, color: 'text.secondary', fontSize: '1rem' }} variant="subtitle1">
            {description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  )
}

const HomeFeature: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Box
      id="feature"
      ref={containerRef}
      sx={{
        py: { xs: 10, md: 14 },
        backgroundColor: 'background.paper',
        position: 'relative',
        overflowY: 'scroll',
        height: '80vh',
      }}
    >
      <Container>
        <Typography
          component="h2"
          sx={{
            position: 'relative',
            fontSize: { xs: 40, md: 50 },
            ml: { xs: 0, md: 4 },
            mt: 2,
            mb: 3,
            lineHeight: 1,
            fontWeight: 'bold',
          }}
        >
          How it{' '}
          <Typography
            component="mark"
            sx={{
              position: 'relative',
              color: 'primary.main',
              fontSize: 'inherit',
              fontWeight: 'inherit',
              backgroundColor: 'unset',
            }}
          >
            Works <br />
            <Box
              sx={{
                position: 'absolute',
                top: { xs: 20, md: 28 },
                transform: 'rotate(3deg)',
                left: 2,
                '& img': { width: { xs: 140, md: 175 }, height: 'auto' },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/headline-curve.svg" alt="Headline curve" />
            </Box>
          </Typography>
        </Typography>

        <Typography sx={{ color: 'text.secondary', mb: 2, ml: { xs: 0, md: 4 }, fontSize: '2rem' }}>
          Driving Brand Visibility: Tech-Powered Ads on the Move
        </Typography>

        {data.map((step, index) => (
          <Step key={index} title={step.title} description={step.description} icon={<ArtTrackIcon />} />
        ))}
      </Container>
    </Box>
  )
}

export default HomeFeature
