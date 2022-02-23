import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { graphql } from "gatsby"
import { BlogCard } from "../components/blogcard"

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
  return null
}

const IndexPage = ({ data }) => {
  const posts = data.posts.edges

  /** SETUP STATE */

  /** SETUP onClickTab Handler
   * Param: value
   */

  return (
    <Layout>
      <Seo title="Home" />
      <div className="tabs_wrapper">
        <div className="tabs">
          <button className="tab">About</button>
          <button className="tab">Projects</button>
          <button className="tab">Blog</button>
          <button className="tab">Resume</button>
        </div>
      </div>
      <Content value="Projects" />
      {/* <div>
        {posts.map(post => {
          return <BlogCard key={post.uuid} {...post} />
        })}
      </div> */}
    </Layout>
  )
}

export default IndexPage
