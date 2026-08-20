export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Request transport will be enabled when the backend API is ready.
export async function apiRequest(endpoint, options = {}) {
  void endpoint
  void options
  throw new Error('Backend API requests are not connected yet.')
}
