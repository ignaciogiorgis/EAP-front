import ConfirmarCuenta from "@/components/auth/register/confirmPage";

export default async function ConfirmPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <ConfirmarCuenta token={id} />;
}
