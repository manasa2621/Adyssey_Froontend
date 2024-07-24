import React, { FC } from 'react'
import Link from 'next/link'
import { Box, Typography } from '@mui/material'

interface Props {
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

const Logo: FC<Props> = ({ onClick, variant }) => {
  return (
    <Link href="/" passHref>
      <Box component="a" onClick={onClick} sx={{ textDecoration: 'none', cursor: 'pointer' }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: '2.5rem',
            fontWeight: 700,
            '& span': { color: variant === 'primary' ? 'primary.main' : 'unset' },
          }}
        >
          <span>ADYSSEY</span>
        </Typography>
      </Box>
    </Link>
  )
}

Logo.defaultProps = {
  variant: 'primary',
}

export default Logo
