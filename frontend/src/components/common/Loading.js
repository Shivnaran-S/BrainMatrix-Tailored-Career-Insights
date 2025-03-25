import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh' 
      }}
    >
      <CircularProgress size={60} thickness={4} />
      {message && (
        <Typography variant="h6" sx={{ mt: 3 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;