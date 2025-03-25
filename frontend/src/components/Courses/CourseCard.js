import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material'; // Added Box import
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {course.title}
        </Typography>
        <Typography>
          {course.description.length > 100 
            ? `${course.description.substring(0, 100)}...` 
            : course.description}
        </Typography>
        <Box sx={{ mt: 2 }}> {/* This was causing the error */}
          <Typography variant="body2" color="text.secondary">
            Level: {course.get_level_display()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Duration: {course.duration_hours} hours
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            ${course.price}
          </Typography>
        </Box>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button
          component={Link}
          to={`/courses/${course.id}`}
          variant="contained"
          color="primary"
          fullWidth
        >
          View Details
        </Button>
      </Box>
    </Card>
  );
};

export default CourseCard;