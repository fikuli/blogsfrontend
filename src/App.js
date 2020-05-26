import React, { useState, useEffect } from 'react'
import Notification from './components/Notification'

import Blogs from './components/Blogs'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    blogService.setToken(null)
  }




  const createBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title, author, url
      })

      const result = await blogService.getAll()
      setBlogs(result)

      setErrorMessage(`success: a new blog added - ${blog.title}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(`error: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const updateBlog = async (id, newObject) => {
    try {
      await blogService.update(id, newObject)

      const result = await blogService.getAll()
      setBlogs(result)
    }
    catch (exception) {
      setErrorMessage(`error: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return 0
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)

      const result = await blogService.getAll()
      setBlogs(result)
    }
    catch (exception) {
      setErrorMessage(`error: ${exception.response.data.error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      return 0
    }
  }

  const login = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogsappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('error: wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  if (user === null) {
    return (
      <div className="loginClass">
        <Notification message={errorMessage} />
        <Login login={login} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <Blogs user={user} logout={logout} createBlog={createBlog} blogs={blogs} updateBlog={updateBlog} deleteBlog={deleteBlog} />

    </div>
  )
}

export default App