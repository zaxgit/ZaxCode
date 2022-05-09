import React, { useState, useMemo, useEffect } from "react"
import { graphql } from "gatsby"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { ProjectCard } from "../components/projectCard"
import { BlogPost } from "../components/blogpost"
import { Container } from "../components/container"

//IMPORT CONTEXT
import { ColorModeContext } from "../components/colorModeContext"

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
    ghostAuthor {
      profile_image
      id
    }
  }
`
// check if
const isBrowser = typeof window !== "undefined"
const IndexPage = ({ data }) => {
  // STATE FOR COLOR MODE
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
  const [mode, setMode] = useState(prefersDark)

  // PRE-DEFINE LOCAL STORAGE VARIABLES
  let colorMode = null
  let cssRoot = null

  // Get local storage value after gatsby builds
  if (isBrowser) {
    colorMode = localStorage.getItem("color mode")
    // GET ROOT ELEMENT
    cssRoot = document.querySelector(":root")
  }

  //SET STATE MODE TO LOCAL STORAGE VALUE
  useEffect(() => {
    if (colorMode === "true") {
      setMode(true)
    } else {
      setMode(false)
    }
  }, [])

  // UPDATE LOCAL STORAGE VALUE AND SET BODY COLOR
  useEffect(() => {
    if (mode === true) {
      localStorage.setItem("color mode", true)
      cssRoot.style.setProperty("--body-color", "#121212")
    } else if (mode === false) {
      localStorage.setItem("color mode", false)
      cssRoot.style.setProperty("--body-color", "#fff")
    } else {
      console.log("ERROR")
    }
  }, [mode])

  //CREATE TAGS FOR LANGUAGES OR SKILLS
  const resume = {
    technicals: [
      "HTML",
      "CSS",
      "Javascript",
      "React",
      "Gatsby",
      "Wordpress",
      "PHP",
      "Git",
      "Node",
    ],
    softs: [
      "Attention to detail",
      "Problem Solving",
      "Quick to grasp new concepts",
      "Effective communicator",
      "Conflict Resolution",
    ],
    experience: [
      {
        name: "ZaxCode",
        time: "2019 - present",
        employment: "Self employed Front End Developer",
        duties: ["Web development", "Debugging"],
      },
      {
        name: "STL Vapor",
        time: "8/5/19 - present",
        employment: "Sales Representitve",
        duties: [
          "Inventory management",
          "Customer Service",
          "Troubleshooting customer device issues",
        ],
      },
      {
        name: "Point Roofing and Restoration",
        time: "2/4/18 - 8/5/19",
        employment: "Project Manager",
        duties: [
          "Residential and commercial property inspections",
          "Documentation of discovered damage",
          "Project management",
          "Lead procurement and sales",
        ],
      },
    ],
  }
  // create variable for project and blog post queries
  const projects = data.projects.edges
  const blogPosts = data.blog.edges
  const profile = data.ghostAuthor.profile_image

  // STATE FOR WHICH DATA IS SHOWN FOR EACH TAB
  const [tab, setTab] = useState("About")

  // STATE FOR POST FILTERING
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
          <Box
            sx={{
              color: palette.text.primary,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              className="about"
              sx={{
                width: "100%",
                p: 2,
                mt: 5,
              }}
            >
              <Box>
                <img src={profile} alt="me,myself and I" height="350" />
              </Box>
              <Typography sx={{ maxWidth: 500 }}>
                Hello! I'm Zach and I've been teaching myself front end
                development for a couple years. I started learning from sites
                such as codecademy and udemy. Most of what i learn at this point
                is through documentaion searches for projects I'm building.
              </Typography>
            </Box>
          </Box>
        )
      case "Projects":
        return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                mt: 5,
              }}
            >
              {projects.map(project => {
                return (
                  <ProjectCard
                    likedId={project.node.uuid}
                    key={project.node.slug}
                    {...project}
                  />
                )
              })}
            </Box>
          </Box>
        )
      case "Blog":
        return (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                mt: 5,
              }}
            >
              <Box sx={{ width: "100%", mb: 5 }}>
                <TextField
                  id="filled-basic"
                  label="Search"
                  variant="filled"
                  onChange={e => setQuery(e.target.value.toLowerCase())}
                />
              </Box>

              {blogPosts.map(post => {
                if (query) {
                  if (post.node.title.toLowerCase().includes(query))
                    return (
                      <BlogPost
                        likedId={post.node.uuid}
                        key={post.node.slug}
                        {...post}
                      />
                    )
                } else {
                  return (
                    <BlogPost
                      likedId={post.node.uuid}
                      key={post.node.slug}
                      {...post}
                    />
                  )
                }
              })}
            </Box>
          </Box>
        )
      case "Resume":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: 2,
                mt: 5,
                color: palette.text.primary,
              }}
            >
              <Box sx={{ width: "100%", mb: 10 }}>
                <Typography
                  sx={{ color: palette.primary.main, mb: 3 }}
                  variant="h4"
                >
                  Technical Knowledge
                </Typography>
                <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
                  {resume.technicals.map(technical => {
                    return (
                      <Typography sx={{ pl: 3, pt: 1 }}>{technical}</Typography>
                    )
                  })}
                </Box>
              </Box>
              <Box sx={{ width: "100%", mb: 10 }}>
                <Typography
                  sx={{ color: palette.primary.main, mt: 5, mb: 3 }}
                  variant="h4"
                >
                  Soft Skills
                </Typography>
                <Box sx={{ display: "flex", flexFlow: "row wrap" }}>
                  {resume.softs.map(soft => {
                    return <Typography sx={{ pl: 3, pt: 1 }}>{soft}</Typography>
                  })}
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography
                  sx={{ color: palette.primary.main, mt: 5, mb: 3 }}
                  variant="h4"
                >
                  Experience
                </Typography>
                <Box sx={{ pl: 3 }}>
                  {resume.experience.map((exp, i) => {
                    while (i < resume.experience.length) {
                      return (
                        <Box sx={{ pt: 2, pb: 3 }}>
                          <Typography
                            sx={{ color: palette.secondary.main }}
                            variant="h5"
                          >
                            {exp.name}
                          </Typography>
                          <Box sx={{ p: 1 }}>
                            <Typography>{exp.employment}</Typography>
                            <Typography variant="body1">{exp.time}</Typography>
                          </Box>
                          <Box sx={{ p: 3 }}>
                            <Typography>Duties:</Typography>
                            {exp?.duties?.map(d => {
                              return (
                                <Typography sx={{ pl: 3, pt: 1 }}>
                                  {d}
                                </Typography>
                              )
                            })}
                          </Box>
                        </Box>
                      )
                    }
                  })}
                </Box>
              </Box>
            </Box>
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
              boxShadow: 3,
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
              <Button
                sx={{
                  p: 3.5,
                  borderRadius: 0,
                  borderBottom: tab === "About" ? 3 : 0,
                  borderColor: theme.palette.primary.main,
                  fontSize: tab === "About" ? 18 : 15,
                }}
                onClick={() => setTab("About")}
              >
                about
              </Button>
              <Button
                sx={{
                  p: 3.5,
                  borderRadius: 0,
                  borderBottom: tab === "Projects" ? 3 : 0,
                  borderColor: theme.palette.primary.main,
                  fontSize: tab === "Projects" ? 18 : 15,
                }}
                onClick={() => setTab("Projects")}
              >
                projects
              </Button>
              <Button
                sx={{
                  p: 3.5,
                  borderRadius: 0,
                  borderBottom: tab === "Blog" ? 3 : 0,
                  borderColor: theme.palette.primary.main,
                  fontSize: tab === "Blog" ? 18 : 15,
                }}
                onClick={() => setTab("Blog")}
              >
                blog
              </Button>
              <Button
                sx={{
                  p: 3.5,
                  borderRadius: 0,
                  borderBottom: tab === "Resume" ? 3 : 0,
                  borderColor: theme.palette.primary.main,
                  fontSize: tab === "Resume" ? 18 : 15,
                }}
                onClick={() => setTab("Resume")}
              >
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
