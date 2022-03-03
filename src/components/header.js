import React from "react"
import PropTypes from "prop-types"
import { Box, AppBar, Toolbar, Typography, Switch } from "@mui/material"

// import "./header.css"

const Header = ({ siteTitle }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2">{siteTitle}</Typography>
          <Switch />
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
