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
} from '@coreui/react'
import { useParams } from 'react-router-dom'

const RequestAccounts = () => {
  const { id } = useParams() // Get the request ID from the route parameter

  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol md={8} className="offset-md-2">
          <h4 className="mb-4">New Resident Account Request</h4>
          <CCard>
            <CCardBody>
              {/* Resident Basic Information */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5>Name: Jane Doe</h5>
                  <p>Date Of Birth: 01 Jan 1990</p>
                  <p>Email: JaneDoe01@gmail.com</p>
                  <p>Phone Number: +84 912311232</p>
                  <p>ID number: 0102030201</p>
                </div>
                <CImage
                  rounded
                  src="https://via.placeholder.com/150" // Replace with actual profile picture
                  alt="Profile Picture"
                  width={150}
                  height={150}
                />
              </div>

              {/* Accept / Reject Buttons */}
              <div className="d-flex justify-content-between mb-4">
                <CButton color="success" className="w-50 me-2">
                  Accept Profile
                </CButton>
                <CButton color="danger" className="w-50 ms-2">
                  Reject Profile
                </CButton>
              </div>

              {/* Apartment Information */}
              <h5>Apartment Information</h5>
              <CListGroup className="mb-4">
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

              {/* Document Information */}
              <h5>Documents Information</h5>
              <CListGroup>
                <CListGroupItem className="d-flex justify-content-between">
                  <span>Doc 1</span> <CButton color="primary">Download</CButton>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between">
                  <span>Doc 2</span> <CButton color="primary">Download</CButton>
                </CListGroupItem>
                <CListGroupItem className="d-flex justify-content-between">
                  <span>Doc 3</span> <CButton color="primary">Download</CButton>
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default RequestAccounts
