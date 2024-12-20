export interface User {
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  birthdate: null;
  is_active: boolean;
  registration_date: Date;
  last_login: null;
  roles: string[];
  token: string;
  verification_code: string;
}
