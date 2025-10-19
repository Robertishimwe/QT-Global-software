export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  ENDPOINTS: {
    USERS: '/users',
    USERS_EXPORT: '/users/export',
    USERS_STATS: '/users/stats/creations-by-day',
  },
  TIMEOUT: 30000, // 30 seconds
} as const;
