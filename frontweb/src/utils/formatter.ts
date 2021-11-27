import { Role } from "../types";


export const formatRole = (role: string) => {
  const textByRole = {
    ROLE_OPERATOR: 'OPERADOR',
    ROLE_ADMIN: 'ADMIN'
  }
  return textByRole[role as Role];
}

export const formatDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString();
};