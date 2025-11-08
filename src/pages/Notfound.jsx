// src/pages/NotFound.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";

export default function Notfound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        gap: 2,
      }}
    >
      <Typography variant="h2" sx={{ fontWeight: 700 }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Page Not Found
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{ bgcolor: "#1d0a3d", "&:hover": { bgcolor: "black" } }}
      >
        Go Home
      </Button>
    </Box>
  );
}