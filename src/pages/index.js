import React, { useState, createContext, useMemo } from "react"
import { graphql } from "gatsby"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ProjectCard } from "../components/projectCard"
import { BlogPost } from "../components/blogpost"
import { Container } from "../components/container"

// PULL IN DATA
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
          published_at(formatString: "MMM DD YYYY h:ma")
          plaintext
          custom_excerpt
        }
      }
    }
  }
`
//SET CONTEXT
export const ColorModeContext = createContext()
console.log(ColorModeContext)

const IndexPage = ({ data }) => {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
  const [mode, setMode] = useState({ prefersDark })
  // create variable for project and blog post queries
  const projects = data.projects.edges
  const blogPosts = data.blog.edges

  /** SETUP STATE */
  const [tab, setTab] = useState("Projects")
  const [query, setQuery] = useState("")

  // MUI THEME
  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode ? "dark" : "light",
          primary: {
            main: "#ec4a50",
          },
          secondary: {
            main: "#20d0c1",
          },
        },
        components: {
          MuiAppBar: {
            defaultProps: {
              color: "transparent",
            },
          },
        },
      }),
    [mode]
  )

  // Render content dynamicly between tabs
  const content = () => {
    switch (tab) {
      case "About":
        return (
          <Box>
            <img src="#" alt="it's me" />
            <p>Stuff and things about me</p>
          </Box>
        )
      case "Projects":
        return (
          <Box>
            {projects.map(project => {
              return <ProjectCard key={project.uuid} {...project} />
            })}
          </Box>
        )
      case "Blog":
        return (
          // <div className="blogposts_wrapper">
          // <div className="search_container">
          <Box>
            <Box
              sx={{
                mt: "5%",
                mb: "2.5%",
              }}
            >
              <TextField
                id="filled-basic"
                label="Search"
                variant="filled"
                onChange={e => setQuery(e.target.value.toLowerCase())}
              />
              {/* </div> */}
            </Box>
            {blogPosts.map(post => {
              if (query) {
                if (post.node.title.toLowerCase().includes(query))
                  return <BlogPost key={post.uuid} {...post} />
              } else {
                return <BlogPost key={post.uuid} {...post} />
              }
            })}
            {/* </div> */}
          </Box>
        )
      case "Resume":
        return "Resume"
      default:
        return null
    }
  }

  return (
    <ColorModeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Seo title="Home" />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                minWidth: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <Button sx={{ p: "15px" }} onClick={() => setTab("About")}>
                about
              </Button>
              <Button sx={{ p: "15px" }} onClick={() => setTab("Projects")}>
                projects
              </Button>
              <Button sx={{ p: "15px" }} onClick={() => setTab("Blog")}>
                blog
              </Button>
              <Button sx={{ p: "15px" }} onClick={() => setTab("Resume")}>
                resume
              </Button>
            </Box>
          </Box>
          <Container>{content()}</Container>
        </Layout>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default IndexPage
