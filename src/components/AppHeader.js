import React, { useEffect, useRef, useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CBadge,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CToast,
  CToastBody,
  CToaster,
  useColorModes,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { NotificationContext } from '../context/NotificationContext';

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const { notifications, unreadCount, markAllAsRead, setNotifications } = useContext(NotificationContext);
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [toasts, setToasts] = useState([]);

  const handleNotificationClick = (alertId) => {

    // Remove notification from the list
    const updatedNotifications = notifications.filter(notification => notification.alertId !== alertId);
    setNotifications(updatedNotifications);

    // Update local storage with the modified notifications list
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));

    // Navigate to the notification
    navigate('/falllists', { state: { alertId } });
  };

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])

  // Show a toast notification for each new notification
  useEffect(() => {
    if (notifications.length > 0) {
      const newNotification = notifications[notifications.length - 1];
      setToasts((prevToasts) => [
        ...prevToasts,
        { ...newNotification, id: new Date().getTime() }, // Assign a unique ID for each toast
      ]);
    }
  }, [notifications]);

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="ms-auto">
        <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={cilBell} size="lg" />
              {unreadCount > 0 && (
                <CBadge color="danger" shape="rounded-pill" className="position-absolute top-0 start-100 translate-middle">
                  {unreadCount}
                </CBadge>
              )}
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" style={{ width: '300px' }}>
              <div className="dropdown-header bg-light fw-semibold py-2">Notifications</div>
              {notifications.length > 0 ? (
                notifications.slice(0, 5).map((notification, index) => (
                  <CDropdownItem 
                  key={index}
                  onClick={() => handleNotificationClick(notification.alertId)}
                  >
                    <strong>{notification.alertMessage || "New Notification"}</strong><br />
                    <small className="text-muted">
                      {notification.date && notification.time
                        ? new Date(`${notification.date}T${notification.time}`).toLocaleString()
                        : "Invalid Date"}
                    </small>
                  </CDropdownItem>
                ))
              ) : (
                <CDropdownItem className="text-center">No new notifications</CDropdownItem>
              )}
              <CDropdownItem divider />
              <CDropdownItem onClick={markAllAsRead} className="text-center">
                Mark all as read
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />

        <CToaster position="top-start">
          {toasts.map((toast) => (
            <CToast key={toast.id} autohide={5000} visible={true} className="bg-info text-white">
              <CToastBody>
                <strong>{toast.alertMessage || "New Notification"}</strong><br />
                <small>
                  {toast.date && toast.time
                    ? new Date(`${toast.date}T${toast.time}`).toLocaleString()
                    : "Invalid Date"}
                </small>
              </CToastBody>
            </CToast>
          ))}
        </CToaster>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
