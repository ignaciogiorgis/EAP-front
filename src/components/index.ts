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
