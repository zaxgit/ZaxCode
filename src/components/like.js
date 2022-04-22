import React, { useEffect, useMemo, useState } from "react"
import { IconButton, useTheme } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"

export function Like(props) {
  // GET UUID FROM POST
  const id = props.hasId
  const theme = useTheme()
  const [liked, setLiked] = useState(setStored)

  // Store likedState pairs to local storage
  useEffect(() => {
    if (localStorage.getItem(id) === "true") {
      setLiked(true)
    } else if (localStorage.getItem(id) === "false") {
      setLiked(false)
    }
  }, [setStored])

  const setStored = useMemo(() => {
    if (liked === true) {
      localStorage.setItem(id, true)
    } else if (liked === false) {
      localStorage.setItem(id, false)
    }
  }, [liked])

  // const setLikedOffStored = useMemo(() => {
  //   if (isLiked === "true") {
  //     setLiked(true)
  //   } else {
  //     setLiked(false)
  //   }
  // }, [setStoredLike])

  // Retreive stored liked value
  const isLiked = useMemo(() => {
    if (localStorage.getItem(id) === "true") {
      return true
    } else if (localStorage.getItem(id) === "false") {
      return false
    }
  })
  return (
    <IconButton
      id={id}
      onClick={() => {
        setLiked(!liked)
      }}
      sx={{
        color: isLiked
          ? theme.palette.primary.main
          : theme.palette.text.primary,
      }}
    >
      <FavoriteIcon />
    </IconButton>
  )
}
