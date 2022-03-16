import React, { useState, createContext, useMemo, useEffect } from "react"
import { graphql } from "gatsby"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { Box, Button, TextField, Typography } from "@mui/material"
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

const IndexPage = ({ data }) => {
  // STATE FOR COLOR MODE
  const [mode, setMode] = useState(true)
  const colorMode = localStorage.getItem("color mode")

  //SET STATE MODE TO LOCAL STORAGE VALUE
  useEffect(() => {
    if (colorMode === "true") {
      setMode(true)
    } else {
      setMode(false)
    }
  }, [])

  // UPDATE LOCAL STORAGE VALUE
  useEffect(() => {
    if (mode === true) {
      localStorage.setItem("color mode", true)
    } else {
      localStorage.setItem("color mode", false)
    }
  }, [mode])

  //CREATE TAGS FOR LANGUAGES OR SKILLS

  const resume = {
    technical: {
      skill1: "html",
      skill2: "CSS",
      skill3: "Javascript",
      skill4: "React",
      skill5: "Wordpress",
      skill6: "PHP",
      skill7: "Git",
      skill8: "Node",
    },
    soft: {
      skill1: "Attention to detail",
      skill2: "Problem Solving",
      skill3: "Quick to grasp new concepts",
      skill4: "Effective communicator",
    },
    experience: {
      zaxcode: {
        name: "ZaxCode",
        time: "2019 - present",
        employment: "Self employed Front End Developer",
        duties: {},
      },
      stlvapor: {
        name: "STLVapor",
        time: "8/5/19 - present",
        employment: "Sales Representitve",
        duties: {
          d1: "Inventory management",
          d2: "Customer Service",
          d3: "Troubleshooting customer device issues",
        },
      },
      point: {
        name: "Point Roofing and Restoration",
        time: "2/4/18 - 8/5/19",
        employment: "Project Manager",
        duties: {
          d1: "Residential and commercial property inspections",
          d2: "Documentation of discovered damage",
          d3: "Project management",
          d4: "Lead procurement and sales",
        },
      },
    },
  }
  // create variable for project and blog post queries
  const projects = data.projects.edges
  const blogPosts = data.blog.edges

  //
  const [tab, setTab] = useState("Projects")
  const [query, setQuery] = useState("")
  const [liked, setLiked] = useState(false)

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
        spacing: 5,
      }),
    [mode]
  )

  // Render content dynamicly between tabs
  const content = () => {
    const palette = theme.palette
    switch (tab) {
      case "About":
        return (
          <Box sx={{ color: palette.text.primary }}>
            <img src="#" alt="it's me" />
            <Typography>Stuff and things about me</Typography>
          </Box>
        )
      case "Projects":
        return (
          <Box>
            <Box
              sx={{
                left: "8%",
                transform: "translateX(8%)",
              }}
            >
              {projects.map(project => {
                return <ProjectCard key={project.uuid} {...project} />
              })}
            </Box>
          </Box>
        )
      case "Blog":
        return (
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
          </Box>
        )
      case "Resume":
        return (
          <Box sx={{ color: palette.text.primary }}>
            <Box>
              <Typography>Technical Knowledge</Typography>
              <Box></Box>
            </Box>
            <Box></Box>
            <Box></Box>
          </Box>
        )
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
