export interface ServicesResponse {
  id: string;
  title: string;
  isAvailableOnline: boolean;
  duration: string;
  description: string;
  isActive: boolean;
  images: Images[];
  user: User;
}

interface Images {
  id: string;
  url: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}
