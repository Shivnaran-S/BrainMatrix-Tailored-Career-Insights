import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, LinearProgress, Alert } from '@mui/material';
import CourseCard from '../Courses/CourseCard';
import api from '../../services/api';

const MyCourses = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/bookings/');
        setBookings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load your courses');
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>My Courses</Typography>
      {bookings.length === 0 ? (
        <Typography>You haven't booked any courses yet.</Typography>
      ) : (
        <Grid container spacing={3}>
          {bookings.map(booking => (
            <Grid item xs={12} sm={6} md={4} key={booking.id}>
              <CourseCard course={booking.course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default MyCourses;