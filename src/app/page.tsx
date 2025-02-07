import PublicNavBar from "@/components/components/navBar/PublicNavBar";
import Link from "next/link";
import { LiaBusinessTimeSolid } from "react-icons/lia";

export default function Home() {
  return (
    <>
      <div className="relative">
        {/* Fondo degradado animado */}
        <div
          className="absolute inset-0 h-full w-full -z-10 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 animate-gradientMove"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 100%)",
          }}
        ></div>

        <PublicNavBar />

        {/* Hero Section */}
        <div className="flex flex-col justify-center items-center h-screen text-center">
          <h2 className="text-4xl font-extrabold text-white opacity-0 animate-fadeIn">
            A solution to your business
          </h2>
          <LiaBusinessTimeSolid className="text-white text-6xl mt-4 animate-bounce" />
        </div>
      </div>

      {/* Testimonios */}
      {/* Testimonios */}
      <section className="relative bg-gray-800 py-16 px-6 mt-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <h3 className="text-white text-3xl font-bold text-center mb-8 animate-fadeIn">
          What Our Clients Say
        </h3>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              text: "Great service! Helped me boost my business.",
              author: "Jane Doe",
            },
            {
              text: "Excellent platform with amazing features.",
              author: "John Smith",
            },
            {
              text: "Highly recommend it for anyone starting a business.",
              author: "Sarah Lee",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-700 p-6 rounded-lg shadow-lg text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slideUp"
            >
              <p className="italic text-lg">"{testimonial.text}"</p>
              <h4 className="mt-4 font-bold text-blue-400">{`- ${testimonial.author}`}</h4>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
      </section>

      {/* Características */}
      <section className="relative py-16 bg-gray-100 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-10 text-gray-900 animate-fadeIn">
            Our Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Feature 1", "Feature 2", "Feature 3"].map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-gray-300 rounded-lg shadow-md bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-slideUp"
              >
                <h4 className="font-bold text-xl text-gray-900">{feature}</h4>
                <p className="text-gray-700 mt-2">
                  Description of {feature.toLowerCase()}.
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm animate-fadeIn">
            &copy; {new Date().getFullYear()} Your Business Name. All rights
            reserved.
          </p>
          <div className="flex justify-center mt-4 space-x-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map(
              (link, index) => (
                <Link
                  key={index}
                  href="#"
                  className="hover:text-gray-400 transition duration-300 hover:underline animate-glow"
                >
                  {link}
                </Link>
              )
            )}
          </div>
        </div>
      </footer>
    </>
  );
}
