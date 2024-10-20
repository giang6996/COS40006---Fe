import React, { useState, useEffect } from 'react'
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

import { getUserRole } from '../../services/authService' // Import the getUserRole function
import Page404 from '../pages/page404/Page404' // Import your 404 page
import api from '../../services/api'

const ResidentList = () => {
  const navigate = useNavigate()
  const [residents, setResidents] = useState([])  // To store the list of users
  const [userRole, setUserRole] = useState('')
  const [filters, setFilters] = useState({
    searchTerm: '',
    buildingBlock: '',
    dateFilter: '',
  })

  useEffect(() => {
    const role = getUserRole() // Get the current user's role
    setUserRole(role)

    // Only fetch residents if the user is an Admin
    if (role === 'Admin') {
      const fetchResidents = async () => {
        try {
          const response = await api.get('/account/list')  // Adjust this API endpoint as needed
          setResidents(response.data)
          console.log(response.data)
        } catch (error) {
          console.error('Failed to fetch residents:', error)
        }
      }

      fetchResidents()
    }
  }, [])

  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`)  // Navigate to the resident's profile page with their ID
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    })
  }

  const filteredResidents = residents.filter((resident) => {
    const { searchTerm, buildingBlock, dateFilter } = filters
    return (
      resident.firstName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (buildingBlock ? resident.buildingBlock === buildingBlock : true) &&
      (dateFilter === '1' ? true : true)  // You can implement more advanced filtering logic here
    )
  })

  // Render the 404 page if the user is not an Admin
  if (userRole !== 'Admin') {
    return <Page404 />
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
                <CFormInput
                  placeholder="Search by name"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                />
                <CInputGroupText>
                  <i className="cil-search"></i>
                </CInputGroupText>
              </CInputGroup>

              {/* Filters */}
              <CRow className="mb-3">
                <CCol md={3}>
                  <CFormSelect
                    name="dateFilter"
                    value={filters.dateFilter}
                    onChange={handleFilterChange}
                    aria-label="Filter by Date"
                  >
                    <option value="">Date</option>
                    <option value="1">Ascending</option>
                    <option value="2">Descending</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CFormSelect
                    name="buildingBlock"
                    value={filters.buildingBlock}
                    onChange={handleFilterChange}
                    aria-label="Filter by Building Block"
                  >
                    <option value="">Building Block</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <CButton
                    color="secondary"
                    className="w-100"
                    onClick={() => setFilters({ searchTerm: '', buildingBlock: '', dateFilter: '' })}
                  >
                    Reset Filter
                  </CButton>
                </CCol>
              </CRow>

              {/* Resident/User Table */}
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Room Number</CTableHeaderCell>
                    <CTableHeaderCell>Date Joined</CTableHeaderCell>
                    <CTableHeaderCell>Building Block</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredResidents.map((resident) => (
                    <CTableRow key={resident.id}>
                      <CTableDataCell>{resident.id}</CTableDataCell>
                      <CTableDataCell>{resident.firstName} {resident.lastName}</CTableDataCell>
                      <CTableDataCell>{resident.role}</CTableDataCell> {/* Display role */}
                      <CTableDataCell>{resident.roomNumber || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{resident.dateJoined}</CTableDataCell>
                      <CTableDataCell>{resident.buildingBlock || 'N/A'}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="primary"
                          onClick={() => handleViewProfile(resident.id)}
                        >
                          View Profile
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
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
