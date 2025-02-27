import EventForm from "@/components/shared/EventForm";
import { auth } from "@clerk/nextjs/server";

const CreateEvent = async () => {
  const {sessionClaims} = await auth();
  const userId =sessionClaims?.userId as string;

  return (
    <>

      <section className="relative bg-blue text-white py-10 md:py-16">

        <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-blue-600 to-teal-500 opacity-20 blur-3xl"></div>
        <div className="text-center">
          <h3 className="relative z-10 text-center sm:text-left text-4xl font-extrabold neon-text">
            🚀 Create Your Event
          </h3>
        </div>
      </section>


      <div className="wrapper my-10 p-6 md:p-10 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl border border-gray-600 border-opacity-30">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
