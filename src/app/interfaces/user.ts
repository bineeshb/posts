export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  role: string;
}

export interface UserList {
  limit: number;
  skip: number;
  total: number;
  users: User[];
}
