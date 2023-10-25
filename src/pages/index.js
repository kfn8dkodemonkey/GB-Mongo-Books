import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = (props) => {
  const books = props.data.books.edges;
  const posts = props.data.posts.edges;

  return (
    <Layout>
      <div className="posts">
        {posts.map(post =>
          <div className="post">
            <h2><Link to={"/blog/" + post.node.frontmatter.slug}>{post.node.frontmatter.title}</Link></h2>
            <p>By {post.node.frontmatter.author}</p>
          </div>)}
      </div>
      <div className="book-container">
      {books.map(book =>
            <div className="book">
              {book.node.thumbnailUrl &&
                <Link to={'/book/' + book.node.id}>
                    <img src={book.node.thumbnailUrl}/>
                </Link>
              }
            </div>
      )}
      </div>

    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    posts: allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            slug
            author
          }
        }
      }
    }
    books: allMongodbGatsbyBooks {
      edges {
        node {
          id
          title
          shortDescription
          thumbnailUrl
        }
      }
    }
  }
`
