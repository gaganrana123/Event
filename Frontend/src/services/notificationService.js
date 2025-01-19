import axios from 'axios';

const API_BASE_URL = '/api/v1/notifications';

// Fetch notifications for a specific user
export const getNotifications = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Mark a notification as read
export const markAsRead = async (notificationId) => {
  try {
    await axios.put(`${API_BASE_URL}/${notificationId}/read`);
  } catch (error) {
    console.error("Error marking notification as read:", error);
  }
};