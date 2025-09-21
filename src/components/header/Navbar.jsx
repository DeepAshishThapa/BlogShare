import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useSelector } from 'react-redux';

import { useNavigate } from "react-router";
import { NavLink } from 'react-router';



const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];




function ResponsiveAppBar() {
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.auth.status)
  const pages = [{
    name: 'Home',
    slug: '/',
    active: true
  },

  {
    name: "All Posts",
    slug: "/all-posts",
    active: true
  },
  {
    name: "Add Posts",
    slug: "/add-posts",
    active: authStatus
  },

  ];
  const authitems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus

    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus

    },
    {
      name: "Logout",
      slug: "/",
      active: authStatus
    }


  ]





  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed"
      
      sx={{
        backgroundImage: 'linear-gradient(to right, #0a1f44 0%, #2547a7 50%)',
        bgcolor: 'transparent',
      }}
    >

      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.slug} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 5, ml: 5 }}>
            {pages.map((page) => (
              <NavLink
                key={page.slug}
                to={page.slug}
                style={({ isActive }) => ({
                  color: isActive ? "#6d96bf" : "white", // 🔥 highlight active link
                  textDecoration: "none",
                  
                })}
              >
                <Button sx={{ color: "inherit" }}>{page.name}</Button>
              </NavLink>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {authitems.map((authitem) => (
              authitem.active &&
               <NavLink
                key={authitem.slug}
                to={authitem.slug}
                style={({ isActive }) => ({
                  color: isActive ? "#93b1ce" : "white", // 🔥 highlight active link
                  textDecoration: "none",
                  
                })}
              >
                <Button sx={{ color: "inherit" }}>{authitem.name}</Button>
              </NavLink>

             
            ))}



          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;


