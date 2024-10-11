import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

const ResidentList = () => {
  const navigate = useNavigate()

  const handleViewProfile = (id) => {
    // navigate(`/residents/${id}`) // Navigate to the resident's profile page
    navigate(`/profile/detail`) // Navigate to the resident's profile page
  }

  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol>
          <h4 className="mb-4">Resident List</h4>
          <CCard>
            <CCardBody>
              {/* Search Bar */}
              <CInputGroup className="mb-4">
                <CFormInput placeholder="Search request and complaint" />
                <CInputGroupText>
                  <i className="cil-search"></i>
                </CInputGroupText>
              </CInputGroup>

              {/* Filters */}
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormSelect aria-label="Filter by Date">
                    <option>Date</option>
                    <option value="1">Ascending</option>
                    <option value="2">Descending</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormSelect aria-label="Filter by Building Block">
                    <option>Building Block</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormSelect aria-label="Filter by Date Joined">
                    <option>Date Joined</option>
                    <option value="1">Newest First</option>
                    <option value="2">Oldest First</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CButton color="secondary" className="w-100">
                    Reset Filter
                  </CButton>
                </CCol>
              </CRow>

              {/* Resident Table */}
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Room Number</CTableHeaderCell>
                    <CTableHeaderCell>Date Joined</CTableHeaderCell>
                    <CTableHeaderCell>Building Block</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {/* Sample data, replace this with dynamic data */}
                  <CTableRow>
                    <CTableDataCell>00001</CTableDataCell>
                    <CTableDataCell>Christine Brooks</CTableDataCell>
                    <CTableDataCell>A1919</CTableDataCell>
                    <CTableDataCell>04 Sep 2019</CTableDataCell>
                    <CTableDataCell>A</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        onClick={() => handleViewProfile(1)}
                      >
                        View Profile
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                  <CTableRow>
                    <CTableDataCell>00002</CTableDataCell>
                    <CTableDataCell>Rosie Pearson</CTableDataCell>
                    <CTableDataCell>A1912</CTableDataCell>
                    <CTableDataCell>28 May 2019</CTableDataCell>
                    <CTableDataCell>A</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="primary"
                        onClick={() => handleViewProfile(2)}
                      >
                        View Profile
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                  {/* Add more rows here */}
                </CTableBody>
              </CTable>

              {/* Pagination can be added here if needed */}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ResidentList
