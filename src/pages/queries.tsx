import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import AppBar from '@mui/material/AppBar'
import { useRouter } from 'next/router'
import Toolbar from '@mui/material/Toolbar'

interface QueryData {
  id: number
  email: string
  query: string
  response: string | null
}

const QueriesPage: React.FC = () => {
  const [queries, setQueries] = useState<QueryData[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedQuery, setSelectedQuery] = useState<QueryData | null>(null)
  const [responseText, setResponseText] = useState('')
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null)
  const router = useRouter()
  
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/help`)
        setQueries(response.data)
      } catch (error) {
        console.error('Error fetching queries:', error)
      }
    }

    fetchQueries()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest('tr') === null) {
        setSelectedEmail(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOpenDialog = (query: QueryData) => {
    setSelectedQuery(query)
    setResponseText('')
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedQuery(null)
  }

  const handleRespond = async () => {
    if (selectedQuery) {
      try {
        await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/help`, {
          email: selectedQuery.email,
          response: responseText,
        })
        // Refresh queries list after responding
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/help`)
        setQueries(response.data)
        handleCloseDialog()
      } catch (error) {
        console.error('Error responding to query:', error)
      }
    }
  }

  const handleDelete = async () => {
    if (selectedEmail) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/help`, {
          params: { email: selectedEmail },
        })
        // Refresh queries list after deletion
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/help`)
        setQueries(response.data)
        setSelectedEmail(null)
      } catch (error) {
        console.error('Error deleting query:', error)
      }
    }
  }

  const handleRowClick = (email: string) => {
    setSelectedEmail(email)
  }
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={() => handleNavigation('/adyssey_home')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/queries')}>
              Queries
            </Button>
            <Button color="inherit" onClick={() => handleNavigation('/')}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Typography variant="h4" gutterBottom>
          Queries
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>Query</TableCell>
                <TableCell>Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {queries.map((query) => (
                <TableRow
                  key={query.id}
                  onClick={() => handleRowClick(query.email)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{query.email}</TableCell>
                  <TableCell>{query.query}</TableCell>
                  <TableCell>
                    {query.response ? (
                      query.response
                    ) : (
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpenDialog(query)}
                        >
                          Respond
                        </Button>
                      </TableCell>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Respond Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Respond to Query</DialogTitle>
          <DialogContent>
            {selectedQuery && (
              <>
                <Typography variant="subtitle1">Email: {selectedQuery.email}</Typography>
                <Typography variant="subtitle1">Query: {selectedQuery.query}</Typography>
                <TextField
                  label="Response"
                  multiline
                  rows={4}
                  fullWidth
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  margin="normal"
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleRespond} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button
            variant="contained"
            color="error"
            disabled={!selectedEmail}
            onClick={handleDelete}
          >
            Delete Selected Query
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default QueriesPage
