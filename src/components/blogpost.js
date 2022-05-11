import React, { useState } from "react"
import {
  Box,
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
import { Like } from "./like.js"

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
        }}
      >
        <CardActionArea
          onClick={handleClickOpen("paper")}
          sx={{ minHeight: 305 }}
        >
          <CardContent>
            <h1>{post.title}</h1>
            <Box
              sx={{
                display: "flex",
                flexFlow: "row",
                justifyContent: "space-between",
              }}
            >
              <h3>{post.created_at}</h3> <span>{post.reading_time} min</span>
            </Box>
            <p>{post.custom_excerpt}</p>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Like hasId={props.likedId} />
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
        <DialogTitle>{post.title}</DialogTitle>
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
