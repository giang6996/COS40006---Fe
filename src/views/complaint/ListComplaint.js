import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CListGroup,
  CListGroupItem,
  CFormCheck,
  CFormInput,
  CRow,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { getUserRole } from '../../services/authService'
import api from '../../services/api'
import Page404 from '../pages/page404/Page404'

const Complaint = () => {
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const role = getUserRole()
    setUserRole(role)

    // Only fetch complaints if the user is allowed
    if (role === 'Admin') {
      fetchComplaints()
    }
    else{
      fetchUserComplaints()
    }
  }, [])

  const fetchComplaints = async () => {
    try {
      const response = await api.get('/form/get-all')
      setComplaints(response.data)
    } catch (error) {
      console.error('Failed to fetch complaints:', error)
    }
  }

  const fetchUserComplaints = async () => {
    try {
      const response = await api.get('/form/get-user-complaints', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Assuming you store the access token in localStorage
        },
      })
      setComplaints(response.data)
    } catch (error) {
      console.error('Failed to fetch user complaints:', error)
    }
  }

  const handleComplaintClick = (id) => {
    navigate(`/complaints/detail/${id}`)
  }

  if (userRole !== 'Admin' && userRole !== 'User') {
    return <Page404 />
  }

  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol md={3}>
          {/* Sidebar Filter */}
          <CCard>
            <CCardBody>
              {/* Show "Create New" button only for residents */}
              {userRole !== 'Admin' && (
                <CButton
                  color="primary"
                  className="mb-4 w-100"
                  onClick={() => navigate('/complaints/new')}
                >
                  Create New...
                </CButton>
              )}

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
                {complaints.map((complaint) => (
                  <CListGroupItem
                    key={complaint.id}
                    className="d-flex justify-content-between align-items-center"
                    onClick={() => handleComplaintClick(complaint.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <CFormCheck id={`item-${complaint.id}`} label={complaint.title} />
                    </div>
                    <CBadge color="info">{complaint.label}</CBadge>
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Complaint
