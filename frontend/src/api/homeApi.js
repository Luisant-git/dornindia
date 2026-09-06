import config from '../config.js';

const API_URL = config.API_BASE_URL;

const normalize = (data, limit) => {
  if (!data) return [];
  const list = Array.isArray(data) ? data : (data.items || []);
  return list.slice(0, limit);
};

export const homeApi = {
  getLatestClasses: async (limit = 3) => {
    const response = await fetch(`${API_URL}/classes?limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch classes');
    return normalize(await response.json(), limit);
  },

  getLatestTutorials: async (limit = 4) => {
    const response = await fetch(`${API_URL}/tutorials?limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch tutorials');
    return normalize(await response.json(), limit);
  },

  getTestimonials: async (limit = 3) => {
    const response = await fetch(`${API_URL}/feedbacks?limit=${limit}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch feedbacks');
    return normalize(await response.json(), limit);
  },
};
