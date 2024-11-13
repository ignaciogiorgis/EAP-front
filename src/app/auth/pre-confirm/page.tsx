import React from "react";

const preConfirmPage = () => {
  return (
    <div className="h-screen bg-indigo-500 flex flex-col items-center justify-center md:p-3">
      <h1 className="text-center font-bold uppercase md:text-2xl lg:text-4xl ">
        Tu Registro esta Avanzando
      </h1>
      <p className="text-center mt-14 lg:text-2xl">
        Enviamos un Mensaje a tu correo personal, busca en tu buzon de entrada
        el link para continuar con el proceso
      </p>
    </div>
  );
};

export default preConfirmPage;
