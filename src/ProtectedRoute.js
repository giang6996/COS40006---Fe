// ProtectedRoute.js
import React from 'react'
import { Navigate } from 'react-router-dom'
import { isTokenValid } from './services/authService'

const ProtectedRoute = ({ component: Component }) => {
  if (!isTokenValid()) {
    return <Navigate to="/login" />
  }
  return <Component />
}

export default ProtectedRoute