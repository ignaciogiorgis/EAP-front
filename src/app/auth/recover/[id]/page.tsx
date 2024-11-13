import ConfirmarNuevaContraseña from "@/components/auth/recover/confirmNewPassword";

export default async function ConfirmNewPassword({
  params,
}: {
  params: { id: string };
}) {
  // Extraer id de params y asegurar que no haya retraso en su obtención
  const { id } = await params;
  return <ConfirmarNuevaContraseña token={id} />;
}
