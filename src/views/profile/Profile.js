import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CImage,
  CListGroup,
  CListGroupItem,
  CCardHeader,
  CBadge
} from '@coreui/react'
import { getUserRole } from '../../services/authService'
import api from '../../services/api'
import avatar8 from '../../assets/images/avatars/8.jpg'
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const { accountId } = useParams()
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [userRole, setUserRole] = useState('User')
  const [searchedAccountRole, setSearchedAccountRole] = useState('User')
  const [isOwnAccount, setIsOwnAccount] = useState(false)

  useEffect(() => {
    const role = getUserRole()
    setUserRole(role)

    const fetchProfile = async () => {
      try {
        const response = await api.get(`/account/profile${accountId ? `?accountId=${accountId}` : ''}`)
        if (response.data.roles && response.data.roles.includes('Admin')) {
          setSearchedAccountRole('Admin')
        } else {
          setSearchedAccountRole('User')
        }
        setProfile(response.data)

        const token = localStorage.getItem('accessToken');
        if (token) {
          const decodedToken = jwtDecode(token);
          const loggedInAccountId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
          setIsOwnAccount(loggedInAccountId === accountId);
        }

      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }

    fetchProfile()
  }, [accountId])

  const handleAccountStatusUpdate = async (status) => {
    try {
      await api.post(`/resident/update-account-status`, {
        accountId: accountId,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        }
      },
    )
      alert(`Account has been accepted}.`)
      navigate('/profileList')
    } catch (error) {
      console.error(`Failed to update account status to ${status}:`, error)
    }
  }

  const handleAccountDelete = async () => {
    try {
        await api.delete('/resident/delete-account', {
            data: { accountId: accountId },
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            withCredentials: true,
        });
        alert('Account deleted successfully');
        navigate('/profileList');
    } catch (error) {
        console.error('Failed to delete account:', error);
    }
  };

  const handleDocumentDownload = async (documentLink) => {
    try {
      const encodedDocumentLink = encodeURIComponent(documentLink);
      const url = `https://localhost:7205/api/resident/download-document/${encodedDocumentLink}`;
  
      // Make a GET request with the authorization token
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Adjust if token is stored differently
        },
        responseType: 'blob', // Ensures that the response is treated as a binary file (for download)
      });
  
      // Create a download link for the file
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = documentLink.split('/').pop(); // Extracts the file name from the document link
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Failed to download document:', error);
      alert('Failed to download document.');
    }
  };
  
  const handleAccountUpdate = (accountId) => {
    return navigate(`/edit/${accountId}`)
  }

  const handleResetPassword = () => {
    navigate(`/resetPassword`);
};

  if (!profile) {
    return <div>Loading...</div>
  }

  const renderProfileContent = () => {
    const isPendingResidentViewedByAdmin =
      userRole === 'Admin' &&
      searchedAccountRole === 'User' &&
      profile.status === 'Pending'

    return (
      <CContainer fluid className="profile-page-container mt-4">
        <CRow className="justify-content-center">
          <CCol lg={10}>
            <h2 className="mb-4">User Profile Information</h2>
            <CCard className="mb-4">
              <CCardBody>
                <CRow>
                  <CCol md={3} className="text-center">
                    <CImage
                      rounded
                      src={avatar8}
                      alt="Profile Picture"
                      width={150}
                      height={150}
                      className="mb-3"
                    />
                  </CCol>
                  <CCol md={6}>
                    <h5>Name: {profile.firstName} {profile.lastName}</h5>
                    <p>Email: {profile.email}</p>
                    <p>Phone Number: {profile.phoneNumber}</p>
                    <p>Role: {profile.roles?.join(', ') || 'N/A'}</p> {/* Displaying role(s) here */}
                    <p>Status: {profile.status}</p>
                  </CCol>
                  <CCol md={3} className="d-flex flex-column align-items-end">
                    {isPendingResidentViewedByAdmin ? (
                      <>
                        <CButton
                          color="success"
                          className="mb-3 w-100"
                          onClick={() => handleAccountStatusUpdate('Active')}
                        >
                          Accept Account
                        </CButton>
                        <CButton
                          color="danger"
                          className="w-100"
                          onClick={() => handleAccountDelete()}
                        >
                          Reject Account
                        </CButton>
                      </>
                    ) : (
                      <>
                        <CButton color="primary" className="mb-3 w-100" onClick={() => handleAccountUpdate(profile.id)}>
                          Edit Profile
                        </CButton>
                        
                        <CButton color="secondary" className="mb-3 w-100" onClick={() => handleResetPassword()}>
                          Reset Password
                        </CButton>

                        {searchedAccountRole === 'User' && userRole === 'Admin' && (
                        <CButton
                          color="danger"
                          className="w-100"
                          onClick={() => handleAccountDelete()}
                        >
                          Delete Account
                        </CButton>
                        )}
                      </>
                    )}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
            {searchedAccountRole === 'User' && (
              <>
                <CCard>
                  <CCardHeader>Apartment Information</CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol>
                        <CListGroup>
                          <CListGroupItem className="d-flex justify-content-between">
                            <span>Apartment</span> <strong>{profile.apartment || 'N/A'}</strong>
                          </CListGroupItem>
                          <CListGroupItem className="d-flex justify-content-between">
                            <span>Building:</span> <strong>{profile.building || 'N/A'}</strong>
                          </CListGroupItem>
                        </CListGroup>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
                <CCard>
                <CCardHeader>Documents</CCardHeader>
                <CCardBody>
                    <CListGroup>
                      {profile.documents?.map((doc, index) => (
                        <CListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                          <div>
                            <strong>{doc.name}</strong> - {doc.documentDesc || 'No Description'}
                            {/* <CBadge color={doc.status === 'Pending' ? 'warning' : 'success'} className="ms-2">
                              {doc.status}
                            </CBadge> */}
                          </div>
                          <CButton
                            color="primary"
                            onClick={() => handleDocumentDownload(doc.documentLink)}
                          >
                            Download
                          </CButton>
                        </CListGroupItem>
                      ))}
                    </CListGroup>
                  </CCardBody>
              </CCard>
            </>
            )}
          </CCol>
        </CRow>
      </CContainer>
    )
  }

  return renderProfileContent()
}

export default ProfilePage
