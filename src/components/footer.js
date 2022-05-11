import React, { useEffect, useState } from "react"
import "./footer.css"
import { Box, IconButton, Typography, useTheme, Snackbar } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import CodeIcon from "@mui/icons-material/Code"

export default function Footer() {
  const theme = useTheme()
  // STATE FOR EMAIL HOVER
  const [show, setShow] = useState(false)
  // STATE FOR TOAST
  const [openSnack, setOpenSnack] = useState(false)

  // CLICK HANDLER FOR EMAIL COPY
  const copy = async () => {
    await navigator.clipboard.writeText(
      document.getElementById("copyable_email").textContent
    )

    if (
      (await navigator.clipboard.readText()) ===
      document.getElementById("copyable_email").textContent
    ) {
      setOpenSnack(true)
    }
  }

  // SET INITIAL BACKGROUND COLOR TO TRANSPARENT
  const background = show ? theme.palette.secondary.main : "transparent"

  // SHOW/HIDE TEXT BASED OFF HOVER STATE
  useEffect(() => {
    const popUp = document.getElementById("popup")

    if (show === true && popUp.classList.contains("hide")) {
      popUp.classList.remove("hide")
    } else {
      popUp.classList.add("hide")
    }
  }, [show])

  return (
    <Box
      className="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        color: theme.palette.text.primary,
      }}
    >
      <Snackbar
        sx={{ color: theme.palette.primary.main }}
        autoHideDuration={1800}
        onClose={() => {
          setOpenSnack(false)
        }}
        message="Copied!"
        open={openSnack}
      />
      <Box sx={{ maxWidth: 500, p: 5 }}>
        <Box sx={{ position: "relative" }}>
          <Typography
            variant-="body2"
            className="hide"
            id="popup"
            sx={{
              position: "absolute",
              bottom: 40,
              left: 80,
              color: theme.palette.primary.main,
              whitespace: "nowrap",
            }}
          >
            Click to copy!
          </Typography>
          <Typography
            sx={{
              bgcolor: background,
              borderRadius: 3,
              px: 1,
              whiteSpace: "nowrap",
            }}
            id="copyable_email"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={copy}
            variant="h5"
          >
            zwalter@zaxcode.dev
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton href="https://www.linkedin.com/in/zachary-walter-0405a31a0/">
              <LinkedInIcon />
            </IconButton>
            <Typography variant="body2">LinkedIn</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton href="https://github.com/zaxgit">
              <GitHubIcon />
            </IconButton>
            <Typography variant="body2">GitHub</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <IconButton href="https://codepen.io/ZaxCode">
              <CodeIcon />
            </IconButton>
            <Typography variant="body2"> CodePen</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
