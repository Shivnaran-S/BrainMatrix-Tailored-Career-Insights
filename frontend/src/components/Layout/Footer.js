import React from 'react';
import { Typography, Container, Box } from '@mui/material'; // Added Container and Box imports

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm"> {/* This was causing the error */}
        <Typography variant="body1" align="center">
          Learning Platform © {new Date().getFullYear()}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Helping you find the right career path
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;