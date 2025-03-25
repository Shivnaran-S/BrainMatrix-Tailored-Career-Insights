import React from 'react';
import { Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Error = ({ message, retryable }) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(0); // Reload the page
  };

  return (
    <Alert 
      severity="error" 
      action={
        retryable && (
          <Button color="inherit" size="small" onClick={handleRetry}>
            Retry
          </Button>
        )
      }
      sx={{ mb: 2 }}
    >
      {message || 'An error occurred. Please try again later.'}
    </Alert>
  );
};

export default Error;