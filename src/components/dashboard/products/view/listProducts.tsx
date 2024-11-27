type productsListProps = {
  products: {
    id: number;
    name: string;
    value: number;
    description: string;
    date: string;
  }[];
  onOpenModal: (id: string | number) => void;
};

const listProducts = () => {
  return <div>listProducts</div>;
};

export default listProducts;
