import React from "react"
import "./footer.css"
import { Box, IconButton } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import { AiFillCodepenCircle } from "@react-icons/all-files/Ai/AiFillCodepenCircle"

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box>
        <span>zwalter@zaxcode.dev</span>
        <IconButton href="https://www.linkedin.com/in/zachary-walter-0405a31a0/">
          <LinkedInIcon />
        </IconButton>
        <IconButton href="https://github.com/zaxgit">
          <GitHubIcon />
        </IconButton>
        <IconButton href="https://codepen.io/ZaxCode">
          <AiFillCodepenCircle />
        </IconButton>
      </Box>
    </Box>
  )
}
