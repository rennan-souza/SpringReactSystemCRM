import { Role } from "../types";


export const formatRole = (role: string) => {
  const textByRole = {
    ROLE_OPERATOR: 'OPERADOR',
    ROLE_ADMIN: 'ADMIN'
  }
  return textByRole[role as Role];
}