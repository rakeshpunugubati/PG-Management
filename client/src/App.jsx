import React from 'react'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <>
      <div>Wlecome to Sweet Home Services</div>
      <Outlet />
    </>
  )
}

export default App