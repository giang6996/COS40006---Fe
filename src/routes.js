import React from 'react'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ListProfile = React.lazy(() => import('./views/profile/ListProfile'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const ListAccountRequest = React.lazy(() => import('./views/profile/request/ListRequestAccount'))
const AccountRequest = React.lazy(() => import('./views/profile/request/RequestAccount'))
const ListComplaint = React.lazy(() => import('./views/complaint/ListComplaint'))
const CreateComplaint = React.lazy(() => import('./views/complaint/CreateComplaint'))
const DetailComplaint = React.lazy(() => import('./views/complaint/DetailComplaint'))




const routes = [
  { path: '/', exact: true, name: 'Home', element: <Navigate to="/dashboard" /> },
  { path: '/dashboard', name: 'Dashboard', element: <ProtectedRoute component={Dashboard} /> },
  { path: '/profile', name: 'Profile List Page', element: <ProtectedRoute component={ListProfile} /> },
  { path: '/profile/:accountId', name: 'Profile Page', element: <ProtectedRoute component={Profile} /> },
  { path: '/accrequest', name: 'Account Request List Page', element: <ProtectedRoute component={ListAccountRequest} /> },
  { path: '/accrequest/detail', name: 'Account Request Page', element: <ProtectedRoute component={AccountRequest} /> },
  { path: '/complaints', name: 'Complaint List', element: <ProtectedRoute component={ListComplaint} /> },
  { path: '/complaints/new', name: 'Create Complaint', element: <ProtectedRoute component={CreateComplaint} /> },
  { path: '/complaints/detail/:id', name: 'Detail Complaint', element: <ProtectedRoute component={DetailComplaint} /> },
]

export default routes
