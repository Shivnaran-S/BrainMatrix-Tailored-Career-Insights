import React from 'react';
import { 
  Box, Typography, Container, Paper, 
  TextField, Button 
} from '@mui/material';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! (This is a demo)');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography paragraph>
          Have questions or feedback? We'd love to hear from you!
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Your Name"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            type="email"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Subject"
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Contact;