export interface AuthResponse {
  id: string;
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
}
