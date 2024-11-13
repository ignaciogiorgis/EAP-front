import ConfirmarCuenta from "@/components/auth/register/confirmPage";

export default async function ConfirmPage({
  params,
}: {
  params: { id: string };
}) {
  // Extraer id de params y asegurar que no haya retraso en su obtención
  const { id } = await params;
  return <ConfirmarCuenta token={id} />;
}
