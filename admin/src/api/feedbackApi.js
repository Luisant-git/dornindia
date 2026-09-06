import config from '../config.js';

const API_URL = `${config.API_BASE_URL}/feedbacks`;

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('access_token')}`
});

export const feedbackApi = {
  getAll: async () => {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch feedback');
    return response.json();
  },

  create: async (data) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create feedback');
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update feedback');
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete feedback');
    return response.json();
  },
};
