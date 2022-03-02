import React from "react"
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

  return (
    <Card sx={{ maxwidth: "30%" }}>
      {/* setup click event for action area to handle collapse */}
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
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
      <Collapse>{post.excerpt}</Collapse>
    </Card>
    // <div className="projectcard_wrapper">
    //   <div className="projectcard_overlay">
    //     <span>View Project</span>
    //   </div>
    //   <img src={post.feature_image} alt="project" />
    //   <div className="projectcard_text">
    //     <div className="projectcard_top_content">
    //       <h4 className="projectcard_title">{post.title}</h4>
    //       <h5 className="projectcard_read_time">
    //         {post.reading_time} <span>min</span>
    //       </h5>
    //     </div>
    //     <p> {post.excerpt}</p>
    //   </div>
    //   <div>
    //     <FaRegHeart />
    //     <span></span>
    //   </div>
    // </div>
  )
}
