import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import api from '../../services/api'


const CreateComplaint = () => {
  const navigate = useNavigate()

  const [complaint, setComplaint] = useState({
    title: '',
    type: 'Request',
    label: 'Security',
    description: '',
    media: null,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setComplaint({
      ...complaint,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    setComplaint({ ...complaint, media: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const complaintData = {
      title: complaint.title,
      type: complaint.type,
      label: complaint.label,
      description: complaint.description,
      requestMediaLink: complaint.media ? URL.createObjectURL(complaint.media) : null, // If there's media
    }
  
    try {
      await api.post('/form/new-request', complaintData, {
        headers: {
          'Content-Type': 'application/json',  // Set content type to JSON
        },
      })
      alert('Complaint submitted successfully!')
      navigate('/complaints')
    } catch (error) {
      alert('Failed to submit complaint')
      console.error('Failed to submit complaint', error)
    }
  }

  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol md={8} className="offset-md-2">
          <CCard>
            <CCardBody>
              <h5>Create new requests / complaints</h5>
              <CForm onSubmit={handleSubmit}>
                <CFormInput
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title..."
                  className="mb-4"
                  value={complaint.title}
                  onChange={handleChange}
                  required
                />

                <CRow className="mb-4">
                  <CCol md={6}>
                    <h6>Label</h6>
                    <CFormCheck
                      inline
                      id="security"
                      name="label"
                      value="Security"
                      label="Security"
                      checked={complaint.label === 'Security'}
                      onChange={handleChange}
                    />
                    <CFormCheck
                      inline
                      id="services"
                      name="label"
                      value="Services"
                      label="Services"
                      checked={complaint.label === 'Services'}
                      onChange={handleChange}
                    />
                    <CFormCheck
                      inline
                      id="resident"
                      name="label"
                      value="Resident"
                      label="Resident"
                      checked={complaint.label === 'Resident'}
                      onChange={handleChange}
                    />
                    <CFormCheck
                      inline
                      id="others"
                      name="label"
                      value="Others"
                      label="Others"
                      checked={complaint.label === 'Others'}
                      onChange={handleChange}
                    />
                  </CCol>
                  <CCol md={6}>
                    <h6>Type</h6>
                    <CFormCheck
                      inline
                      id="request"
                      name="type"
                      value="Request"
                      label="Request"
                      checked={complaint.type === 'Request'}
                      onChange={handleChange}
                    />
                    <CFormCheck
                      inline
                      id="complaint"
                      name="type"
                      value="Complaint"
                      label="Complaint"
                      checked={complaint.type === 'Complaint'}
                      onChange={handleChange}
                    />
                  </CCol>
                </CRow>

                <CFormTextarea
                  id="description"
                  name="description"
                  rows="5"
                  placeholder="Detailed description"
                  className="mb-4"
                  value={complaint.description}
                  onChange={handleChange}
                  required
                ></CFormTextarea>

                <div className="mb-4">
                  <h6>Related media</h6>
                  <CFormInput type="file" id="upload-media" onChange={handleFileChange} />
                </div>

                <CButton type="submit" color="primary" className="w-100">
                  Submit
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default CreateComplaint
