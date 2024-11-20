import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import {
  CButton,
  CForm,
  CFormInput,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
} from '@coreui/react';

const UpdateProfile = () => {
  const { accountId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/account/profile?accountId=${accountId}`);
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, [accountId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/resident/update-profile', profile, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Ensure access token is sent in the header
        },
      });
      alert('Profile updated successfully');
      navigate(`/profile/${accountId}`);
    } catch (error) {
      console.error('Failed to update profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <CContainer fluid className="mt-4">
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CCard>
            <CCardHeader>
              <h2 className="text-center mb-4">Update Profile</h2>
            </CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
              <h6>Phone number</h6>
                <CFormInput
                  type="tel"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  className="mb-3"
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <CButton type="submit" color="primary" className="w-100 mb-3">
                  Update Profile
                </CButton>
                <CButton color="secondary" className="w-100" onClick={() => navigate(`/profile/${accountId}`)}>
                  Cancel
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default UpdateProfile;
