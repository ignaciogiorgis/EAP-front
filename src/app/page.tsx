import PublicNavBar from "@/components/dashboard/components/navBar/PublicNavBar";
import Link from "next/link";
import { LiaBusinessTimeSolid } from "react-icons/lia";

export default function Home() {
  return (
    <>
      <div className="relative">
        <div
          className="py-40 absolute inset-0 h-full w-full -z-10"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
            backgroundColor: "#1f2937",
          }}
        ></div>

        <PublicNavBar />

        <div className="flex justify-center items-center gap-10 h-screen">
          <h2 className="text-4xl mt-6 font-bold text-white animate-fade-move">
            A solution to your business
          </h2>
          <div>
            <LiaBusinessTimeSolid className="text-white text-6xl mt-2  animate-bounce" />
          </div>
        </div>
      </div>
    </>
  );
}
