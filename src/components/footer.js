import React, { useState, useEffect } from "react"
import "./footer.css"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import { AiFillCodepenCircle } from "@react-icons/all-files/Ai/AiFillCodepenCircle"

export default function Footer() {
  const theme = useTheme()
  const [copied, setCopied] = useState("")
  // const [show, setShow] = useState(false)
  // const copyAlert = useEffect(() => {
  //   if (show === false) {
  //     setShow(true)
  //     return (
  //       <Typography
  //         sx={{
  //           position: "absolute",
  //           bottom: 10,
  //           left: 10,
  //           color: theme.palette.primary.main,
  //         }}
  //         variant="body1"
  //       >
  //         Click to Copy
  //       </Typography>
  //     )
  //   } else {
  //     setShow(false)
  //   }
  // }, [show])

  const copy = async () => {
    setCopied(document.getElementById("copyable_email").innerHtml)
    await navigator.clipboard.writeText(copied)
    alert("Copied!")
  }

  return (
    <Box
      sx={{
        boxShadow: 5,
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.text.primary,
        bgcolor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ maxWidth: 300, p: 5 }}>
        <Box sx={{ position: "relative" }}>
          <Typography
            id="copyable_email"
            // onMouseEnter={copyAlert}
            onClick={copy}
            variant="h6"
          >
            zwalter@zaxcode.dev
          </Typography>
          <Box sx={{ bgcolor: "#ffffff06" }}></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
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
    </Box>
  )
}
