import config from '../config.js';

const API_URL = `${config.API_BASE_URL}/upload`;

export const uploadApi = {
  uploadImage: async (file) => {
    const body = new FormData();
    body.append('image', file);
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` },
      body
    });
    if (!response.ok) throw new Error('Failed to upload image');
    const { url } = await response.json();
    return url;
  }
};
