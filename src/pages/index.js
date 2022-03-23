import React, { useState, createContext, useMemo, useEffect } from "react"
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

  //CREATE TAGS FOR LANGUAGES OR SKILLS

  const resume = {
    technicals: {
      skill0: "html",
      skill1: "CSS",
      skill2: "Javascript",
      skill3: "React",
      skill4: "Wordpress",
      skill5: "PHP",
      skill6: "Git",
      skill7: "Node",
    },
    soft: {
      skill1: "Attention to detail",
      skill2: "Problem Solving",
      skill3: "Quick to grasp new concepts",
      skill4: "Effective communicator",
    },
    experience: {
      dutyName: "Duties:",
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
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src="#" alt="it's me" />
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
                return <ProjectCard key={project.node.slug} {...project} />
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
          <Box sx={{ color: palette.text.primary }}>
            <Box sx={{ ml: 25 }}>
              <Typography
                sx={{ color: palette.primary.main, mt: 5 }}
                variant="h4"
              >
                Technical Knowledge
              </Typography>
              <Box sx={{ p: 5 }}>
                <Typography variant="body1">
                  {resume.technicals.skill0}
                </Typography>
                <Typography variant="body1">
                  {resume.technicals.skill1}
                </Typography>
                <Typography variant="body1">
                  {resume.technicals.skill2}
                </Typography>
                <Typography variant="body1">
                  {resume.technicals.skill3}
                </Typography>
                <Typography variant="body1">
                  {resume.technicals.skill4}
                </Typography>
                <Typography variant="body1">
                  {resume.technicals.skill5}
                </Typography>
                <Typography variant="body1">
                  {resume.technicals.skill6}
                </Typography>
                <Typography variant="body1">
                  {resume.technicals.skill7}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ ml: 75 }}>
              <Typography
                sx={{ color: palette.primary.main, mt: 5 }}
                variant="h4"
              >
                Soft Skills
              </Typography>
              <Box sx={{ p: 5 }}>
                <Typography variant="body1">{resume.soft.skill1}</Typography>
                <Typography variant="body1">{resume.soft.skill2}</Typography>
                <Typography variant="body1">{resume.soft.skill3}</Typography>
                <Typography variant="body1">{resume.soft.skill4}</Typography>
              </Box>
            </Box>
            <Box sx={{ ml: 125 }}>
              <Typography
                sx={{ color: palette.primary.main, mt: 5 }}
                variant="h4"
              >
                Experience
              </Typography>
              <Box sx={{ p: 5 }}>
                <Box>
                  <Typography
                    sx={{ color: palette.secondary.main }}
                    variant="h5"
                  >
                    {resume.experience.zaxcode.name}
                  </Typography>
                  <Box>
                    <Typography variant="body1">
                      {resume.experience.zaxcode.time}
                    </Typography>
                    <Typography>
                      {resume.experience.zaxcode.employment}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{ color: palette.secondary.main }}
                    variant="h5"
                  >
                    {resume.experience.stlvapor.name}
                  </Typography>
                  <Box>
                    <Typography variant="body1">
                      {resume.experience.stlvapor.time}
                    </Typography>
                    <Typography>
                      {resume.experience.stlvapor.employment}
                    </Typography>
                    <Box>
                      <Typography
                        sx={{ color: palette.primary.main }}
                        variant="h6"
                      >
                        {resume.experience.dutyName}
                      </Typography>
                      <Typography variant="body2">
                        {resume.experience.stlvapor.duties.d1}
                      </Typography>
                      <Typography variant="body2">
                        {resume.experience.stlvapor.duties.d2}
                      </Typography>
                      <Typography variant="body2">
                        {resume.experience.stlvapor.duties.d3}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box>
                  <Typography
                    sx={{ color: palette.secondary.main }}
                    variant="h5"
                  >
                    {resume.experience.point.name}
                  </Typography>
                  <Box>
                    <Typography variant="body1">
                      {resume.experience.point.time}
                    </Typography>
                    <Typography>
                      {resume.experience.point.employment}
                    </Typography>
                    <Box>
                      <Typography
                        sx={{ color: palette.primary.main }}
                        variant="h6"
                      >
                        {resume.experience.dutyName}
                      </Typography>
                      <Typography variant="body2">
                        {resume.experience.point.duties.d1}
                      </Typography>
                      <Typography variant="body2">
                        {resume.experience.point.duties.d2}
                      </Typography>
                      <Typography variant="body2">
                        {resume.experience.point.duties.d3}
                      </Typography>
                      <Typography variant="body2">
                        {resume.experience.point.duties.d4}
                      </Typography>
                    </Box>
                  </Box>
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
