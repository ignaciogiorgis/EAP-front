import ContainerSales from "@/components/dashboard/sales/containerSales";
import { handleShowSales } from "@/utils/dashboard/sales";
import { handleShowProducts } from "@/utils/dashboard/products";
import { handleShowClients } from "@/utils/dashboard/clients";
export const dynamic = "force-dynamic";

const salesPage = async () => {
  const sales = await handleShowSales();
  const products = await handleShowProducts();
  const clients = await handleShowClients();

  return (
    <div className="overflow-auto scrollbar-hide">
      <ContainerSales
        sales={sales?.data || []}
        refreshData={handleShowSales}
        products={products?.data || []}
        clients={clients?.data || []}
      />
    </div>
  );
};

export default salesPage;
