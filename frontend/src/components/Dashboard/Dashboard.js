import React, { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CareerPrediction from './CareerPrediction';
import RecommendedCourses from '../Courses/RecommendedCourses';
import MyCourses from './MyCourses';
import api from '../../services/api';

const Dashboard = () => {
  const [careerPrediction, setCareerPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/courses/recommended/');
        setCareerPrediction(response.data.career_prediction);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>Your Dashboard</Typography>
        
        {careerPrediction && (
          <CareerPrediction 
            career={careerPrediction.career_path} 
            confidence={careerPrediction.confidence} 
          />
        )}
        
        <RecommendedCourses />
        <MyCourses />
      </Box>
    </Container>
  );
};

export default Dashboard;