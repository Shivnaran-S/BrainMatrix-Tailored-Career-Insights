import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import { TextField, Button, Container, Typography, Box, Link } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    full_name: '',
    email: '',
    age: '',
    education: '',
    current_job: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/assessment');
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Current Job (if any)"
            name="current_job"
            value={formData.current_job}
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
        <Typography sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;