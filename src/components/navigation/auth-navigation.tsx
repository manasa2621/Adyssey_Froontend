/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { FC, useState } from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { StyledButton } from '@/components/styled-button'
import dynamic from 'next/dynamic'

// Dynamically import SignUpForm and SignInForm
const SignUpForm = dynamic(() => import('./signUpForm'), { ssr: false })
const SignInForm = dynamic(() => import('./signInForm'), { ssr: false })

const AuthNavigation: FC = () => {
  const [openSignUp, setOpenSignUp] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)

  const handleOpenSignUp = () => setOpenSignUp(true)
  const handleCloseSignUp = () => setOpenSignUp(false)

  const handleOpenSignIn = () => setOpenSignIn(true)
  const handleCloseSignIn = () => setOpenSignIn(false)

  return (
    <Box sx={{ '& button': { mr: 2 } }}>
      <StyledButton onClick={handleOpenSignIn}>Sign In</StyledButton>
      <StyledButton onClick={handleOpenSignUp}>Sign Up</StyledButton>

      {/* Sign Up Modal */}
      <Modal
        open={openSignUp}
        onClose={handleCloseSignUp}
        aria-labelledby="sign-up-modal"
        aria-describedby="sign-up-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <SignUpForm />
        </Box>
      </Modal>

      {/* Sign In Modal */}
      <Modal
        open={openSignIn}
        onClose={handleCloseSignIn}
        aria-labelledby="sign-in-modal"
        aria-describedby="sign-in-form"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <SignInForm />
        </Box>
      </Modal>
    </Box>
  )
}

export default AuthNavigation
