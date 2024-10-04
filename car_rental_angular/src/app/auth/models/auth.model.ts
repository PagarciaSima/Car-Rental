export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface SignupResponse {
  id: number;
  name: string | null;
  email: string | null;
  userRole: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  jwt: string;
  userRole: string;
  userId: number;
}
