import React from 'react'
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

const CreateComplaint = () => {
  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol md={8} className="offset-md-2">
          <CCard>
            <CCardBody>
              <h5>Create new requests / complaints</h5>
              <CForm>
                {/* Title */}
                <CFormInput
                  type="text"
                  id="title"
                  placeholder="Title..."
                  className="mb-4"
                />

                {/* Labels and Type */}
                <CRow className="mb-4">
                  <CCol md={6}>
                    <h6>Label</h6>
                    <CFormCheck inline id="security" label="Security" />
                    <CFormCheck inline id="services" label="Services" />
                    <CFormCheck inline id="resident" label="Resident" />
                    <CFormCheck inline id="others" label="Others" />
                  </CCol>
                  <CCol md={6}>
                    <h6>Type</h6>
                    <CFormCheck inline id="request" label="Request" />
                    <CFormCheck inline id="complaint" label="Complaint" />
                  </CCol>
                </CRow>

                {/* Detailed Description */}
                <CFormTextarea
                  id="description"
                  rows="5"
                  placeholder="Detailed description"
                  className="mb-4"
                ></CFormTextarea>

                {/* Media Upload */}
                <div className="mb-4">
                  <h6>Related media</h6>
                  <CFormInput type="file" id="upload-media" />
                </div>

                {/* Submit Button */}
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
