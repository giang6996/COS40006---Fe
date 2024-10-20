import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilSpeedometer, cilPencil, cilBell } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

import { getUserProfile } from './services/authService'
const accountId = getUserProfile();

const _navResident = [
  {
    component: CNavItem,
    name: 'Resident Profile',
    to: `/profile/${accountId}`, // Use the account ID dynamically
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Submit Complaint',
    to: '/complaints',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Notifications',
  },
  {
    component: CNavItem,
    name: 'Notifications',
    to: '/resident/notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },
]

export default _navResident
