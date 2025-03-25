
import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        py: 10,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Discover Your Career Path
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Take our assessment and get personalized course recommendations
          </Typography>
          {user ? (
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              component={Link} 
              to="/dashboard"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button 
              variant="contained" 
              color="secondary" 
              size="large" 
              component={Link} 
              to="/register"
            >
              Get Started
            </Button>
          )}
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>1. Take Assessment</Typography>
              <Typography>
                Answer simple questions about your interests and skills to help us 
                understand your career preferences.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>2. Get Recommendations</Typography>
              <Typography>
                Our AI analyzes your responses and suggests the best career path 
                and courses for you.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h5" gutterBottom>3. Start Learning</Typography>
              <Typography>
                Enroll in recommended courses and start building skills for your 
                dream career.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;