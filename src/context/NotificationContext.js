// NotificationContext.js
import React, { createContext, useState, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Load notifications from localStorage
    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(savedNotifications);
    setUnreadCount(savedNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    // Save notifications to localStorage whenever they change
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7205/api/fail-detection-hub") // Adjust the URL as needed
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.on("ReceiveMessage", (message) => {
      const newNotification = JSON.parse(message);
      setNotifications((prev) => [{ ...newNotification, read: false, alertId: newNotification.id }, ...prev]);
      setUnreadCount((prev) => prev + 1);

      console.log(newNotification);
      
    });

    connection.start().catch((err) => console.error(err.toString()));

    return () => {
      connection.stop();
    };
  }, []);

  const markAllAsRead = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('notifications'); // Clear notifications from localStorage
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};
