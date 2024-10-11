import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormTextarea,
  CRow,
  CBadge,
  CImage,
  CFormCheck,
} from '@coreui/react'

const ComplaintDetail = () => {
    return (
        <CContainer fluid className="mt-4">
          <CRow>
            <CCol md={8} className="offset-md-2">
              <h4 className="mb-4">Request/Complaint Detail</h4>
              <CCard>
                <CCardBody>
                  {/* Title and Category */}
                  <h2>Slow Internet Connection</h2>
                  <CBadge color="info" className="mb-4">Services</CBadge>
    
                  {/* User Info and Date */}
                  <div className="d-flex align-items-center mb-4">
                    <CImage
                      rounded
                      src="https://via.placeholder.com/50" // Replace with actual user image
                      alt="User Avatar"
                      width={50}
                      height={50}
                      className="me-3"
                    />
                    <div>
                      <strong>Jimmy Falcon</strong> <br />
                      <small>12 Nov 2019</small>
                    </div>
                  </div>
    
                  {/* Complaint Description */}
                  <p>
                    My internet has been very slow for the past few days. I’ve tried restarting the router, but it hasn’t helped much. 
                    I’ve also checked with my service provider, and they assured me there’s no outage in my area. It’s becoming frustrating 
                    because it’s affecting my work and streaming. Do you have any suggestions on how to fix this issue or improve my internet speed?
                  </p>
    
                  {/* Response Section */}
                  <h5>Admin Response</h5>
                  <p>
                    Dear Jimmy, <br />
                    Thank you for your complaint. We have escalated this issue to the internet service provider and expect resolution within 24 hours.
                    Please let us know if the problem persists after that. <br /><br />
                    Regards, <br />
                    The Apartment Admin Team
                  </p>
    
                  {/* Status Display */}
                  <p className="mt-4">
                    <strong>Status:</strong> <CBadge color="success">Completed</CBadge>
                  </p>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      )
    }

export default ComplaintDetail