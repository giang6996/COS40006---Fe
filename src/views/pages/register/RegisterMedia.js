import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CForm, CFormInput, CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react'
import api from '../../../services/api'

const RegisterMedia = () => {
  const [buildings, setBuildings] = useState([])
  const [apartments, setApartments] = useState([])
  const [filteredBuildings, setFilteredBuildings] = useState([])
  const [filteredApartments, setFilteredApartments] = useState([])
  const [selectedBuilding, setSelectedBuilding] = useState('')
  const [selectedBuildingId, setSelectedBuildingId] = useState(null)
  const [selectedApartment, setSelectedApartment] = useState('')
  const [selectedApartmentId, setSelectedApartmentId] = useState(null)
  const [buildingDropdownVisible, setBuildingDropdownVisible] = useState(false)
  const [apartmentDropdownVisible, setApartmentDropdownVisible] = useState(false)
  const [document1, setDocument1] = useState(null)
  const [document2, setDocument2] = useState(null)
  const [document3, setDocument3] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const savedData = localStorage.getItem('partialRegistrationData')
    if (savedData) {
      setUserData(JSON.parse(savedData))
    } else {
      navigate('/registerInfo')
    }
  }, [navigate])

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await api.get('/building/search-buildings', { params: { query: '' } })
        setBuildings(response.data)
      } catch (error) {
        console.error('Failed to fetch buildings:', error)
      }
    }
    fetchBuildings()
  }, [])

  const fetchApartments = async (buildingId) => {
    try {
      const response = await api.get('/building/search-apartments', { params: { buildingId, query: '' } })
      setApartments(response.data)
    } catch (error) {
      console.error('Failed to fetch apartments:', error)
    }
  }

  const handleBuildingChange = (e) => {
    const inputBuilding = e.target.value
    setSelectedBuilding(inputBuilding)
    const filtered = buildings.filter(building =>
      `${building.buildingName} - ${building.buildingAddress}`.toLowerCase().includes(inputBuilding.toLowerCase())
    )
    setFilteredBuildings(filtered)
    const building = buildings.find(b => `${b.buildingName} - ${b.buildingAddress}`.toLowerCase() === inputBuilding.toLowerCase())
    console.log(building)

    if (building) {
      fetchApartments(building.id)
      setSelectedBuildingId(building.id) // Set building ID
    } else {
      setApartments([])
      setSelectedBuildingId(null) // Clear building ID if not valid
    }
  }

  const handleApartmentChange = (e) => {
    const inputApartment = e.target.value
    setSelectedApartment(inputApartment)
    const filtered = apartments.filter(apartment =>
      `${apartment.roomNumber}`.toLowerCase().includes(inputApartment.toLowerCase())
    )
    setFilteredApartments(filtered)
    const apartment = apartments.find(a => `${a.roomNumber}`.toLowerCase() === inputApartment.toLowerCase())
    console.log(apartment)

    if (apartment) {
      setSelectedApartmentId(apartment.id) // Set apartment ID
    } else {
      setSelectedApartmentId(null) // Clear apartment ID if not valid
    }
  }

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(`${building.buildingName} - ${building.buildingAddress}`)
    setSelectedBuildingId(building.id)
    fetchApartments(building.id)
    setBuildingDropdownVisible(false)
  }

  const handleApartmentSelect = (apartment) => {
    setSelectedApartment(`Room ${apartment.roomNumber}`)
    setSelectedApartmentId(apartment.id)
    setApartmentDropdownVisible(false)
  }


  const handleRegister = async (e) => {
    e.preventDefault()
    if (!document1 || !document2 || !document3) {
      setError('Please upload exactly three documents.')
      return
    }
    const formData = new FormData()
    formData.append('firstName', userData.firstName)
    formData.append('lastName', userData.lastName)
    formData.append('email', userData.email)
    formData.append('phoneNumber', userData.phoneNumber)
    formData.append('password', userData.password)

    if (!selectedBuildingId || !selectedApartmentId) {
      setError('Invalid building or apartment. Please choose valid options.')
      return
    }

    formData.append('buildingId', selectedBuildingId)
    formData.append('apartmentId', selectedApartmentId)

    formData.append('documents', document1)
    formData.append('documents', document2)
    formData.append('documents', document3)

    try {
      await api.post('/auth/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
      localStorage.removeItem('partialRegistrationData')
      navigate('/login')
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer fluid className="signup-container">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCard className="signup-card">
              <CCardBody>
                <h2 className="text-center mb-4">Resident Apartment & Paper</h2>
                <CForm onSubmit={handleRegister}>
                  <CRow>
                    <CCol md={6}>
                      <h5 className="mb-3">Apartment Information</h5>
                      <CFormInput
                        type="text"
                        placeholder="Enter Building Name and Address"
                        value={selectedBuilding}
                        onChange={handleBuildingChange}
                        onFocus={() => setBuildingDropdownVisible(true)}
                        onBlur={() => setTimeout(() => setBuildingDropdownVisible(false), 150)}
                        className="mb-3"
                      />
                      {buildingDropdownVisible && filteredBuildings.length > 0 && (
                        <ul className="dropdown-menu show" style={{ display: 'block' }}>
                          {filteredBuildings.map((building) => (
                            <li
                              key={building.id}
                              onClick={() => handleBuildingSelect(building)}
                              className="dropdown-item"
                            >
                              {building.buildingName} - {building.buildingAddress}
                            </li>
                          ))}
                        </ul>
                      )}

                      <CFormInput
                        type="text"
                        placeholder="Enter Apartment Room Number"
                        value={selectedApartment}
                        onChange={handleApartmentChange}
                        onFocus={() => setApartmentDropdownVisible(true)}
                        onBlur={() => setTimeout(() => setApartmentDropdownVisible(false), 150)}
                        className="mb-3"
                      />
                      {apartmentDropdownVisible && filteredApartments.length > 0 && (
                        <ul className="dropdown-menu show" style={{ display: 'block' }}>
                          {filteredApartments.map((apartment) => (
                            <li
                              key={apartment.id}
                              onClick={() => handleApartmentSelect(apartment)}
                              className="dropdown-item"
                              data-testid="BDrop"
                            >
                              Room {apartment.roomNumber}
                            </li>
                          ))}
                        </ul>
                      )}
                    </CCol>
                    <CCol md={6}>
                      <h5 className="mb-3">Required Documents</h5>
                      <CFormInput
                        type="file"
                        data-testid="file-input"
                        onChange={(e) => setDocument1(e.target.files[0])}
                        className="mb-3"
                      />
                      <CFormInput
                        type="file"
                        data-testid="file-input"
                        onChange={(e) => setDocument2(e.target.files[0])}
                        className="mb-3"
                      />
                      <CFormInput
                        type="file"
                        data-testid="file-input"
                        onChange={(e) => setDocument3(e.target.files[0])}
                        className="mb-3"
                      />
                      {/* <p className="text-danger">{error}</p> */}
                    </CCol>
                  </CRow>
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                  <div className="d-flex justify-content-between mt-4">
                    <CButton type="button" color="secondary" onClick={() => navigate('/registerInfo')}>
                      Back
                    </CButton>
                    <CButton type="submit" color="primary">Register</CButton>
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
