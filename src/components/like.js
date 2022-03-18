import React, { useState } from "react"
import { IconButton, useTheme } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"

export const Like = () => {
  const theme = useTheme()
  const [liked, setLiked] = useState(false)
  // const isLiked = localStorage.getItem("isLiked")

  // useEffect(() => {
  //   if (liked === true) {
  //     localStorage.setItem("isLiked", true)
  //   } else {
  //     localStorage.setItem("isLiked", false)
  //   }
  // }, [liked])

  return (
    <IconButton
      onClick={() => setLiked(true)}
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
