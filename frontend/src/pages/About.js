import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          About CareerPath
        </Typography>
        <Typography paragraph>
          CareerPath is an innovative learning platform that helps individuals discover
          their ideal career path through a scientifically designed assessment and
          personalized course recommendations.
        </Typography>
        <Typography paragraph>
          Our mission is to bridge the gap between education and career by providing
          tailored learning experiences that align with each individual's strengths,
          interests, and aspirations.
        </Typography>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Our Technology
        </Typography>
        <Typography paragraph>
          We use advanced machine learning algorithms, including Random Forest classifiers,
          to analyze your assessment responses and predict the career paths that best
          match your profile.
        </Typography>
        <Typography paragraph>
          The platform then recommends courses that will help you develop the skills
          needed for your predicted career path.
        </Typography>
      </Paper>
    </Container>
  );
};

export default About;