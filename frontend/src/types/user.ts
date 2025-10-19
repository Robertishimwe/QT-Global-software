/**
 * User type definitions
 */
export interface User {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  signature?: string;
  publicKey?: string;
}

export interface UserStat {
  date: string;
  count: number;
}
