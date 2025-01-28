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

      <section className="bg-gray-800 py-10 px-4 mt-20">
        <h3 className="text-white text-2xl font-bold text-center mb-6">
          What Our Clients Say
        </h3>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
            <p>"Great service! Helped me boost my business."</p>
            <h4 className="mt-4 font-bold">- Jane Doe</h4>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
            <p>"Excellent platform with amazing features."</p>
            <h4 className="mt-4 font-bold">- John Smith</h4>
          </div>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg text-white">
            <p>"Highly recommend it for anyone starting a business."</p>
            <h4 className="mt-4 font-bold">- Sarah Lee</h4>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">
            Our Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border rounded-lg shadow-md">
              <h4 className="font-bold text-xl text-gray-900">Feature 1</h4>
              <p className="text-gray-900 mt-2">
                Description of the first feature.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h4 className="font-bold text-xl text-gray-900">Feature 2</h4>
              <p className="text-gray-900 mt-2">
                Description of the second feature.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-md">
              <h4 className="font-bold text-xl text-gray-900">Feature 3</h4>
              <p className="text-gray-900 mt-2">
                Description of the third feature.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Business Name. All rights
            reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-6">
            <a href="#" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
