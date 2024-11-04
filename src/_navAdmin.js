import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilUser, cilSettings, cilGroup } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { getUserProfile } from './services/authService'
const accountId = getUserProfile();


const _navAdmin = [
  // {
  //   component: CNavItem,
  //   name: 'Admin Dashboard',
  //   to: '/admin-dashboard',
  //   icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  // },
  {
    component: CNavItem,
    name: 'Admin Profile',
    to: `/profile/${accountId}`,
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Users',
    to: '/profile',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Settings',
  },
  {
    component: CNavItem,
    name: 'Admin Settings',
    to: '/admin/settings',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  },
]

export default _navAdmin
