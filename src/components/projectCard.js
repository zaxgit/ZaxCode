import React, { useEffect, useState } from "react"
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material"
import { Like } from "./like.js"
// import FavoriteIcon from "@mui/icons-material/Favorite"

export function ProjectCard(props) {
  const post = props.node
  const [expanded, setExpanded] = useState(false)
  const [liked, setLiked] = useState(false)

  return (
    <Card
      sx={{
        minWidth: 300,
        maxWidth: 1000,
        mb: 10,
      }}
    >
      <CardActionArea
        onClick={() => setExpanded(!expanded)}
        aria-label="show more"
        aria-expanded={expanded}
      >
        <CardMedia
          component="img"
          height="250"
          image={post.feature_image}
          alt={post.title}
        ></CardMedia>
        <CardContent>
          <Typography variant="h5" sx={{ display: "inline-block" }}>
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ ml: 5, display: "inline-block" }}>
            {post.reading_time} min
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Like />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ p: 3 }}>
        {post.excerpt}
      </Collapse>
    </Card>
  )
}
