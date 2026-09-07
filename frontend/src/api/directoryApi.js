import config from '../config.js';

const API_URL = config.API_BASE_URL;

export const directoryApi = {
  getAllTherapists: async (limit = 2000) => {
    const response = await fetch(`${API_URL}/therapists?limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch therapists');
    const data = await response.json();
    return Array.isArray(data) ? data : data.items || [];
  },
};
