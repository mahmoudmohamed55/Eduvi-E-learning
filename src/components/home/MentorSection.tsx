import { ArrowRight } from "lucide-react";
import mentorImage from "@assets/mentor.png";
import subcribeImage from "@assets/subscribe.png";

export const MentorSection = () => {
  return (
    <section className="py-20">
      <div className="">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          <div className="flex justify-center">
            <img
              src={mentorImage}
              alt="Become Instructor"
              className="w-full max-w-120 object-contain rounded-2xl"
            />
          </div>


          <div className="max-w-md px-4 ">
            <h2 className="text-4xl font-bold leading-tight text-ink-900">
              Want to share your knowledge?
              <br />
              Join us a Mentor
            </h2>

            <p className="mt-6 text-neutral-500 leading-8">
              High-definition video is video of higher resolution and quality
              than standard-definition. While there is no standardized meaning
              for high-definition, generally any video.
            </p>

            <button
              className="
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-primary-600
                px-7
                py-4
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-primary-700
                hover:shadow-lg
              "
            >
              Career Information
              <ArrowRight className="animate-bounce" size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-20 rounded-3xl bg-surface-100 px-10 py-12 lg:px-20">
        <img src={subcribeImage} alt="Subscribe" className="w-full" />
      </div>
    </section>
  );
};
