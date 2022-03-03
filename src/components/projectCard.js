import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
// import "./projectCard.css"
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"

export function ProjectCard(props) {
  const post = props.node
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card
      sx={{
        maxWidth: 300,
      }}
    >
      {/* setup click event for action area to handle collapse */}
      <CardActionArea
        onClick={handleExpandClick}
        aria-label="show more"
        aria-expanded={expanded}
      >
        <CardMedia
          component="img"
          height="100"
          image={post.feature_image}
          alt={post.title}
        ></CardMedia>
        <CardContent>
          {post.title}
          {post.reading_time} min
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton>
          <FavoriteIcon aria-label="like" />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {post.excerpt}
      </Collapse>
    </Card>
  )
}
