import config from '../config.js';

const API_URL = `${config.API_BASE_URL}/feedback`;

export const feedbackApi = {
  getAll: async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      },
    });
    if (!response.ok) throw new Error('Failed to fetch feedback');
    return response.json();
  },
  
  // Add other methods like create, update, delete here...
};
