import React, { useState } from "react"
import { graphql } from "gatsby"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ProjectCard } from "../components/projectCard"
import { BlogPost } from "../components/blogpost"
import { Container } from "../components/container"
// import { styled } from "@mui/material/styles"
import Switch from "@mui/material/Switch"
import TextField from "@mui/material/TextField"

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
// Material-UI theming
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ec4a50",
    },
    secondary: {
      main: "#20d0c1",
    },
    error: {
      main: "#de8527",
    },
  },
  shape: {
    borderRadius: 4,
  },
})
// add theme colors to elements layout, header, footer, etc.
// maybe implement mui buttons for tabs
// setup mode toggle logic and local persistence
const IndexPage = ({ data }) => {
  // create variable for project and blog post queries
  const projects = data.projects.edges
  const blogPosts = data.blog.edges

  /** SETUP STATE */
  const [tab, setTab] = useState("About")
  const [query, setQuery] = useState("")

  // Render content dynamicly between tabs
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
              <TextField
                id="filled-basic"
                label="Search"
                variant="filled"
                onChange={e => setQuery(e.target.value.toLowerCase())}
              />
            </div>
            {blogPosts.map(post => {
              if (query) {
                if (post.node.title.toLowerCase().includes(query))
                  return <BlogPost key={post.uuid} {...post} />
              } else {
                return <BlogPost key={post.uuid} {...post} />
              }
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
    <ThemeProvider theme={theme}>
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
            <Switch />
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
    </ThemeProvider>
  )
}

export default IndexPage
