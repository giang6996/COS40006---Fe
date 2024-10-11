import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CListGroup,
  CListGroupItem,
  CFormInput,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const ListRequestAccounts = () => {
  const navigate = useNavigate()

  const handleViewProfile = (id) => {
    navigate(`/requests/${id}`) // Navigate to the request detail page with the specific resident ID
  }

  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol md={12}>
          <h4 className="mb-4">New Resident Account Request</h4>
          <CCard>
            <CCardBody>
              {/* Search Bar */}
              <CFormInput placeholder="Write Your Request Here" className="mb-4" />

              {/* Requests List */}
              <CListGroup>
                <CListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>John Doe</strong> <br />
                    Email: JohnDoe01@gmail.com
                  </div>
                  <CButton
                    color="primary"
                    onClick={() => handleViewProfile(1)} // ID of the request
                  >
                    View Profile
                  </CButton>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Jane Doe</strong> <br />
                    Email: JaneDoe01@gmail.com
                  </div>
                  <CButton
                    color="primary"
                    onClick={() => handleViewProfile(2)} // ID of the request
                  >
                    View Profile
                  </CButton>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Annie Mane</strong> <br />
                    Email: AnnieM@gmail.com
                  </div>
                  <CButton
                    color="primary"
                    onClick={() => handleViewProfile(3)} // ID of the request
                  >
                    View Profile
                  </CButton>
                </CListGroupItem>
                {/* Add more request items here */}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ListRequestAccounts
