import React, { useState } from "react"
import { IconButton, useTheme } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"

export const Like = props => {
  const theme = useTheme()
  const [liked, setLiked] = useState(false)

  return (
    <IconButton
      sx={{
        color: liked ? theme.palette.primary.main : theme.palette.text.primary,
      }}
    >
      <FavoriteIcon />
    </IconButton>
  )
}
