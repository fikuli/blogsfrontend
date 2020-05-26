import React, { useState } from 'react'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [bblog, setBblog] = useState(blog)

  const [visible, setVisible] = useState(false)
  const [view, setView] = useState('view')

  const like = async () => {
    const newObject = { ...bblog }
    newObject.likes +=1
    setBblog(newObject)
    await updateBlog(bblog.id, newObject)
  }

  const showDetails = () => {
    if (!visible) setView('hide')
    else setView('view')
    setVisible(!visible)
  }

  const deleteEntry = () => {
    if (window.confirm(`Delete ${bblog.title}?`)) {
      deleteBlog(bblog.id)
    }
  }

  console.log(user)
  console.log(bblog)

  if (visible && user.username === bblog.user.username) {
    return (
      <div style={blogStyle} className='blog'>
        <p>{bblog.title} - {bblog.author} <button onClick={showDetails}>{view}</button></p>
        <p>{bblog.url}</p>
        <p>likes {bblog.likes} <button onClick={like}>like</button></p>
        <p>{bblog.user.name}</p>
        <p><button onClick={deleteEntry}>delete</button></p>
      </div>
    )
  }
  else if(visible){
    return (
      <div style={blogStyle} className='blog'>
        <p>{bblog.title} - {bblog.author} <button onClick={showDetails}>{view}</button></p>
        <p>{bblog.url}</p>
        <p>likes {bblog.likes} <button onClick={like}>like</button></p>
        <p>{bblog.user.name}</p>
      </div>
    )
  }
  return (
    <div style={blogStyle} className='blog'>
      {bblog.title} - {bblog.author} <button onClick={showDetails}>{view}</button>
    </div>
  )
}
export default Blog
