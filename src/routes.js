import React from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ListProfile = React.lazy(() => import('./views/profile/ListProfile'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const ResetPassword = React.lazy(() => import('./views/pages/password/ResetPassword'))
const UpdateProfile = React.lazy(() => import('./views/profile/UpdateProfile'))
const ListComplaint = React.lazy(() => import('./views/complaint/ListComplaint'))
const CreateComplaint = React.lazy(() => import('./views/complaint/CreateComplaint'))
const DetailComplaint = React.lazy(() => import('./views/complaint/DetailComplaint'))
const FallAlertList = React.lazy(() => import('./views/alert/FallAlertList'))
const FallVideoPlayer = React.lazy(() => import('./views/alert/FallVideoPlayer'))




const routes = [
  { path: '/', exact: true, name: 'Home', element: <Navigate to="/dashboard" /> },
  { path: '/dashboard', name: 'Dashboard', element: <ProtectedRoute component={Dashboard} /> },
  { path: '/profileList', name: 'Profile List Page', element: <ProtectedRoute component={ListProfile} /> },
  { path: '/profile/:accountId', name: 'Profile Page', element: <ProtectedRoute component={Profile} /> },
  { path: '/complaints', name: 'Complaint List', element: <ProtectedRoute component={ListComplaint} /> },
  { path: '/edit/:accountId', name: 'Update Page', element: <ProtectedRoute component={UpdateProfile} /> },
  { path: '/resetPassword', name: 'Reset Password Page', element: <ProtectedRoute component={ResetPassword} /> },

  { path: '/complaints/new', name: 'Create Complaint', element: <ProtectedRoute component={CreateComplaint} /> },
  { path: '/complaints/detail/:id', name: 'Detail Complaint', element: <ProtectedRoute component={DetailComplaint} /> },
  { path: '/falllists', name: 'Falling List', element: <ProtectedRoute component={FallAlertList} /> },
  { path: '/video/:filename', name: 'Falling Video', element: <ProtectedRoute component={FallVideoPlayer} /> },
]

export default routes
