const preConfirmPage = () => {
  return (
    <div className="h-screen bg-indigo-800 flex flex-col items-center justify-center px-6 md:px-12 py-8">
      <h1 className="text-center text-white font-bold uppercase text-3xl md:text-4xl lg:text-5xl mb-6">
        Your Registration is Progressing
      </h1>
      <p className="text-center text-white text-lg md:text-xl lg:text-2xl max-w-3xl">
        We send a message to your personal email. Search your inbox the link to
        continue with the process.
      </p>
    </div>
  );
};

export default preConfirmPage;
