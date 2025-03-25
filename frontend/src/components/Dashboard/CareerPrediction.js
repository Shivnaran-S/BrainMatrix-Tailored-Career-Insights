import React from 'react';
import { Box, Typography, Paper, LinearProgress } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CareerPrediction = ({ career, confidence }) => {
  const data = {
    labels: ['Match Confidence', ''],
    datasets: [
      {
        data: [confidence, 100 - confidence],
        backgroundColor: ['#1976d2', '#e0e0e0'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h5" gutterBottom>Your Career Prediction</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Box sx={{ width: 120, height: 120 }}>
          <Doughnut data={data} options={options} />
          <Typography 
            variant="h6" 
            sx={{ 
              position: 'relative', 
              top: -90, 
              textAlign: 'center',
              fontWeight: 'bold'
            }}
          >
            {confidence}%
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" gutterBottom>
            {career.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {career.description}
          </Typography>
          <Typography variant="body2">
            <strong>Key Skills:</strong> {career.skills_needed}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default CareerPrediction;