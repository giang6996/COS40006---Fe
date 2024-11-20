import React, { useState, useEffect } from 'react';
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
  CPagination,
  CPaginationItem,
  CAlert,
  CSpinner
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../../services/authService';
import api from '../../services/api';
import Page404 from '../pages/page404/Page404';

const ITEMS_PER_PAGE = 5;

const Complaint = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [filters, setFilters] = useState({
    status: 'all',     // "all", "not-completed", "completed"
    label: [],         // ["security", "services", "resident", "others"]
    type: []           // ["request", "complaint"]
  });

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);

    if (role === 'Admin') {
      fetchComplaints();
    } else {
      fetchUserComplaints();
    }
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get('/form/get-all');
      setComplaints(response.data);
    } catch (error) {
      setError('Failed to fetch complaints.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserComplaints = async () => {
    try {
      const response = await api.get('/form/get-all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      setComplaints(response.data);
    } catch (error) {
      setError('Failed to fetch user complaints.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [complaints, filters, searchTerm]);

  const applyFilters = () => {
    let filtered = [...complaints];

    // Filter by status
    if (filters.status === 'completed') {
      filtered = filtered.filter(complaint => complaint.status === 'Completed');
    } else if (filters.status === 'not-completed') {
      filtered = filtered.filter(complaint => complaint.status !== 'Completed');
    }

    // Filter by label
    if (filters.label.length > 0) {
      filtered = filtered.filter(complaint => filters.label.includes(complaint.label.toLowerCase()));
    }

    // Filter by type
    if (filters.type.length > 0) {
      filtered = filtered.filter(complaint => filters.type.includes(complaint.type.toLowerCase()));
    }

    if (searchTerm != '') {
      filtered = filtered.filter(complaint =>
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredComplaints(filtered);
    setCurrentPage(1); // Reset to the first page after applying filters
  };

  const handleFilterChange = (e, category) => {
    const { id, checked } = e.target;

    if (category === 'status') {
      setFilters(prev => ({ ...prev, status: checked ? id : 'all' }));
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: checked
          ? [...prev[category], id]
          : prev[category].filter(item => item !== id)
      }));
    }
  };

  const handleComplaintClick = (id) => {
    navigate(`/complaints/detail/${id}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    applyFilters(); // Apply filters every time search term changes
  };

  if (userRole !== 'Admin' && userRole !== 'User') {
    return <Page404 />;
  }

  // Calculate current complaints for pagination
  const indexOfLastComplaint = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstComplaint = indexOfLastComplaint - ITEMS_PER_PAGE;
  const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
  const totalPages = Math.ceil(filteredComplaints.length / ITEMS_PER_PAGE);

  if (loading) return <CSpinner color="primary" />;

  return (
    <CContainer fluid className="mt-4">
      <CRow>
        <CCol md={3}>
          {/* Sidebar Filter */}
          <CCard>
            <CCardBody>
              {userRole !== 'Admin' && (
                <CButton
                  color="primary"
                  className="mb-4 w-100"
                  onClick={() => navigate('/complaints/new')}
                >
                  Create New...
                </CButton>
              )}
              <CButton color="info" className="w-100 mt-3 mb-3" onClick={applyFilters}>
                Apply Filters
              </CButton>
              <h6>Requests / Complaints</h6>
              <CListGroup className="mb-3">
                <CListGroupItem>
                  <CFormCheck
                    id="all"
                    label="All"
                    checked={filters.status === 'all'}
                    onChange={(e) => handleFilterChange(e, 'status')}
                  />
                </CListGroupItem>
                <CListGroupItem>
                  <CFormCheck
                    id="not-completed"
                    label="Not completed"
                    checked={filters.status === 'not-completed'}
                    onChange={(e) => handleFilterChange(e, 'status')}
                  />
                </CListGroupItem>
                <CListGroupItem>
                  <CFormCheck
                    id="completed"
                    label="Completed"
                    checked={filters.status === 'completed'}
                    onChange={(e) => handleFilterChange(e, 'status')}
                  />
                </CListGroupItem>
              </CListGroup>

              <h6>Label</h6>
              <CListGroup className="mb-3">
                {['security', 'services', 'resident', 'other'].map(label => (
                  <CListGroupItem key={label}>
                    <CFormCheck
                      id={label}
                      label={label.charAt(0).toUpperCase() + label.slice(1)}
                      checked={filters.label.includes(label)}
                      onChange={(e) => handleFilterChange(e, 'label')}
                    />
                  </CListGroupItem>
                ))}
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
                <CFormInput
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>

              {error && <CAlert color="danger">{error}</CAlert>}

              <CListGroup>
                {currentComplaints.map((complaint) => (
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

export default Complaint;
