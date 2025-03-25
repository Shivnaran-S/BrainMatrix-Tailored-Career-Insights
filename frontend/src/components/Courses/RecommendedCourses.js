import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CourseCard from './CourseCard';
import api from '../../services/api';

const RecommendedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedCourses = async () => {
      try {
        const response = await api.get('/courses/recommended/');
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommended courses:', error);
        setLoading(false);
      }
    };
    fetchRecommendedCourses();
  }, []);

  if (loading) return <Typography>Loading recommended courses...</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Recommended For You</Typography>
      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedCourses;