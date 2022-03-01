import React from "react"
import "./footer.css"
import { IconButton } from "@mui/material"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import { AiFillCodepenCircle } from "@react-icons/all-files/Ai/AiFillCodepenCircle"

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer_inner">
        <span>zwalter@zaxcode.dev</span>
        <ul className="socials">
          <li className="social">
            <a href="https://www.linkedin.com/in/zachary-walter-0405a31a0/">
              <IconButton>
                <LinkedInIcon />
              </IconButton>
            </a>
          </li>
          <li className="social">
            <a href="https://github.com/zaxgit">
              <IconButton>
                <GitHubIcon />
              </IconButton>
            </a>
          </li>
          <li className="social">
            <a href="https://codepen.io/ZaxCode">
              <IconButton>
                <AiFillCodepenCircle />
              </IconButton>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
