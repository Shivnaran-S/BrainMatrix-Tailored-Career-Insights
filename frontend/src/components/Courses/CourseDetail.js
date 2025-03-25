import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Button, Container, Chip, Divider, 
  LinearProgress, Alert 
} from '@mui/material';
import api from '../../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${id}/`);
        setCourse(response.data);
        
        // Check if course is already booked
        const bookings = await api.get('/bookings/');
        const booked = bookings.data.some(b => b.course.id === parseInt(id));
        setIsBooked(booked);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load course details');
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleBookCourse = async () => {
    try {
      await api.post('/bookings/', { course: id });
      setIsBooked(true);
    } catch (err) {
      setError('Failed to book course');
    }
  };

  if (loading) return <LinearProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>{course.title}</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Chip label={course.career_path.name} color="primary" />
          <Chip 
            label={
              course.level === 'B' ? 'Beginner' : 
              course.level === 'I' ? 'Intermediate' : 'Advanced'
            } 
            color="secondary" 
          />
          <Chip label={`${course.duration_hours} hours`} variant="outlined" />
          <Chip label={`$${course.price}`} color="success" />
        </Box>
        
        <Typography variant="h6" gutterBottom>About This Course</Typography>
        <Typography paragraph>{course.description}</Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>What You'll Learn</Typography>
        <Typography paragraph>{course.content}</Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate(-1)}
          >
            Back to Courses
          </Button>
          
          {isBooked ? (
            <Button variant="contained" color="success">
              Already Booked
            </Button>
          ) : (
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleBookCourse}
            >
              Book This Course
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default CourseDetail;