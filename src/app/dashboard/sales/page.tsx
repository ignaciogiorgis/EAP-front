import ContainerSales from "@/components/dashboard/sales/containerSales";
import { handleShowSales } from "./api/route";
("@/app/dashboard/products/api/route");

const salesPage = async () => {
  const sales = await handleShowSales();
  return (
    <div className="overflow-auto scrollbar-hide">
      <ContainerSales sales={[]} refreshData={handleShowSales} />
    </div>
  );
};

export default salesPage;
