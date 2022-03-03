import React, { useState } from "react"
import PropTypes from "prop-types"
import { Box, AppBar, Toolbar, Typography, IconButton } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"

// import "./header.css"

const Header = ({ siteTitle }) => {
  const [menu, setMenu] = useState()
  const handleClickOpen = () => {}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2">{siteTitle}</Typography>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
// <header>
//   <div className="header_inner">
//     <h1>
//     </h1>
//   </div>
// </header>

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
