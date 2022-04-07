import React, {
  useState,
  createContext,
  useMemo,
  useEffect,
  useReducer,
  Profiler,
} from "react"
import { graphql } from "gatsby"
import { Img } from "gatsby-image"
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
    allGhostAuthor {
      edges {
        node {
          profile_image
        }
      }
    }
    ghostAuthor {
      profile_image
    }
  }
`
//SET CONTEXT
export const ColorModeContext = createContext()

const IndexPage = ({ data }) => {
  // STATE FOR COLOR MODE
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)")
  const [mode, setMode] = useState(prefersDark)
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

  // MAP LIKE COMPONENTS?
  //CREATE TAGS FOR LANGUAGES OR SKILLS
  const resume = {
    technicals: [
      "CSS",
      "Javascript",
      "React",
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
      // {
      //   title: "point",
      //   value: [
      //     {
      //       "title": "name",
      //       "value": "Point Roofing and Restoration"
      //     }
      //   ]
      // }
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
  console.log(profile)
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

  // LIKE BUTTON STATE
  // LIKE BUTTON FUNCTIONALITY
  // const likeButton = () => {
  //   if()
  // }
  // Render content dynamicly between tabs
  const content = () => {
    const palette = theme.palette
    switch (tab) {
      case "About":
        return (
          <Box
            sx={{
              color: palette.text.primary,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ borderRadius: 20, overFlow: "hidden" }}>
              <img src={profile} alt="me,myself and I" height="100" />
            </Box>
            <Typography sx={{ maxWidth: 500 }}>
              Hello! I'm Zach and I've been teaching myself front end
              development for a couple years. It started off as a hobby, and I
              started taking more seriously during the pandemic. Coding is
              challenging. Quite often you have a completely new problem to
              solve, the more you solve, the more little pieces you pick up
              along the way. it's like a puzzle except you get to decide what
              pieces you want to build with. This Portfoilio is my first
              React/Gatsby project. It's been fun, challenging, and occasionally
              a pain in the ass, but I think that's what i love aobut it.
            </Typography>
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
            </Box>
            {blogPosts.map(post => {
              if (query) {
                if (post.node.title.toLowerCase().includes(query))
                  return <BlogPost key={post.node.slug} {...post} />
              } else {
                return <BlogPost key={post.node.slug} {...post} />
              }
            })}
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
            <Box sx={{ color: palette.text.primary }}>
              <Box>
                <Typography
                  sx={{ color: palette.primary.main, mt: 5 }}
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
              <Box sx={{}}>
                <Typography
                  sx={{ color: palette.primary.main, mt: 5 }}
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
              <Box sx={{}}>
                <Typography
                  sx={{ color: palette.primary.main, mt: 5 }}
                  variant="h4"
                >
                  Experience
                </Typography>
                <Box sx={{ p: 5 }}>
                  {resume.experience.map((exp, i) => {
                    while (i < resume.experience.length) {
                      return (
                        <Box sx={{ p: 3 }}>
                          <Typography
                            sx={{ color: palette.secondary.main }}
                            variant="h5"
                          >
                            {exp.name}
                          </Typography>
                          <Box sx={{ p: 5 }}>
                            <Typography>{exp.employment}</Typography>
                            <Typography variant="body1">{exp.time}</Typography>
                          </Box>
                          <Box sx={{ p: 5 }}>
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
