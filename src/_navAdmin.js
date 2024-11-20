import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilWheelchair, cilPencil, cilUser, cilSettings, cilGroup, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { getUserProfile } from './services/authService'
const accountId = getUserProfile();


const _navAdmin = [
  {
    component: CNavItem,
    name: 'Admin Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Admin Profile',
    to: `/profile/${accountId}`,
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manage Users',
    to: '/profileList',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Review Complaint',
    to: '/complaints',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Accident History',
    to: '/falllists',
    icon: <CIcon icon={cilWheelchair} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavTitle,
  //   name: 'Settings',
  // },
  // {
  //   component: CNavItem,
  //   name: 'Admin Settings',
  //   to: '/admin/settings',
  //   icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
  // },
]

export default _navAdmin
