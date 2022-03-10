import React from "react"
import { Box } from "@mui/material"

export function Container({ children }) {
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        my: 0,
        mx: "auto",
      }}
    >
      {children}
    </Box>
  )
}
