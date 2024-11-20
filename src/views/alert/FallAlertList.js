import React, { useEffect, useState, useRef } from 'react';
import {
    CContainer,
    CRow,
    CCol,
    CCard,
    CCardBody,
    CButton,
    CBadge,
    CSpinner,
    CAlert,
    CPagination,
    CPaginationItem
} from '@coreui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const SERVER_URL = 'http://localhost:5000';
const ITEMS_PER_PAGE = 6;

const FallAlertList = () => {
    const [alerts, setAlerts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const alertRefs = useRef({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${SERVER_URL}/metadata`);
                if (!response.ok) throw new Error("Failed to fetch metadata");
                const data = await response.json();
                
                // Sort alerts by date and time in descending order
                const sortedData = data.sort((a, b) => {
                    const dateA = new Date(`${a.date}T${a.time}`);
                    const dateB = new Date(`${b.date}T${b.time}`);
                    return dateB - dateA;
                });

                setAlerts(sortedData);
            } catch (err) {
                setError("Could not load fall detection alerts.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const alertId = location.state?.alertId;
        if (alertId && alertRefs.current[alertId] instanceof HTMLElement) {
            alertRefs.current[alertId].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [location.state, alerts]);

    // Calculate the current alerts to display based on the current page
    const indexOfLastAlert = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstAlert = indexOfLastAlert - ITEMS_PER_PAGE;
    const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);
    const totalPages = Math.ceil(alerts.length / ITEMS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    if (loading) return <CSpinner color="primary" />;

    return (
        <CContainer fluid className="mt-4">
            <h2 className="mb-4">Fall Detection Alerts</h2>
            {error && <CAlert color="danger">{error}</CAlert>}

            <CRow>
                {currentAlerts.length > 0 ? (
                    currentAlerts.map(alert => (
                        <CCol md={4} className="mb-4" key={alert.id}>
                            <CCard ref={el => alertRefs.current[alert.id] = el} className="h-100 d-flex flex-column">
                                <CCardBody className="d-flex flex-column">
                                    <h5>{alert.alertMessage}</h5>
                                    <p><strong>Date:</strong> {alert.date}</p>
                                    <p><strong>Time:</strong> {alert.time}</p>
                                    <p><strong>Camera:</strong> {alert.cameraId}</p>
                                    <p><strong>Location:</strong> {alert.location}</p>
                                    <CBadge color="danger" className="mb-2 py-2">Fall Detected</CBadge>
                                    <div className="mt-auto text-center">
                                        <CButton
                                            color="primary"
                                            onClick={() => navigate(`/video/${alert.attached[0]}`)}
                                            target="_blank"
                                            className="mt-2"
                                        >
                                            View Video
                                        </CButton>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCol>
                    ))
                ) : (
                    <CCol>
                        <CAlert color="info">No fall alerts available.</CAlert>
                    </CCol>
                )}
            </CRow>

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
        </CContainer>
    );
};

export default FallAlertList;
