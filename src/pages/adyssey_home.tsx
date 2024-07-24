import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface TruckingData {
  id: number;
  vehicle_number: string;
  vehicle_type: string;
  registration_number: string;
  vehicle_dimention: string;
  vehicle_route: string;
  insurance_url: string | null;
  tax_url: string | null;
  rc_url: string | null;
  email: string;
}

const TruckingList: React.FC = () => {
  const [data, setData] = useState<TruckingData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/trucking`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching trucking data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    item.vehicle_route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Trucking Information
      </Typography>
      <TextField
        label="Search by Vehicle Route"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Registration Number</TableCell>
              <TableCell>Vehicle Dimension</TableCell>
              <TableCell>Vehicle Route</TableCell>
              <TableCell>Insurance URL</TableCell>
              <TableCell>Tax URL</TableCell>
              <TableCell>RC URL</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.vehicle_number}</TableCell>
                <TableCell>{row.vehicle_type}</TableCell>
                <TableCell>{row.registration_number}</TableCell>
                <TableCell>{row.vehicle_dimention}</TableCell>
                <TableCell>{row.vehicle_route}</TableCell>
                <TableCell>
                  {row.insurance_url ? (
                    <a href={row.insurance_url} target="_blank" rel="noopener noreferrer">View</a>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>
                  {row.tax_url ? (
                    <a href={row.tax_url} target="_blank" rel="noopener noreferrer">View</a>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>
                  {row.rc_url ? (
                    <a href={row.rc_url} target="_blank" rel="noopener noreferrer">View</a>
                  ) : 'N/A'}
                </TableCell>
                <TableCell>{row.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TruckingList;
