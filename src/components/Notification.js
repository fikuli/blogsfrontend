import React from 'react'

const Notification = ({ message }) => {

  const errorStyle = {
    color: 'rgb(0, 0, 255)',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderTadius: 5,
    padding: 10,
    marginBottom: 10
  }


  if (message === null) {
    return null
  }

  return (
    <div className="notification" style={errorStyle}>
      {message}
    </div>
  )
}

export default Notification