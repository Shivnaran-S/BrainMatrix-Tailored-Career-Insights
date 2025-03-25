import React from 'react';
import { 
  AppBar, Toolbar, Typography, Button, Box, 
  IconButton, Menu, MenuItem, Avatar 
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            CareerPath
          </Link>
        </Typography>
        
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
          
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.username.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Box>
        
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { navigate('/'); handleMenuClose(); }}>Home</MenuItem>
            <MenuItem onClick={() => { navigate('/about'); handleMenuClose(); }}>About</MenuItem>
            <MenuItem onClick={() => { navigate('/contact'); handleMenuClose(); }}>Contact</MenuItem>
            {user ? (
              [
                <MenuItem key="dashboard" onClick={() => { navigate('/dashboard'); handleMenuClose(); }}>
                  Dashboard
                </MenuItem>,
                <MenuItem key="logout" onClick={handleLogout}>Logout</MenuItem>
              ]
            ) : (
              <MenuItem onClick={() => { navigate('/login'); handleMenuClose(); }}>Login</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;