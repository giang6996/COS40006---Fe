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
  CFormSelect,
} from '@coreui/react'
import { getUserRole } from '../../services/authService'
import api from '../../services/api'
import avatar8 from '../../assets/images/avatars/8.jpg'

const ComplaintDetail = () => {
  const { id } = useParams()
  const [complaint, setComplaint] = useState(null)
  const [response, setResponse] = useState('')
  const [status, setStatus] = useState('')
  const [userRole, setUserRole] = useState('User')

  useEffect(() => {
    const role = getUserRole()
    setUserRole(role)

    const fetchComplaint = async () => {
      try {
        const response = await api.get(`/form/get-detail?id=${id}`)
        setComplaint(response.data)
        setStatus(response.data.status)
        setResponse(response.data.response || '')
      } catch (error) {
        alert('Failed to fetch complaint detail')
        console.error('Failed to fetch complaint detail', error)
      }
    }
    fetchComplaint()
  }, [id])

  const handleAdminResponse = async () => {
    try {
      await api.post(`/form/admin-response?id=${id}`, { response, status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Include token
        },
      })
      alert('Response and status updated successfully!')
    } catch (error) {
      alert('Failed to submit response')
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
              <h2>{complaint.title}</h2>
              <CBadge color="info" className="mb-4">{complaint.label}</CBadge>

              <div className="d-flex align-items-center mb-4">
                <CImage
                      rounded
                      src={avatar8}
                      alt="Profile Picture"
                      width={50}
                      height={50}
                      className="mb-3 me-3"
                    />
                <div>
                  <strong>{complaint.residentName}</strong> <br />
                  <small>{new Date(complaint.createAt).toLocaleDateString()}</small>
                </div>
              </div>

              <p>{complaint.description}</p>

              {userRole === 'Admin' ? (
                <>
                  <h5>Admin Response</h5>
                  <CFormTextarea
                    rows="5"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter admin response"
                  />

                  {/* Status Selection */}
                  <h5 className="mt-3">Status</h5>
                  <CFormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Await">Await</option>
                    <option value="Completed">Completed</option>
                  </CFormSelect>

                  <CButton color="primary" className="mt-3" onClick={handleAdminResponse}>
                    Submit Response & Update Status
                  </CButton>
                </>
              ) : (
                <>
                  <h5>Admin Response</h5>
                  <p>{response || 'No response yet'}</p>
                </>
              )}

              <p className="mt-4">
                <strong>Status:</strong>{' '}
                <CBadge color={status === 'Completed' ? 'success' : 'warning'}>
                  {status}
                </CBadge>
              </p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ComplaintDetail
