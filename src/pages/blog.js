import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout/Layout"
import Image from "../components/Images/Images"

export const pageQuery = graphql`
  query MyQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(blog)/.*.(md)/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            date
            description
            image
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

const Blog = ({ data }) => {
  return (
    <Layout>
      <div className="container py-5">
        <h2 className="pb-2 border-bottom text-center py-5">Blog Posts</h2>
        <div className="row justify-content-center py-5">
          {data.allMdx.edges.map((edge, i) => {
            return (
              <div key={i} className="col-lg-3 col-md-6 col-sm-12">
                <Link to={`/blog${edge.node.fields.slug}`}>
                  <div className="card shadow mb-4">
                    <Image
                      className="card-img"
                      style={{ margin: "0 auto" }}
                      filename={edge.node.frontmatter.image}
                      alt={edge.node.frontmatter.image}
                    />
                    <div class="card-img-overlay">
                      <h4 class="card-title " style={{color: "slategrey"}}>
                        {" "}
                        {edge.node.frontmatter.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
export default Blog
