import React from 'react'

export const AdminAuthWarning = () => {
    setTimeout(() => {
        window.location.href = "/"
    }, 3000);

  return (
    <div className='h-full w-full'>
        <h1>You are not an Administrator of this website!</h1>
        <p>Returning in 3 seconds...</p>
    </div>
  )
}
