import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { useState } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import { ProjectCard } from "../components/projectCard"
import { BlogPost } from "../components/blogpost"
import { Container } from "../components/container"

export const query = graphql`
  {
    projects: allGhostPost(
      filter: { tags: { elemMatch: { name: { eq: "Projects" } } } }
    ) {
      edges {
        node {
          excerpt
          feature_image
          featured
          reading_time
          slug
          title
          uuid
        }
      }
    }
    blog: allGhostPost(
      filter: { tags: { elemMatch: { name: { eq: "Development Process" } } } }
    ) {
      edges {
        node {
          excerpt
          feature_image
          featured
          reading_time
          slug
          title
          uuid
          created_at(formatString: "MMM DD, YYYY")
          published_at(formatString: "h:ma")
        }
      }
    }
  }
`
// function toggleLightDark(props) {
// target css variables maybe use GSAP to change them
// grab button toggler in header
// }

const IndexPage = ({ data }) => {
  const projects = data.projects.edges
  const blogPosts = data.blog.edges
  /** SETUP STATE */
  const [tab, setTab] = useState("About")

  function handleChange() {
    let postsObject = blogPosts.map(post => {
      return (postsObject = { ...post })
    })
  }

  const content = () => {
    switch (tab) {
      case "About":
        return (
          <div className="about_container">
            <img src="#" alt="it's me" />
            <p>Stuff and things about me</p>
          </div>
        )
      case "Projects":
        return (
          <div className="projectcard_container">
            {projects.map(project => {
              return <ProjectCard key={project.uuid} {...project} />
            })}
          </div>
        )
      case "Blog":
        return (
          <div className="blogposts_wrapper">
            <div className="search_container">
              <input
                className="search"
                type="text"
                placeholder="Search"
                onChange={handleChange()}
              ></input>
            </div>
            {blogPosts.map(post => {
              return <BlogPost key={post.uuid} {...post} />
            })}
          </div>
        )
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
    </Layout>
  )
}

export default IndexPage