import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilSettings, cilUser, cilExitToApp } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate } from 'react-router-dom'

import { logout } from '../../services/authService'

import { getUserProfile } from '../../services/authService'


import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const accountId = getUserProfile();
  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate(`/profile/${accountId}`) // Redirects to the Profile page
  }

  const handleLogout = () => {
    // Clear tokens from localStorage or wherever you store the token
    logout()
    // Redirect to login page
    navigate('/login')
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* Profile Link */}
        <CDropdownItem onClick={handleProfileClick}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        
        {/* Settings Link */}
        <CDropdownItem href="/settings">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        
        {/* Logout Link */}
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilExitToApp} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
