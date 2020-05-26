describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    cy.createUser({
      name: 'testname',
      username: 'testuser',
      password: 'testpwd'
    })

    cy.createUser({
      name: 'user2name',
      username: 'user2',
      password: 'user2pwd'
    })

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testuser')
      cy.get('#password').type('testpwd')
      cy.get('#login-button').click()

      cy.contains('testname logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.get('.loginClass').get('.notification')
        .should('contain', 'wrong credentials')
        .should('have.css', 'color', 'rgb(0, 0, 255)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testuser', password: 'testpwd' })
    })

    it('A blog can be created', function () {
      cy.get('.showCreateNew').click()
      cy.get('#title').type('ttitle')
      cy.get('#author').type('tauthor')
      cy.get('#url').type('turl')
      cy.get('#create-new-button').click()

      cy.get('.blogsClass').contains('ttitle')
      cy.get('.blogsClass').contains('tauthor')
    })

    describe('when there is a blog', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'ttitle',
          author: 'tauthor',
          url: 'turl'
        })
      })

      it('A blog can be liked', function () {
        cy.get('.blogsClass').contains('ttitle').contains('view').click()
        cy.get('.blogsClass').contains('ttitle').parent().contains('like').click()

        cy.get('.blogsClass').contains('ttitle').parent().contains('likes 1')

      })

      it('A blog can be deleted', function () {
        cy.get('.blogsClass').contains('ttitle').contains('view').click()
        cy.get('.blogsClass').contains('ttitle').parent().contains('delete').click()

        cy.get('.blogsClass').should('not.contain','ttitle')

      })

      it('others blogs cannot be deleted', function () {

        cy.contains('logout').click()

        cy.login({ username: 'user2', password: 'user2pwd' })

        cy.get('.blogsClass').contains('ttitle').contains('view').click()
        cy.get('.blogsClass').contains('ttitle').parent().should('not.contain','delete')

      })

    })


    describe('when there are blogs', function () {
      beforeEach(function () {

        cy.createBlog({
          title: 'aaaaaaaaa',
          author: 'bbbbbbbbbb',
          url: 'cccccccccccc'
        })
        cy.createBlog({
          title: 'ttitle',
          author: 'tauthor',
          url: 'turl'
        })

        cy.get('.blogsClass').contains('ttitle').contains('view').click()
        cy.get('.blogsClass').contains('ttitle').parent().contains('like').click()
      })

      it('check sorting', function () {
        cy.contains('logout').click()

        cy.login({ username: 'user2', password: 'user2pwd' })

        cy.get('.blogsClass').get('.blog').then(blogs => {cy.wrap(blogs[0]).contains('ttitle')})
      })

    })

  })

})

