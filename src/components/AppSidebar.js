import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CCloseButton, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { getUserRole } from '../services/authService' // Import the function to get user role

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// Import both Admin and Resident navigation configs
import _navAdmin from '../_navAdmin'
import _navResident from '../_navResident'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [navigation, setNavigation] = useState([])

  // Fetch the user role and set the appropriate navigation
  useEffect(() => {
    const role = getUserRole()

    if (role === 'Admin') {
      setNavigation(_navAdmin)
    } else {
      setNavigation(_navResident)
    }

    console.log(role)
  }, [])

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CIcon className='' customClassName="sidebar-brand-full" icon={logo} height={80} />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* Render navigation dynamically based on role */}
      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
