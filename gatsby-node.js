const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    {
      books: allMongodbGatsbyBooks {
        edges {
          node {
            id
          }
        }
      }
      posts: allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
              book
            }
          }
        }
      }
    }
  `)

  const blogTemplate = path.resolve('./src/components/blog.js')
  const pageTemplate = path.resolve('./src/components/book.js')

  for (const { node } of data.posts.edges) {

    createPage({
      path: `/blog/${node.frontmatter.slug}/`,
      component: blogTemplate,
      context: {
        id: node.frontmatter.slug,
        book: node.frontmatter.book
      },
    })
  }

  for (const { node } of data.books.edges) {
    createPage({
      path: `/book/` + node.id + `/`,
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  }
}
