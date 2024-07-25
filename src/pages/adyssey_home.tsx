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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface TruckingData {
  id: number;
  name: string;
  vehicle_number: string;
  vehicle_type: string;
  registration_number: string;
  source: string;
  destination: string | null;
  insurance_url: string | null;
  tax_url: string | null;
  rc_url: string | null;
  company_name: string;
  status: boolean;
}

const TruckingList: React.FC = () => {
  const [data, setData] = useState<TruckingData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/trucking`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching trucking data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = async (id: number, vehicleNumber: string, status: boolean) => {
    try {
      await axios.post(`http://localhost:3002/activate`, {
        vehicleNumber,
        status,
      });
      // Refresh data after update
      const response = await axios.get(`http://localhost:3002/trucking`);
      setData(response.data);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredData = data.filter((item) => item.source && item.source.toLowerCase().includes(searchTerm.toLowerCase()));

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
              <TableCell>Employee Name</TableCell>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Vehicle Type</TableCell>
              <TableCell>Registration Number</TableCell>
              <TableCell>Vehicle Source</TableCell>
              <TableCell>Vehicle Destination</TableCell>
              <TableCell>Insurance</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>RC</TableCell>
              <TableCell>Company Name</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.vehicle_number}</TableCell>
                <TableCell>{row.vehicle_type}</TableCell>
                <TableCell>{row.registration_number}</TableCell>
                <TableCell>{row.source}</TableCell>
                <TableCell>{row.destination}</TableCell>
                <TableCell>
                  {row.insurance_url ? (
                    <a href={row.insurance_url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {row.tax_url ? (
                    <a href={row.tax_url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>
                  {row.rc_url ? (
                    <a href={row.rc_url} target="_blank" rel="noopener noreferrer">
                      View
                    </a>
                  ) : (
                    'N/A'
                  )}
                </TableCell>
                <TableCell>{row.company_name}</TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={row.status ? 'true' : 'false'}
                      label="Status"
                      onChange={(e) => handleStatusChange(row.id, row.vehicle_number, e.target.value === 'true')}
                    >
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TruckingList;
