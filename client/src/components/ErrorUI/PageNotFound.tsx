import { Box, Button, Stack, Typography } from "@mui/material";

import { Link } from "react-router-dom";
import React from "react";

const PageNotFound = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100svh",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "gray",
      }}
    >
      <Stack
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          padding: 4,
          borderRadius: 2,
          alignItems: "center",
          gap: 3,
          width: "400px",
          maxWidth: "400px",
        }}
      >
        <Typography variant="h2" sx={{ fontSize: "2rem" }}>
          Page Not Found
        </Typography>
        <Link to="/" className="w-full flex justify-center">
          <Button fullWidth sx={{ backgroundColor: "#fff", color: "#000" }}>
            Go Back To Home
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
};

export default PageNotFound;
