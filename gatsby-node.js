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
    }
  `)

  const pageTemplate = path.resolve('./src/components/book.js')

  for (const { node } of data.books.edges) {
    createPage({
      path: '/book/' + node.id + '/',
      component: pageTemplate,
      context: {
        id: node.id,
      },
    })
  }
}
