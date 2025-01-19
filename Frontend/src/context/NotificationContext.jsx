import { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('/api/v1/notifications/admin-notifications', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error('Failed to fetch notifications:', await response.json());
      }
    } catch (error) {
      console.error('Error fetching notifications:', error.message);
    }
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen((prevState) => !prevState);
  };

  const markAsRead = async (notificationId) => {
    if (!notificationId) return;
    const token = localStorage.getItem('token');
    try {
      await fetch(`/api/v1/notifications/mark-read/${notificationId}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, status: 'read' }
            : notification
        )
      );
    } catch (error) {
      console.error('Error updating notification status:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        isNotificationsOpen,
        toggleNotifications,
        markAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};