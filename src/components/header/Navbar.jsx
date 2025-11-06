import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,

} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

import { useSelector } from 'react-redux';

import { useNavigate, NavLink } from "react-router";


import authService from '@/Appwrite/auth/auth';
import { logout } from "../../Appwrite/auth/authSlice.js"
import { useDispatch } from 'react-redux';



function ResponsiveAppBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //  Check if user is logged in (from Redux state)
  const authStatus = useSelector((state) => state.auth.status)


  //  Page links shown in the navbar
  const pages = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: true },
    { name: "Add Posts", slug: "/add-posts", active: authStatus },
  ];


  //  Auth-related actions (login/signup/logout)
  const authitems = [
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "Logout", slug: "/", active: authStatus },
  ]


  //  State for controlling mobile dropdown menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  
   //  Logout handler — calls Appwrite service, clears Redux user, and redirects
  const handlelogout = async () => {
    try {
      await authService.logout()
      dispatch(logout())

    } catch (error) {
      console.log(error)

    }
    finally {
      navigate("/");
    }
  }

  return (
    <AppBar position="fixed"
      sx={{
        backgroundImage: 'linear-gradient(to right, #0a1f44 0%, #1d3989 70%)',
        bgcolor: 'transparent',
      }}
    >

      <Container maxWidth="xl">
        <Toolbar disableGutters>

           {/*  Logo shown on desktop */}
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
            TNEST
          </Typography>


          {/* Mobile menu */}
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

            {/* Dropdown Menu for mobile view */}
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
                  <NavLink
                    key={page.slug}
                    to={page.slug}
                    style={({ isActive }) => ({
                      color: isActive ? "#6d96bf" : "black", // 🔥 highlight active link
                      textDecoration: "none",

                    })}
                  >
                    <Button sx={{ color: "inherit" }}>{page.name}</Button>
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for small screens */}
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
            TNEST
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 5, ml: 5 }}>
            {pages.map((page) => (
              <NavLink
                key={page.slug}
                to={page.slug}
                style={({ isActive }) => ({
                  color: isActive ? "#6d96bf" : "white", //  highlight active link
                  textDecoration: "none",

                })}
              >
                <Button sx={{ color: "inherit" }}>{page.name}</Button>
              </NavLink>
            ))}
          </Box>

          {/* Auth actions */}
          <Box sx={{ flexGrow: 0 }}>
            {authitems.map((authitem) =>
              authitem.active &&
              (authitem.name === "Logout" ? (
                <Button
                  key={authitem.slug}
                  onClick={handlelogout}   //  use handler instead of NavLink
                  sx={{ color: "white" }}
                >
                  {authitem.name}
                </Button>
              ) : (
                <NavLink
                  key={authitem.slug}
                  to={authitem.slug}
                  style={({ isActive }) => ({
                    color: isActive ? "#93b1ce" : "white",
                    textDecoration: "none",
                  })}
                >
                  <Button sx={{ color: "inherit" }}>{authitem.name}</Button>
                </NavLink>
              ))
            )}



          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;


