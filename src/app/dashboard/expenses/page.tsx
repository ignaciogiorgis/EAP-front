import ContainerExpense from "@/components/dashboard/expenses/containerExpense";
import { handleShowExpenses } from "@/app/dashboard/api/route";

export default async function CreateExpensePage() {
  const expenses = await handleShowExpenses();
  return (
    <div className="overflow-auto scrollbar-hide">
      <ContainerExpense expenses={expenses?.data} />
    </div>
  );
}
