export interface ServicesResponse {
  id: string;
  title: string;
  isAvailableOnline: boolean;
  duration: string;
  description: string;
  isActive: boolean;
  images: Image[];
  staffMembers: StaffMembers[];
  user: User;
}

export interface Image {
  id: number;
  url: string;
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: null;
  isActive: boolean;
  roles: string[];
}

export interface StaffMembers {
  id: string;
  name: string;
  isActive: boolean;
}
