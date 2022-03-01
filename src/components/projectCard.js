import React from "react"
import reactDom from "react-dom"
import "./projectCard.css"
import { FaRegHeart } from "@react-icons/all-files/Fa/FaRegHeart"
// import * as Tally from "../../tally.json"
// import { gsap } from "gsap";
// import { CSSRulePlugin } from "gsap/CSSRulePlugin";

// gsap.registerPlugin(CSSRulePlugin);

export function ProjectCard(props) {
  const post = props.node

  return (
    <div className="projectcard_wrapper">
      <div className="projectcard_overlay">
        <span>View Project</span>
      </div>
      <img src={post.feature_image} alt="project" />
      <div className="projectcard_text">
        <div className="projectcard_top_content">
          <h4 className="projectcard_title">{post.title}</h4>
          <h5 className="projectcard_read_time">
            {post.reading_time} <span>min</span>
          </h5>
        </div>
        <p> {post.excerpt}</p>
      </div>
      <div>
        <FaRegHeart />
        <span></span>
      </div>
    </div>
  )
}
