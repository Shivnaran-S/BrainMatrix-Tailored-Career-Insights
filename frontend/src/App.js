import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Assessment from './components/Assessment/Assessment';
import Dashboard from './components/Dashboard/Dashboard';
import CourseDetail from './components/Courses/CourseDetail';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/assessment" element={
              <PrivateRoute>
                <Assessment />
              </PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/courses/:id" element={
              <PrivateRoute>
                <CourseDetail />
              </PrivateRoute>
            } />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;