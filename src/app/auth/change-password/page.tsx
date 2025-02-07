import React from "react";
import { FaEnvelope, FaKey } from "react-icons/fa";
import "animate.css";

const changePasswordPage = () => {
  return (
    <div className="h-screen bg-indigo-300 flex flex-col items-center justify-center space-y-8 px-6">
      <h1 className="text-center font-bold uppercase text-white text-4xl tracking-wide animate__animated animate__fadeIn">
        Password Change
      </h1>

      <div className="flex flex-col items-center space-y-4 animate__animated animate__fadeIn">
        <FaKey className="text-6xl text-emerald-500 animate__animated animate__pulse" />
        <p className="text-center text-white text-2xl">
          We sent a message to your personal email, look in your inbox for the
          link to continue with the process.
        </p>
        <FaEnvelope className="text-5xl text-yellow-500 animate__animated animate__bounceIn" />
      </div>
    </div>
  );
};

export default changePasswordPage;
