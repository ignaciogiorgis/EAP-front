import ContainerProducts from "@/components/dashboard/products/containerProducts";
import { handleShowProducts } from "@/utils/dashboard/products";
("@/app/dashboard/products/api/route");

const productPage = async () => {
  const products = await handleShowProducts();

  return (
    <div className="overflow-auto scrollbar-hide">
      <ContainerProducts
        products={products?.data || []}
        refreshData={handleShowProducts}
      />
    </div>
  );
};

export default productPage;
