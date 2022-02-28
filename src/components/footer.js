import React from "react"
import "./footer.css"
import { GrCodepen } from "@react-icons/all-files/gr/GrCodepen"
import { GrGithub } from "@react-icons/all-files/gr/GrGithub"
import { GrLinkedin } from "@react-icons/all-files/gr/GrLinkedin"

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer_inner">
        <span>zwalter@zaxcode.dev</span>
        <ul className="socials">
          <li className="social">
            <a href="https://www.linkedin.com/in/zachary-walter-0405a31a0/">
              <GrLinkedin />
            </a>
          </li>
          <li className="social">
            <a href="https://github.com/zaxgit">
              <GrGithub />
            </a>
          </li>
          <li className="social">
            <a href="https://codepen.io/ZaxCode">
              <GrCodepen />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
