import { MouseEventHandler } from "react";

export type Response = {
  success: boolean;
  data?: any[];
  message?: any;
};

//expenses

export interface MenuExpensesProps {
  onFormToggle: MouseEventHandler<HTMLButtonElement>;
  onListToggle: MouseEventHandler<HTMLButtonElement>;
}

export type expensesListProps = {
  expenses: {
    id: number;
    name: string;
    value: number;
    description: string;
    date: string;
  }[];
  onEdit: (expense: any) => void;
  onOpenModal: (id: string | number) => void;
};

export type FormExpensesProps = {
  onSubmit: (data: {
    id?: string;
    name: string;
    value: string;
    description: string;
    date: string;
  }) => Promise<void>;
  externalError?: string;
  expense?: {
    id: string;
    name: string;
    value: string;
    description: string;
    date: string;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ExpensesPageProps = {
  expenses: any[];
  refreshData: () => Promise<Response>;
};

//products

export type ProductsListProps = {
  products: {
    id: number;
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  }[];
  onEdit: (product: any) => void;
  onOpenModal: (id: string | number) => void;
};

//sales

export type SalesListProps = {
  sales: {
    id: number;
    productName: number;
    clientName: number;
    quantity: number;
    price: number;
    total: number;
    paid: boolean;
    saleDate: string;
  }[];
  onEdit: (sale: any) => void;
  onOpenModal: (id: string | number) => void;
};

//clients

export type ClientsListProps = {
  clients: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    dni: number;
    phone: number;
  }[];
  onEdit: (client: any) => void;
  onOpenModal: (id: string | number) => void;
};
