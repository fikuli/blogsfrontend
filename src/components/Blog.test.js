import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'titlexxxx',
    author: 'ben',
    url: 'urlxxx',
    likes: 5432
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'ben'
  )
  expect(component.container).toHaveTextContent(
    'titlexxxx'
  )
  expect(component.container).not.toHaveTextContent(
    'urlxxx'
  )
  expect(component.container).not.toHaveValue(
    5432
  )
})

test('view button clicked', () => {
  const user = {
    username: 'alico',
    name: 'velico'
  }
  const blog = {
    title: 'titlexxxx',
    author: 'ben',
    url: 'urlxxx',
    likes: 5432,
    user:{
      username: 'alico',
      name: 'velico'
    }
  }


  const component = render(
    <Blog user={user} blog={blog} />
  )


  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'ben'
  )
  expect(component.container).toHaveTextContent(
    'titlexxxx'
  )
  expect(component.container).toHaveTextContent(
    'urlxxx'
  )
  expect(component.container).toHaveTextContent(
    5432
  )
})


test('like button clicked', () => {
  const user = {
    username: 'alico',
    name: 'velico'
  }
  const blog = {
    title: 'titlexxxx',
    author: 'ben',
    url: 'urlxxx',
    likes: 5432,
    user:{
      username: 'alico',
      name: 'velico'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog user={user} blog={blog} updateBlog={mockHandler}/>
  )


  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'ben'
  )
  expect(component.container).toHaveTextContent(
    'titlexxxx'
  )
  expect(component.container).toHaveTextContent(
    'urlxxx'
  )
  expect(component.container).toHaveTextContent(
    5432
  )

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)


})


