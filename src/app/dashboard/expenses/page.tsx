export const dynamic = 'force-dynamic';
import ContainerExpense from "@/components/dashboard/expenses/containerExpense";
import { handleShowExpenses } from "@/utils/dashboard/expenses";

export default async function CreateExpensePage() {
  const expenses = await handleShowExpenses();

  return (
    <div className="overflow-auto scrollbar-hide">
      <ContainerExpense
        expenses={expenses?.data || []}
        refreshData={handleShowExpenses}
      />
    </div>
  );
}
