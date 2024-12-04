import Link from "next/link";
import { LiaBusinessTimeSolid } from "react-icons/lia";

export default function Home() {
  return (
    <>
      <div className="relative">
        {/* Fondo con forma de triángulo */}
        <div
          className="py-40 absolute inset-0 h-full w-full -z-10"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
            backgroundColor: "#1f2937",
          }}
        ></div>

        {/* Contenido superior */}
        <div className="relative text-white py-3 px-5 flex flex-wrap justify-between">
          <h1 className="text-4xl font-bold">
            Expenses <span className="font-medium">and</span> Profits
          </h1>
          <ul className="flex gap-[40px] text-m items-center">
            <li className="hover:text-indigo-500 cursor-pointer">
              <Link href="/auth/login">Sign In</Link>
            </li>
            <li className="hover:text-indigo-500 cursor-pointer">
              <Link href="/auth/register">Create an account</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* H2 centrado en la pantalla */}
      <div className="flex justify-center items-center gap-10 h-screen">
        <h2 className="text-4xl mt-6 font-bold text-indigo-950 animate-fade-move">
          A solution to your business
        </h2>
        <div>
          <LiaBusinessTimeSolid className="text-indigo-950 text-6xl mt-2  animate-bounce" />
        </div>
      </div>
    </>
  );
}
