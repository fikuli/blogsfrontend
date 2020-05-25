import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [view, setView] = useState('view')

  const like = (event) => {
    const newObject = {...blog}
    newObject.likes +=1
    updateBlog(blog.id, newObject)
  }

  const showDetails = (event) => {
    if (!visible) setView('hide')
    else setView('view')
    setVisible(!visible)
  }


  if (visible) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} - {blog.author} <button onClick={showDetails}>{view}</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={like}>like</button></p>
        <p>{blog.user.name}</p>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={showDetails}>{view}</button>
    </div>
  )
}
export default Blog
