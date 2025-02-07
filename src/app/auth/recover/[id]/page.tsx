import ConfirmarNuevaContraseña from "@/components/auth/recover/confirmNewPassword";

export default async function ConfirmNewPassword({
  params,
}: {
  params: { id: string };
}) {

  const { id } = await params;
  return <ConfirmarNuevaContraseña token={id} />;
}
