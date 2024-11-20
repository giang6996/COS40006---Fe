import React, { useState, useEffect } from 'react';
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
  CPagination,
  CPaginationItem,
  CAlert,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../services/authService';
import Page404 from '../pages/page404/Page404';
import api from '../../services/api';

const ITEMS_PER_PAGE = 10;

const ProfileList = () => {
  const navigate = useNavigate();
  const [residents, setResidents] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [filters, setFilters] = useState({
    searchTerm: '',
    buildingBlock: '',
    dateFilter: '',
  });
  const [showRequestedAccounts, setShowRequestedAccounts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);

    if (role === 'Admin') {
      const fetchResidents = async () => {
        try {
          const response = await api.get('/account/list');
          setResidents(response.data);
        } catch (error) {
          setError('Failed to fetch residents.');
          console.error(error);
        }
      };

      fetchResidents();
    }
  }, []);

  const handleViewProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Filter residents based on search term, building block, date, and requested accounts status
  const filteredResidents = residents.filter((resident) => {
    const { searchTerm, buildingBlock, dateFilter } = filters;
    const matchesRequestedStatus = !showRequestedAccounts || resident.status === 'Pending';
    
    return (
      resident.firstName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (buildingBlock ? resident.buildingBlock === buildingBlock : true) &&
      matchesRequestedStatus
    );
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredResidents.length / ITEMS_PER_PAGE);
  const currentResidents = filteredResidents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (userRole !== 'Admin') {
    return <Page404 />;
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

              {/* Requested Accounts Button */}
              <CButton
                color={showRequestedAccounts ? 'warning' : 'primary'}
                className="mb-3"
                onClick={() => setShowRequestedAccounts(!showRequestedAccounts)}
              >
                {showRequestedAccounts ? 'Show All Accounts' : 'View Requested Accounts'}
              </CButton>

              {error && <CAlert color="danger">{error}</CAlert>}

              {/* Resident/User Table */}
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Role</CTableHeaderCell>
                    <CTableHeaderCell>Apartment</CTableHeaderCell>
                    <CTableHeaderCell>Building</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentResidents.map((resident) => (
                    <CTableRow key={resident.id}>
                      <CTableDataCell>{resident.id}</CTableDataCell>
                      <CTableDataCell>{resident.firstName} {resident.lastName}</CTableDataCell>
                      <CTableDataCell>{resident.roles}</CTableDataCell>
                      <CTableDataCell>{resident.apartment || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{resident.building || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{resident.status}</CTableDataCell>
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

              {/* Pagination controls */}
              <CPagination align="center" className="mt-4">
                <CPaginationItem
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </CPaginationItem>
                {[...Array(totalPages).keys()].map((number) => (
                  <CPaginationItem
                    key={number + 1}
                    active={currentPage === number + 1}
                    onClick={() => handlePageChange(number + 1)}
                  >
                    {number + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </CPaginationItem>
              </CPagination>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ProfileList;
