import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ user, logout, createBlog, blogs, updateBlog, deleteBlog }) => {
  const blogsRef = React.createRef()


  const createBlogx = async (title, author, url) => {
    createBlog(title, author, url)
    blogsRef.current.toggleVisibility()
  }

  blogs.sort(function (a, b) {
    return b.likes - a.likes
  })


  return (
    <div>

      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>

      <Togglable buttonLabel='create new' ref={blogsRef}>
        <BlogForm createBlog={createBlogx} />
      </Togglable>

      <div className="blogsClass">
        {blogs.map(blog =>
          <Blog user={user} key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
        )}
      </div>

    </div>

  )
}

export default Blogs