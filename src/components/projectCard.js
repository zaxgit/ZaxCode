import React, { useState } from "react"
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Typography,
  useTheme,
} from "@mui/material"
import { Like } from "./like.js"

export function ProjectCard(props) {
  const post = props.node
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)
  return (
    <Card
      sx={{
        bgcolor: theme.palette.background.paper,
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
          sx={{ objectFit: "cover" }}
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
        <Like hasId={props.likedId} />
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ p: 3 }}>
        {post.excerpt}
      </Collapse>
    </Card>
  )
}
