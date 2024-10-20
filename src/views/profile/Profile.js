import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CImage,
  CListGroup,
  CListGroupItem,
  CCardHeader,
} from '@coreui/react'
import { getUserRole } from '../../services/authService'
import api from '../../services/api'

const ProfilePage = () => {
  const { accountId } = useParams() // Get accountId from URL params
  const [profile, setProfile] = useState(null)
  const [userRole, setUserRole] = useState('User') // Default role is Resident
  const [searchedAccountRole, setSearchedAccountRole] = useState('User') // Default to Resident for searched account

  useEffect(() => {
    // Fetch the role when the component is loaded
    const role = getUserRole()
    
    setUserRole(role)

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/account/profile${accountId ? `?accountId=${accountId}` : ''}`)

        if (response.data.roles != null && response.data.roles.includes('Admin')) {
          setSearchedAccountRole('Admin')
        } else {
          setSearchedAccountRole('User')
        }

        setProfile(response.data)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }

    fetchProfile()
  }, [accountId])

  if (!profile) {
    return <div>Loading...</div>
  }

  // Render different content based on the user's role
  const renderProfileContent = () => {

    console.log(userRole)
    if (userRole === 'Admin' && searchedAccountRole === 'Admin') {
      return (
        <CContainer fluid className="profile-page-container mt-4">
          <CRow className="justify-content-center">
            <CCol lg={10}>
              <h2 className="mb-4">User Profile Information</h2>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    {/* Profile Image */}
                    <CCol md={3} className="text-center">
                      <CImage
                        rounded
                        src="*" // Replace with actual image
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        className="mb-3"
                      />
                    </CCol>

                    {/* User Information */}
                    <CCol md={6}>
                      <h5>Name: {profile.firstName} {profile.lastName}</h5>
                      <p>Email: {profile.email}</p>
                      <p>Phone Number: {profile.phoneNumber}</p>
                      <p>Status: {profile.status}</p>
                    </CCol>

                    {/* Buttons */}
                    <CCol md={3} className="d-flex flex-column align-items-end">
                      <CButton color="primary" className="mb-3 w-100">
                        Edit Profile
                      </CButton>
                      <CButton color="danger" className="w-100">
                        Reset Password
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>

              <CCard>
                <CCardHeader>Work Information</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol>
                      <CListGroup>
                        <CListGroupItem className="d-flex justify-content-between">
                          <span>Location:</span> <strong>{profile.workLocation || 'ALL'}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between">
                          <span>Position:</span> <strong>{profile.position || 'User Admin'}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between">
                          <span>WorkID:</span> <strong>{profile.workId || 'A1233'}</strong>
                        </CListGroupItem>
                      </CListGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
        
      )
    } else {
      return (
        <CContainer fluid className="profile-page-container mt-4">
          <CRow className="justify-content-center">
            <CCol lg={10}>
              <h2 className="mb-4">My Information</h2>
              <CCard className="mb-4">
                <CCardBody>
                  <CRow>
                    {/* Profile Image */}
                    <CCol md={3} className="text-center">
                      <CImage
                        rounded
                        src="*" // Replace with actual image
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        className="mb-3"
                      />
                    </CCol>

                    {/* User Information */}
                    <CCol md={6}>
                      <h5>Name: {profile.firstName} {profile.lastName}</h5>
                      <p>Email: {profile.email}</p>
                      <p>Phone Number: {profile.phoneNumber}</p>
                      <p>Status: {profile.status}</p>
                    </CCol>

                    {/* Buttons */}
                    <CCol md={3} className="d-flex flex-column align-items-end">
                      <CButton color="primary" className="mb-3 w-100">
                        Edit Profile
                      </CButton>
                      <CButton color="danger" className="w-100">
                        Reset Password
                      </CButton>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
              <CCard>
                <CCardHeader>Apartment Information</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol>
                      <CListGroup>
                        <CListGroupItem className="d-flex justify-content-between">
                          <span>Apartment Name:</span> <strong>{profile.apartmentName || 'N/A'}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between">
                          <span>Room:</span> <strong>{profile.room || 'N/A'}</strong>
                        </CListGroupItem>
                        <CListGroupItem className="d-flex justify-content-between">
                          <span>Room Type:</span> <strong>{profile.roomType || 'N/A'}</strong>
                        </CListGroupItem>
                      </CListGroup>
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      )
    }
  }

  return renderProfileContent()
}

export default ProfilePage
