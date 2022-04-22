import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  useTheme,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import { Like } from "./like.js"

// import "./blogpost.css"
export function BlogPost(props) {
  const post = props.node
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState("paper")

  const handleClickOpen = scrollType => () => {
    setOpen(true)
    setScroll(scrollType)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const descriptionElementRef = React.useRef(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <>
      <Card
        sx={{
          bgcolor: theme.palette.background.paper,
          minWidth: "100%",
          maxWidth: 1000,
          mb: 10,
        }}
      >
        <CardActionArea onClick={handleClickOpen("paper")}>
          <CardContent>
            <h1>{post.title}</h1>
            <h3>
              {post.created_at} <span>{post.published_at}</span>
            </h3>
            <p>{post.custom_excerpt}</p>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Like hasId={props.likedId} />
          {post.reading_time} min
        </CardActions>
      </Card>
      {/* Full Post Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle>
          {post.title}
          {post.published_at}
          {post.reading_time}
        </DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {post.plaintext}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
