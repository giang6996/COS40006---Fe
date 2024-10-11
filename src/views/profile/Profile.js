import React from 'react'
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

const ProfilePage = () => {
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
                    src="https://via.placeholder.com/150" // Replace with actual image
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="mb-3"
                  />
                </CCol>

                {/* User Information */}
                <CCol md={6}>
                  <h5>Name: Mori Roy</h5>
                  <p>Date Of Birth: 01 Jan 1990</p>
                  <p>Email: JaneDoe01@gmail.com</p>
                  <p>Phone Number: +84 912311232</p>
                  <p>ID number: 0102030201</p>
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

          {/* Apartment Information Section */}
          <CCard>
            <CCardHeader>Apartment Information</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <CListGroup>
                    <CListGroupItem className="d-flex justify-content-between">
                      <span>Name:</span> <strong>ABC</strong>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <span>Room:</span> <strong>A123</strong>
                    </CListGroupItem>
                    <CListGroupItem className="d-flex justify-content-between">
                      <span>Room Type:</span> <strong>Penthouse</strong>
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

export default ProfilePage
