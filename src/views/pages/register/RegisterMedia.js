import React from 'react';
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
} from '@coreui/react';

const RegisterMedia = () => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid className="signup-container">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="signup-card">
              <CCardBody>
                <h2 className="text-center mb-4">Resident Apartment & Paper</h2>
                <CForm>
                  <CRow>
                    {/* Left Column for Apartment Information */}
                    <CCol md={6}>
                      <h5 className="mb-3">Apartment Information</h5>
                      <CFormInput
                        type="text"
                        id="Apartment"
                        placeholder="Apartment Name"
                        className="mb-3"
                      />
                      <CFormInput
                        type="text"
                        id="apartmentNumber"
                        placeholder="Apartment Number"
                        className="mb-3"
                      />
                      <CFormSelect 
                        aria-label="Apartment Type"
                        className="mb-3"
                        options={[
                          'Apartment Type',
                          { label: 'One', value: '1' },
                          { label: 'Two', value: '2' },
                          { label: 'Three', value: '3', disabled: true },
                        ]}
                      />
                    </CCol>

                    {/* Right Column for Required Papers */}
                    <CCol md={6}>
                      <h5 className="mb-3">Required Paper</h5>
                      <div className="mb-3">
                        <label className="form-label">
                          Copy of Household Registration Book <span className="text-danger">*</span>
                        </label>
                        <CFormInput type="file" id="householdRegistration" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Copy of Apartment Contract <span className="text-danger">*</span>
                        </label>
                        <CFormInput type="file" id="apartmentContract" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Identification Card <span className="text-danger">*</span>
                        </label>
                        <CFormInput type="file" id="idCard" />
                      </div>
                    </CCol>
                  </CRow>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between mt-4">
                    <CButton color="secondary">Back</CButton>
                    <CButton color="primary">Register</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default RegisterMedia