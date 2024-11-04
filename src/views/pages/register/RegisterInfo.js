import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../../services/authService';
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

const RegisterInfo = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };

    try {
      await signup(user);
      navigate('/dashboard'); // Redirect after successful signup
    } catch (error) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid className="signup-container">
      <CRow className="justify-content-center">
        <CCol md={4}>
          <CCard>
            <CCardBody>
              <h2 className="mb-4 text-center">Sign Up</h2>
              <CForm onSubmit={handleSignup}>
                <CFormInput
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mb-3"
                />
                <CFormInput
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mb-3"
                />
                <CFormInput
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                />
                <CFormInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-3"
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <CButton type="submit" color="primary" className="w-100">
                  Sign Up
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
    </div>
  )
}

export default RegisterInfo
