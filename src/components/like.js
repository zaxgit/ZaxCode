import React, { useEffect, useState, useReducer } from "react"
import { IconButton, useTheme } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { useStaticQuery, graphql } from "gatsby"
import { query } from "../pages/index"

export function Like(key) {
  const [liked, setLiked] = useState(false)
  const theme = useTheme()

  return (
    <IconButton
      onClick={() => setLiked(true)}
      onDoubleClick={() => setLiked(false)}
      sx={{
        color: liked ? theme.palette.primary.main : theme.palette.text.primary,
      }}
    >
      <FavoriteIcon />
    </IconButton>
  )
}
