import { ChevronUp, PhoneOff } from "lucide-react";

import programmingTeacher from "@assets/landing.png";
import dots from "@assets/dots.png";
import { Link } from "react-router-dom";

const VideoLearning = () => {
  return (
    <section className="py-24 ">
      <div className="">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-4xl font-extrabold leading-tight text-ink-900 md:text-5xl">
            High quality video, audio
            <br />& live classes
          </h2>

          <p className="mt-6 text-neutral-500 leading-8">
            Learn web development from professional instructors through live
            sessions, recorded lessons and interactive classes designed for all
            skill levels.
          </p>

          <Link
            to="/courses"
            className="mt-5 inline-block rounded-xl bg-primary-600 px-8 py-3 font-semibold text-white transition hover:bg-primary-700"
          >
            Visit Courses
          </Link>
        </div>

        <div className="relative  rounded-[30px] bg-white py-4 shadow-[0_30px_70px_rgba(124,58,237,.08)]">
          <img src={dots} alt="Dots" className="absolute -top-20 -right-5  z-[-1] hidden md:block"   />
          <div className="relative flex justify-center overflow-hidden rounded-3xl">
            <img
              src={programmingTeacher}
              alt="Programming Instructor"
              className="h-full w-full md:w-[90%] object-contain rounded-2xl"
            />

            <button className="absolute bottom-1/4 left-1/4 flex h-8 w-8 md:h-12 md:w-12  -translate-x-1/2 items-center justify-center rounded-full bg-secondary-500 text-white hover:bg-secondary-600 shadow-lg">
              <PhoneOff size={22} />
            </button>

            <button className="absolute bottom-1/4 right-1/4 flex h-8 w-8 md:h-12 md:w-12  -translate-x-1/2 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition hover:bg-primary-700">
              <ChevronUp size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoLearning;
