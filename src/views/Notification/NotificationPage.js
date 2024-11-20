import React, { useContext } from 'react';
import { NotificationContext } from '../../context/NotificationContext';
import { CContainer, CListGroup, CListGroupItem } from '@coreui/react';

const NotificationsPage = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <CContainer className="mt-4">
      <h2>Notifications</h2>
      <CListGroup>
        {notifications.map((notif, index) => (
          <CListGroupItem key={index}>
            <strong>{notif.message}</strong><br />
            <small>{new Date(notif.timestamp).toLocaleString()}</small>
          </CListGroupItem>
        ))}
      </CListGroup>
    </CContainer>
  );
};

export default NotificationsPage;
