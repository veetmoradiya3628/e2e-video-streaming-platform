export interface User {
  userId?: string; // UUID
  username: string;
  email: string;
  password: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  lastActiveAt?: string;
}
