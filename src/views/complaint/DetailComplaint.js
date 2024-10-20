import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CImage,
  CRow,
  CFormTextarea,
} from '@coreui/react'
import { getUserRole } from '../../services/authService' // Import getUserRole function
import api from '../../services/api'

const ComplaintDetail = () => {
  const { id } = useParams()
  const [complaint, setComplaint] = useState(null)
  const [response, setResponse] = useState('')
  const [status, setStatus] = useState('')
  const [userRole, setUserRole] = useState('User') // Default to 'User'

  useEffect(() => {
    // Fetch user role when the component is loaded
    const role = getUserRole()
    setUserRole(role)

    // Fetch complaint details
    const fetchComplaint = async () => {
      try {
        const response = await api.get(`/form/get-detail?id=${id}`)
        setComplaint(response.data)

        console.log(response.data)

        setStatus(response.data.status)
        setResponse(response.data.response || '') // Load existing response if any
      } catch (error) {
        console.error('Failed to fetch complaint detail', error)
      }
    }
    fetchComplaint()
  }, [id])

  const handleAdminResponse = async () => {
    try {
      await api.post(`/form/admin-response?id=${id}`, { response, status })
      alert('Response submitted successfully!')
    } catch (error) {
      console.error('Failed to submit response', error)
    }
  }

  if (!complaint) {
    return <div>Loading...</div>
  }

  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol md={8} className="offset-md-2">
          <h4 className="mb-4">Request/Complaint Detail</h4>
          <CCard>
            <CCardBody>
              {/* Complaint Title and Label */}
              <h2>{complaint.title}</h2>
              <CBadge color="info" className="mb-4">{complaint.label}</CBadge>

              {/* User Info and Date */}
              <div className="d-flex align-items-center mb-4">
                <CImage
                  rounded
                  src="#" 
                  alt="User Avatar"
                  width={50}
                  height={50}
                  className="me-3"
                />
                <div>
                  <strong>{complaint.residentName}</strong> <br />
                  <small>{new Date(complaint.createAt).toLocaleDateString()}</small>
                </div>
              </div>

              {/* Complaint Description */}
              <p>{complaint.description}</p>

              {/* Admin Response Section - Show only if the user is an Admin */}
              {userRole === 'Admin' ? (
                <>
                  <h5>Admin Response</h5>
                  <CFormTextarea
                    rows="5"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter admin response"
                  />

                  <CButton color="primary" className="mt-3" onClick={handleAdminResponse}>
                    Submit Response
                  </CButton>
                </>
              ) : (
                <>
                  <h5>Admin Response</h5>
                  <p>{response || 'No response yet'}</p>
                </>
              )}

              {/* Complaint Status */}
              <p className="mt-4">
                <strong>Status:</strong> <CBadge color={status === 'Completed' ? 'success' : 'warning'}>{status}</CBadge>
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ComplaintDetail
