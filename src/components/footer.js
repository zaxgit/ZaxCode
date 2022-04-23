import React, { useEffect, useState } from "react"
import "./footer.css"
import { Box, IconButton, Typography, useTheme } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import { AiFillCodepenCircle } from "@react-icons/all-files/Ai/AiFillCodepenCircle"

export default function Footer() {
  const theme = useTheme()
  const [show, setShow] = useState(false)

  // const copy = async () => {
  //   if (copied !== "zwalter@zaxcode.dev") {
  //     setCopied(document.getElementById("copyable_email").textContent)

  //     alert("Copied!")
  //   } else {
  //     await navigator.clipboard.writeText(copied)
  //   }
  // }
  // const email = document.getElementById("copyable_email").textContent
  const copy = async () => {
    await navigator.clipboard.writeText(
      document.getElementById("copyable_email").textContent
    )
    if (
      navigator.clipboard.readText() ===
      document.getElementById("copyable_email").textContent
    ) {
      alert("Copied!")
    }
  }
  const background = show ? theme.palette.secondary.main : "transparent"

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
      <Box sx={{ maxWidth: 300, p: 5 }}>
        <Box sx={{ position: "relative" }}>
          <Typography
            variant-="body2"
            className="hide"
            id="popup"
            sx={{
              position: "absolute",
              bottom: 40,
              left: 60,
              color: theme.palette.primary.main,
              whitespace: "nowrap",
            }}
          >
            Click to copy!
          </Typography>
          <Typography
            sx={{ bgcolor: background, borderRadius: 3, px: 1 }}
            id="copyable_email"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={copy}
            variant="h6"
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
