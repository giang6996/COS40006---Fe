import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, getUserProfile } from '../../../services/authService';
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
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate(`/registerInfo`) // Redirects to the Profile page
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);

      const accountId = getUserProfile()

      navigate(`/profile/${accountId}`); // Redirect on successful login
    } catch (error) {
      
      if (error.response && error.response.data && error.response.data.message) {
        const errorMessage = error.response.data.message;

        // Set the error message based on specific backend messages
        if (errorMessage === "Account not found.") {
          setError("No account found with the provided email.");
        } else if (errorMessage === "Incorrect password.") {
          setError("The password you entered is incorrect.");
        } else if (errorMessage === "Account is not actived") {
          setError("Your account is not activated. Please contact support.");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      } else {
        setError("Login failed. Please try again later.");
      }
      console.error("Login error:", error);
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid className="login-container">
      <CRow className="justify-content-center">
        <CCol md={4}>
          <CCard className="login-card">
            <CCardBody>
              <h2 className="text-center mb-4">Login to Account</h2>
              <CForm onSubmit={handleLogin}>
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <input type="checkbox" id="rememberMe" />
                    <label htmlFor="rememberMe" className="ms-2">
                      Remember Password
                    </label>
                  </div>
                  <a href="#" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </div>
                <CButton type="submit" color="primary" className="w-100 mb-3">
                  Sign In
                </CButton>
                <CButton
                  onClick={handleRegister}
                  color="link"
                  className="text-center text-decoration-none w-100"
                >
                  Don’t have an account? Click here to Sign Up.
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

export default Login
