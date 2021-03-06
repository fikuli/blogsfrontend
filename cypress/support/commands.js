

Cypress.Commands.add('createUser', ({ name, username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users/', { name, username, password })
})


Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogsappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })

})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.get('.showCreateNew').click()

  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogsappUser')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})