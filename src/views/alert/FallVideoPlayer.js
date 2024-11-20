import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  CContainer,
  CCard,
  CCardBody,
  CButton,
} from '@coreui/react';

const FallVideoPlayer = () => {
  const { filename } = useParams();
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    setVideoUrl(`http://localhost:5000/video/${filename}`);
  }, [filename]);

  return (
    <CContainer fluid className="mt-4">
      <CCard>
        <CCardBody>
          <h4>Fall Detection Video</h4>
          {videoUrl ? (
            <video controls width="100%">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <p>Loading video...</p>
          )}
          <CButton color="secondary" onClick={() => window.history.back()} className="mt-3">
            Go Back
          </CButton>
        </CCardBody>
      </CCard>
    </CContainer>
  );
};

export default FallVideoPlayer;
