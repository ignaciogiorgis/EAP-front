import React from "react";

const changePasswordPage = () => {
  return (
    <div className="h-screen bg-indigo-300 flex flex-col items-center justify-center">
      <h1 className="text-center font-bold uppercase text-4xl ">
        Cambio de Contraseña
      </h1>
      <p className="text-center mt-14 text-2xl">
        Enviamos un Mensaje a tu correo personal, busca en tu buzon de entrada
        el link para continuar con el proceso
      </p>
    </div>
  );
};

export default changePasswordPage;
