export type Role = "ROLE_OPERATOR" | "ROLE_ADMIN";

export type Roles = {
  id: number;
  authority: string;
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: Roles[];
};

export type UserFormLogin = {
  username: string;
  password: string;
};

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
}

export type SpringPage<T> = {
  content: T[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  numberOfElements?: number;
  empty: boolean;
};

export type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userLastName: string;
  userId: number;
};

export type LoginData = {
  username: string;
  password: string;
};

export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
  cpf: string;
  birthDate: Date;
  email: string;
};