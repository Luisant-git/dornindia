import config from '../config.js';

const API_URL = `${config.API_BASE_URL}/dashboard`;

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
});

export const dashboardApi = {
  getStats: async () => {
    const response = await fetch(`${API_URL}/stats`, {
      method: 'GET',
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  },
};
