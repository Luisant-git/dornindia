import config from '../config.js';

const API_URL = config.API_BASE_URL;

export const directoryApi = {
  getTherapists: async ({ page = 1, limit = 10, search = '', batch = 'all', year = 'all' } = {}) => {
    let url = `${API_URL}/therapists?page=${page}&limit=${limit}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (batch && batch !== 'all') url += `&batch=${encodeURIComponent(batch)}`;
    if (year && year !== 'all') url += `&year=${encodeURIComponent(year)}`;

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch therapists');
    return await response.json();
  },

  getFilters: async () => {
    const response = await fetch(`${API_URL}/therapists/filters`, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to fetch filters');
    return await response.json();
  },
};
