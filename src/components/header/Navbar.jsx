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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,

} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useNavigate, NavLink } from "react-router";


import authService from '@/Appwrite/auth/auth';

import { logout } from "../../Appwrite/auth/authSlice.js"
import { useDispatch } from 'react-redux';



function ResponsiveAppBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userName, setuserName] = useState("")

   //  Check if user is logged in (from Redux state)
  const authStatus = useSelector((state) => state.auth.status)

  //fetching user Name
  useEffect(() => {
    if (!authStatus) {
      setuserName("");
      return;
    }
    authService.getAccount().then((res) => {
      if (res) {
        setuserName(res.name)

      }
      else {
        setuserName("")
      }
    })

  }, [authStatus])


  //  Page links shown in the navbar
  const pages = [
    { name: "Home", slug: "/", active: true },
    { name: "All Posts", slug: "/all-posts", active: true },
    { name: "Add Posts", slug: "/add-posts", active: authStatus },
  ];


  //  Auth-related actions (login/signup/logout)
  const authitems = [
    { name: "LOGIN", slug: "/login", active: !authStatus },
    { name: "SIGNUP", slug: "/signup", active: !authStatus },
    { name: userName, active: authStatus },
    { name: "LOGOUT", slug: "/", active: authStatus },
  ]


  //  State for controlling mobile dropdown menu
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);


  // Snackbar for “need to log in”
  const [openSnack, setOpenSnack] = React.useState(false);
  const handleCloseSnack = () => setOpenSnack(false);


  // Block navigation to /add-posts when logged out, show snackbar in-place
  const handleProtectedNav = (e, slug) => {
    if (slug === "/add-posts" && !authStatus) {
      e.preventDefault();       // stop navigation
      setOpenSnack(true);       // show hint on the CURRENT page (navbar is global)
      setAnchorElNav(null);     // close mobile menu
    } else {
      setAnchorElNav(null);
    }
  };


  //  Logout confirmation dialog state
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const handleOpenLogoutDialog = () => setOpenLogoutDialog(true);
  const handleCloseLogoutDialog = () => setOpenLogoutDialog(false);



  //  Logout handler — calls Appwrite service, clears Redux user, and redirects
  const handlelogout = async () => {
    setOpenLogoutDialog(false);
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
    <>
      <AppBar position="fixed"
        sx={{
          backgroundImage: 'linear-gradient(160deg, #0a0a0f 0%, #0c1445 40%, #111d5e 100%)',
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
                      onClick={(e) => handleProtectedNav(e, page.slug)}
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
                  onClick={(e) => handleProtectedNav(e, page.slug)}
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
                (authitem.name === "LOGOUT" ? (
                  <Button
                    key={authitem.slug}
                    onClick={handleOpenLogoutDialog}   //  use handler instead of NavLink
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
                    <Button sx={{ color: "inherit", textTransform: "none", fontWeight: 600, }}>{authitem.name}</Button>
                  </NavLink>
                ))
              )}



            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ===== Logout Confirmation Dialog ===== */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          {"Are you sure you want to log out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            You will be signed out of your account. Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} color="inherit">
            Cancel
          </Button>
          <Button onClick={handlelogout} color="error" variant="contained" autoFocus>
            Log out
          </Button>
        </DialogActions>
      </Dialog>


      {/* Snackbar: shows on the CURRENT page (e.g., All Posts) when Add Posts is blocked */}
      <Snackbar
        open={openSnack}
        autoHideDuration={2500}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnack} severity="info" variant="filled" sx={{ width: "100%" }}>
          Please log in to add a post.
        </Alert>
      </Snackbar>
    </>


  );
}
export default ResponsiveAppBar;


