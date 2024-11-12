import { Box, Stack } from "@mui/material";

import React from "react";
import { Refresh } from "@mui/icons-material";

const LoadingFallback = React.memo(() => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100svh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Refresh
          className=" animate-spin duration-1000 ease-in text-[var(--color-bg-primary)] "
          sx={{
            width: { xs: "30px", sm: "40px" },
            height: { xs: "30px", sm: "40px" },
          }}
        />
      </Box>
    </Stack>
  );
});
LoadingFallback.displayName = "LoadingFallback";
export default LoadingFallback;
