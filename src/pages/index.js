import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import { BlogCard } from "../components/blogcard"
import { Container } from "../components/container"

export const query = graphql`
  {
    posts: allGhostPost {
      edges {
        node {
          excerpt
          feature_image
          featured
          slug
          title
          uuid
          reading_time
          id
        }
      }
    }
  }
`

// create content function
//switch case for each state to display data on tab click

function Content(props) {
  console.log("very exciting!")
  console.log(props.value)
  switch (props.value) {
    case "About":
      return "About"
    case "Projects":
      return "Projects"
    case "Blog":
      return "Blog"
    case "Resume":
      return "Resume"
    default:
      return null
  }
  return null
}

const IndexPage = ({ data }) => {
  const posts = data.posts.edges
  /** SETUP STATE */
  const [tab, setTab] = useState("About")
  const content = () => {
    switch (tab) {
      case "About":
        return (
          <div className="about_container">
            <img src="#" />
            <p>Stuff and things about me</p>
          </div>
        )
      case "Projects":
        return posts.map(post => {
          return (
            <div className="blogcard_container">
              <BlogCard key={post.uuid} {...post} />
            </div>
          )
        })
      case "Blog":
        return <div className="blog_container">My Blog powered by ghost</div>
      case "Resume":
        return "Resume"
      default:
        return null
    }
  }

  /** SETUP onClickTab Handler
   * Param: value
   */

  return (
    <Layout>
      <Seo title="Home" />
      <div className="tabs_wrapper">
        <div className="tabs">
          <button className="tab" onClick={() => setTab("About")}>
            About
          </button>
          <button className="tab" onClick={() => setTab("Projects")}>
            Projects
          </button>
          <button className="tab" onClick={() => setTab("Blog")}>
            Blog
          </button>
          <button className="tab" onClick={() => setTab("Resume")}>
            Resume
          </button>
        </div>
      </div>
      <Container>{content()}</Container>
      {/* <div>
        {posts.map(post => {
          return <BlogCard key={post.uuid} {...post} />
        })}
      </div> */}
    </Layout>
  )
}

export default IndexPage
