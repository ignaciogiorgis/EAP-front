import ContainerSales from "@/components/dashboard/sales/containerSales";
import { handleShowSales } from "@/app/dashboard/sales/api/route";
import { handleShowProducts } from "@/app/dashboard/products/api/route";
import { handleShowClients } from "@/app/dashboard/clients/api/route";

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
