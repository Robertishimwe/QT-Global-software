import axios from 'axios';
import { API_CONFIG } from '@/config/api';
import type { User, UserStat } from '@/types/user';

/**
 * Axios instance with base configuration
 */
const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all users (JSON with crypto signatures)
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>(API_CONFIG.ENDPOINTS.USERS);
  return response.data;
};

/**
 * Fetch users as Protobuf binary data
 */
export const fetchUsersProtobuf = async (): Promise<ArrayBuffer> => {
  const response = await apiClient.get(API_CONFIG.ENDPOINTS.USERS_EXPORT, {
    responseType: 'arraybuffer',
    headers: {
      'Accept': 'application/x-protobuf',
    },
  });
  return response.data;
};

/**
 * Fetch user creation statistics for the last 7 days
 */
export const fetchUserStats = async (): Promise<UserStat[]> => {
  const response = await apiClient.get<UserStat[]>(API_CONFIG.ENDPOINTS.USERS_STATS);
  return response.data;
};

/**
 * Create a new user
 */
export const createUser = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.post<User>(API_CONFIG.ENDPOINTS.USERS, userData);
  return response.data;
};

/**
 * Delete a user
 */
export const deleteUser = async (userId: string): Promise<void> => {
  await apiClient.delete(`${API_CONFIG.ENDPOINTS.USERS}/${userId}`);
};

/**
 * Update a user
 */
export const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
  const response = await apiClient.patch<User>(`${API_CONFIG.ENDPOINTS.USERS}/${userId}`, userData);
  return response.data;
};

export default apiClient;
