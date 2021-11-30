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

export const formatPrice = (price: number) => {
  const params = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  return new Intl.NumberFormat('pt-BR', params).format(price);
}