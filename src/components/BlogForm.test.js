import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('adds correct blog contents', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog}/>
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')


  fireEvent.change(title, {
    target: { value: 'title gir' }
  })
  fireEvent.change(author, {
    target: { value: 'author gir' }
  })
  fireEvent.change(url, {
    target: { value: 'url gir' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0]).toBe('title gir' )
  expect(createBlog.mock.calls[0][1]).toBe('author gir' )
  expect(createBlog.mock.calls[0][2]).toBe('url gir' )

})

