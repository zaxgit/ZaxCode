import React, { useEffect, useState } from "react"
import { IconButton, useTheme } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"

// GET UUID FROM POST
// OR CREATE KEY FOR EACH LIKE BUTTON
//CREATE STATE OF AN OBJECT THAT PULLS VALUES FROM LOCAL STORAGE

// write on Click function that will set state of button
// load values of like buttons from local storage
// useEffect hook to store values
export function Like(props) {
  const id = props.hasId
  const theme = useTheme()
  const [liked, setLiked] = useState(false)
  console.log(liked)
  return (
    <IconButton
      id={id}
      onClick={() => {
        setLiked(true)
      }}
      onDoubleClick={() => {
        setLiked(false)
      }}
      sx={{
        color: liked ? theme.palette.primary.main : theme.palette.text.primary,
      }}
    >
      <FavoriteIcon />
    </IconButton>
  )
}
