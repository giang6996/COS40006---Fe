import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CButton,
  CForm,
  CFormInput,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
} from '@coreui/react';
import api from '../../../services/api';
import { jwtDecode } from "jwt-decode";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    
  const handleResetPassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('accessToken');
    const decodedToken = jwtDecode(token);
    const loggedInAccountId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      await api.put('/account/reset-password', 
      { oldPassword, newPassword, confirmPassword }, 
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      });
      alert('Password reset successfully');
      navigate(`/profile/${loggedInAccountId}`);
    } catch (error) {
      console.error('Failed to reset password:', error);
      setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <CContainer fluid className="reset-password-container mt-4">
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CCard>
            <CCardBody>
              <h2 className="mb-4">Reset Password</h2>
              <CForm onSubmit={handleResetPassword}>
                <CFormInput
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="mb-3"
                />
                <CFormInput
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mb-3"
                />
                <CFormInput
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mb-3"
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <CButton type="submit" color="primary" className="w-100">
                  Reset Password
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default ResetPassword;
