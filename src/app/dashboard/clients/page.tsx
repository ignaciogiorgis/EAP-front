export const dynamic = 'force-dynamic';
import ContainerClients from "@/components/dashboard/clients/containerClients";
import { handleShowClients } from "@/utils/dashboard/clients";

const clientPage = async () => {
  const clients = await handleShowClients();
  return (
    <div className="overflow-auto scrollbar-hide">
      <ContainerClients
        clients={clients?.data || []}
        refreshData={handleShowClients}
      />
    </div>
  );
};

export default clientPage;
