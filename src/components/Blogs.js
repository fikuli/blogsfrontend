import React, { useState } from 'react'
import Blog from './Blog'

const Blogs = ({user, logout, createBlog, blogs}) =>{

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
  
  
    const handleCreateBlog = async (event) => {
        event.preventDefault()
        createBlog(title, author, url)

        setTitle('')
        setAuthor('')
        setUrl('')
      }
    



    return (
<div>

<h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>logout</button></p>


      <h1>create new</h1>
      <form onSubmit={handleCreateBlog}>
        <div>
          title
                <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
                <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
                <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create new blog</button>
      </form>



      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}


    </div>

    )
}

export default Blogs