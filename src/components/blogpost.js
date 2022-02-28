import React from "react"
import "./blogpost.css"

export function BlogPost(props) {
  const post = props.node
  return (
    <div className="post_container">
      <h2>{post.title}</h2>
      <div className="post_content">
        <div className="post_data">
          <h4>{post.created_at}</h4>
          <h4>{post.published_at}</h4>
          <span>{post.reading_time} min</span>
        </div>
        <p> {post.excerpt}</p>
      </div>
    </div>
  )
}
