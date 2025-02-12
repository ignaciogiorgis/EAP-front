import { MouseEventHandler } from "react";

export type Response = {
  success: boolean;
  data?: any[];
  message?: any;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type DeleteModalProps = {
  onClose: () => void;
  onDelete: () => void;
  option: string;
};

export interface MenuProps {
  onFormToggle: MouseEventHandler<HTMLButtonElement>;
  onListToggle: MouseEventHandler<HTMLButtonElement>;
}

//expenses

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

export type ProductPageProps = {
  products: any[];
  refreshData: () => Promise<Response>;
};

export type FormProductsProps = {
  onSubmit: (data: {
    id?: string;
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  }) => Promise<void>;
  externalError?: string;
  product?: {
    id: string;
    name: string;
    quantity: number;
    cost: number;
    profit: number;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
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

export type SalesPageProps = {
  sales: any[];
  refreshData: () => Promise<Response>;
  products: any[];
  clients: any[];
};

export type FormSalesProps = {
  onSubmit: (data: {
    id?: string;
    productName: string;
    clientName: string;
    quantity: number;
    total: number;
    paid: boolean;
    saleDate: string;
  }) => Promise<void>;
  externalError?: string;
  sale?: {
    id: string;
    productName: string;
    clientName: string;
    quantity: number;
    total: number;
    paid: boolean;
    saleDate: string;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
  products: Array<{ id: string; name: string; cost: number; profit: number }>;
  clients: Array<{ id: string; firstName: string; lastName: string }>;
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

export type ClientPageProps = {
  clients: any[];
  refreshData: () => Promise<Response>;
};

export type FormClientsProps = {
  onSubmit: (data: {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    dni: number;
    phone: number;
  }) => Promise<void>;
  externalError?: string;
  client?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    birthday: string;
    dni: number;
    phone: number;
  };
  setIsForm: React.Dispatch<React.SetStateAction<boolean>>;
};

//login

export type LoginFormProps = {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  externalError?: string;
};

//recover

export interface PropsRecover {
  token: string;
}

export type RecoverFormProps = {
  onSubmit: (data: { email: string }) => Promise<void>;
  externalError?: string;
};

//register

export type RegisterFormProps = {
  onSubmit: (data: {
    name: string;
    email: string;
    password: string;
    repetir_password: string;
  }) => Promise<void>;
  externalError?: string;
};

//profile

export interface User {
  id: string;
  name: string;
  email: string;
  picture?: string;
  message?: string;
}

export interface ContainerProfileProps {
  user: User;
  handleUploadProfilePicture: (
    formData: FormData
  ) => Promise<{ success: boolean; message?: string }>;
}

export interface FormProfileProps {
  onSubmit: (data: any) => Promise<{ success: boolean; message?: string }>;
  user: { name: string; email: string; picture?: string; message?: string };
  setIsForm: (value: boolean) => void;
  handleUploadProfilePicture: (
    formData: FormData
  ) => Promise<{ success: boolean; message?: string }>;
}
