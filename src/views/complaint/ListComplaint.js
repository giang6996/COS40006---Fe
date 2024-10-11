import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CListGroup,
  CListGroupItem,
  CBadge,
} from '@coreui/react'

const Complaint = () => {
  const navigate = useNavigate()

  const handleComplaintClick = (id) => {
    // navigate(`/complaints/${id}`)
    navigate(`/complaints/detail`) // Navigate to the complaint detail page with the specific complaint id
  }

  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol md={3}>
          {/* Sidebar Filter */}
          <CCard>
            <CCardBody>
            <CButton
                color="primary"
                className="mb-4 w-100"
                onClick={() => navigate('/complaints/new')}
              >
                Create New...
              </CButton>

              <h6>Requests / Complaints</h6>
              <CListGroup className="mb-3">
                <CListGroupItem>
                  <CFormCheck id="all" label="All" defaultChecked />
                </CListGroupItem>
                <CListGroupItem>
                  <CFormCheck id="not-completed" label="Not completed" />
                </CListGroupItem>
                <CListGroupItem>
                  <CFormCheck id="completed" label="Completed" />
                </CListGroupItem>
              </CListGroup>

              <h6>Label</h6>
              <CListGroup className="mb-3">
                <CListGroupItem>
                  <CFormCheck id="security" label="Security" />
                </CListGroupItem>
                <CListGroupItem>
                  <CFormCheck id="services" label="Services" />
                </CListGroupItem>
                <CListGroupItem>
                  <CFormCheck id="resident" label="Resident" />
                </CListGroupItem>
                <CListGroupItem>
                  <CFormCheck id="others" label="Others" />
                </CListGroupItem>
              </CListGroup>

              <h6>Type</h6>
              <CListGroup className="mb-3">
                <CListGroupItem>
                  <CFormCheck id="request" label="Request" />
                </CListGroupItem>
                <CListGroupItem>
                  <CFormCheck id="complaint" label="Complaint" />
                </CListGroupItem>
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={9}>
          {/* Main List of Complaints */}
          <CCard>
            <CCardBody>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5>Request And Complaint</h5>
                <CFormInput placeholder="Search" />
              </div>

              <CListGroup>

                <CListGroupItem
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => handleComplaintClick(1)} // ID of complaint 1
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <CFormCheck id="item-1" label="About the Security Guard in Block C" />
                  </div>
                  <CBadge color="info">Security</CBadge>
                </CListGroupItem>

                <CListGroupItem
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => handleComplaintClick(2)} // ID of complaint 2
                  style={{ cursor: 'pointer' }}
                >
                  <div>
                    <CFormCheck id="item-2" label="Services location?" />
                  </div>
                  <CBadge color="secondary">Others</CBadge>
                </CListGroupItem>

              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Complaint
