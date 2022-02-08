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

const IndexPage = ({data}) => {
  const posts = data.posts.edges;

  return (
  <Layout>
    <Seo title="Home" />
    {posts.map(post => {
      return <BlogCard key={post.uuid} {...post} />
    }
    )}
  </Layout>
  )
}

export default IndexPage
