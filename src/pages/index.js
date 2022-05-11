import React, { useState, useMemo, useEffect } from "react"
import { graphql } from "gatsby"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  Grid,
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
    skills: [
      {
        name: "Languages",
        content: ["HTML5", "CSS3", "JavaScript", "PHP", "Node"],
      },
      { name: "Frameworks", content: ["React", "Gatsby"] },
      { name: "Libraries", content: ["GSAP3", "MUI", "Splide.js"] },
      {
        name: "CMS/Tools",
        content: ["WordPress", "Adobe XD", "Figma", "Git", "Gatsby Cloud"],
      },
    ],

    experience: [
      {
        name: "ZaxCode",
        time: "2019 - present",
        employment: "Self employed Front End Developer",
        duties: [
          "Worked with clients to develop websites in WordPress, React, and Gatsby",
        ],
      },
      {
        name: "STL Vapor",
        time: "8/5/19 - present",
        employment: "Sales Representitve",
        duties: [
          "Keyholder and Inventory management",
          "Collaborate on new products to carry informed by shopper input",
          "Facilitate great customer experiences for 50+ customers daily",
          "Spearheaded product listing sheet for submission to the FDA",
        ],
      },
      {
        name: "Point Roofing and Restoration",
        time: "2/4/18 - 8/5/19",
        employment: "Project Manager",
        duties: [
          "Brought in over a million dollars in sales through cold calling, previous customer referrals and leads",
          "Determine cause and scale of property damage",
          "Facilitate communication between customer and claims adjuster",
          "Schedule projects and maintain connection with homeowners through the build duration",
        ],
      },
    ],
    education: {
      name: "Education",
      school: "Vatterott, Extreme Institute",
      degreeIn: "Audio Engineering and Production with Business",
      degree: "Associates",
      graduation: "2016",
    },
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
                Hello! I'm Zach, a Front End Web Developer. I've been teaching
                myself to code for a couple years. I started this journey on
                sites such as CodeCademy and Udemy. Most of what i learn now is
                through reading documentaion and problem solving for projects
                I'm building. Seeking to join a company where I can continue to
                cultivate new skills and to help bring their online visions to
                fruition.
              </Typography>
            </Box>
          </Box>
        )
      case "Projects":
        return (
          <Grid container spacing={6} sx={{ mt: 5, p: 2 }}>
            {projects.map(project => {
              return (
                <Grid item xs={12} md={6} xl={4}>
                  <ProjectCard
                    likedId={project.node.uuid}
                    key={project.node.slug}
                    {...project}
                  />
                </Grid>
              )
            })}
          </Grid>
        )
      case "Blog":
        return (
          <Grid container spacing={6} sx={{ mt: 5, p: 2 }}>
            <Grid item xs={12} sx={{ mb: 5 }}>
              <TextField
                id="filled-basic"
                label="Search"
                variant="filled"
                onChange={e => setQuery(e.target.value.toLowerCase())}
              />
            </Grid>
            {blogPosts.map(post => {
              if (query) {
                if (post.node.title.toLowerCase().includes(query))
                  return (
                    <Grid item xs={12} md={6} xl={4}>
                      <BlogPost
                        likedId={post.node.uuid}
                        key={post.node.slug}
                        {...post}
                      />
                    </Grid>
                  )
              } else {
                return (
                  <Grid item xs={12} md={6} xl={4}>
                    <BlogPost
                      likedId={post.node.uuid}
                      key={post.node.slug}
                      {...post}
                    />
                  </Grid>
                )
              }
            })}
          </Grid>
        )
      case "Resume":
        return (
          <Box>
            <Grid
              container
              sx={{ p: 2, mt: 5, width: "100%" }}
              justifyContent="space-around"
            >
              <Grid item xs={12} sm={4}>
                <Typography variant="h4" color={palette.primary.main}>
                  Skills
                </Typography>
                <Box sx={{ mt: 3 }}>
                  {resume.skills.map((skill, i) => {
                    while (i < resume.skills.length) {
                      return (
                        <Box sx={{ pt: 5 }}>
                          <Typography
                            variant="h5"
                            color={palette.secondary.main}
                          >
                            {skill.name}
                          </Typography>
                          <Box sx={{ pt: 2 }}>
                            {skill?.content?.map(cont => {
                              return (
                                <Typography
                                  variant="body1"
                                  color={palette.text.primary}
                                >
                                  {cont}
                                </Typography>
                              )
                            })}
                          </Box>
                        </Box>
                      )
                    }
                  })}
                </Box>
                {/* <Typography variant="h4" color={palette.primary.main}>
                  Skills
                </Typography>
                <Box sx={{ pl: 3 }}>
                  <Typography
                    variant="h5"
                    color={palette.secondary.main}
                    sx={{ mt: 5 }}
                  >
                    Languages
                  </Typography>
                  {resume.languages.map(language => {
                    return (
                      <Typography
                        variant="body1"
                        color={palette.text.primary}
                        sx={{ pl: 5 }}
                      >
                        {language}
                      </Typography>
                    )
                  })}
                </Box>
                <Box sx={{ pl: 3 }}>
                  <Typography variant="h5" color={palette.secondary.main}>
                    Frameworks
                  </Typography>
                  {resume.frameworks.map(frame => {
                    return (
                      <Typography
                        sx={{ pl: 5 }}
                        variant="body1"
                        color={palette.text.primary}
                      >
                        {frame}
                      </Typography>
                    )
                  })}
                </Box>
                <Box>
                  <Typography
                    sx={{ pl: 3 }}
                    variant="h5"
                    color={palette.secondary.main}
                  >
                    Libraries
                  </Typography>

                  {resume.libraries.map(library => {
                    return (
                      <Typography
                        sx={{ pl: 5 }}
                        variant="body1"
                        color={palette.text.primary}
                      >
                        {library}
                      </Typography>
                    )
                  })}
                </Box>
                <Box>
                  <Typography
                    sx={{ pl: 3 }}
                    variant="h5"
                    color={palette.secondary.main}
                  >
                    CMS/Tools
                  </Typography>
                  {resume.tools.map(tool => {
                    return (
                      <Typography
                        sx={{ pl: 5 }}
                        variant="body1"
                        color={palette.text.primary}
                      >
                        {tool}
                      </Typography>
                    )
                  })}
                </Box> */}
              </Grid>
              <Grid item xs={12} sm={8}>
                <Box>
                  <Typography sx={{ color: palette.primary.main }} variant="h4">
                    Experience
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    {resume.experience.map((exp, i) => {
                      while (i < resume.experience.length) {
                        return (
                          <Box sx={{ pt: 5 }}>
                            <Typography
                              sx={{ color: palette.secondary.main }}
                              variant="h5"
                            >
                              {exp.name}
                            </Typography>
                            <Box sx={{ pt: 2 }}>
                              <Typography
                                variant="body1"
                                color={palette.text.primary}
                              >
                                {exp.employment} -- {exp.time}
                              </Typography>
                            </Box>
                            <Box sx={{ pl: 4 }}>
                              {exp?.duties?.map(d => {
                                return (
                                  <Typography
                                    variant="body2"
                                    color={palette.text.primary}
                                  >
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
                  <Box sx={{ mt: 8 }}>
                    <Typography variant="h4" color={palette.primary.main}>
                      {resume.education.name}
                    </Typography>
                    <Box>
                      <Typography
                        variant="h5"
                        color={palette.secondary.main}
                        sx={{ pt: 5 }}
                      >
                        {resume.education.school}
                      </Typography>
                      <Typography
                        variant="body1"
                        color={palette.text.primary}
                        sx={{ pt: 2 }}
                      >
                        {resume.education.degree}, {resume.education.degreeIn}{" "}
                        -- {resume.education.graduation}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
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
