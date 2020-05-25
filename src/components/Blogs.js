import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Blogs = ({ user, logout, createBlog, blogs, updateBlog }) => {
    const blogsRef = React.createRef()
    

    const createBlogx = async (title, author, url) => {
        createBlog(title,author,url)
        blogsRef.current.toggleVisibility()
    }

    return (
        <div>

            <h2>blogs</h2>
            <p>{user.name} logged in <button onClick={logout}>logout</button></p>

            <Togglable buttonLabel='create new' ref={blogsRef}>
                <BlogForm createBlog={createBlogx} />
            </Togglable>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>
            )}


        </div>

    )
}

export default Blogs