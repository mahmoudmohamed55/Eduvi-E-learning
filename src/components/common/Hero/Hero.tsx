import heroImage from "@assets/4c85afde-3676-441f-8958-77af321c771a.png";
import {
  Code2,
  Brain,
  ShieldCheck,
  ChartColumn,
  ArrowRight,
} from "lucide-react";

export const Hero = () => {
  return (
    <section className="bg-[#f8f5ff]">
      <div className="container mx-auto px-6 py-20">
        <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-0">
          <div className="w-full max-w-lg lg:max-w-xl">
            <span className=" rounded-full bg-white px-4 py-2 text-sm font-medium text-violet-600 shadow">
              🚀 Learn New Skills Everyday
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight text-slate-900">
              Grow Your Skills
              <br />
              With Modern
              <span className="text-violet-600"> Online Courses</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
              Master Web Development, Artificial Intelligence, Cyber Security,
              UI/UX and many more with expert instructors and real-world
              projects.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-7 py-4 font-semibold text-white transition hover:bg-violet-700">
                Browse Courses
                <ArrowRight size={18} />
              </button>

              <button className="rounded-xl border border-slate-300 px-7 py-4 font-semibold hover:bg-white">
                Explore Categories
              </button>
            </div>
          </div>

          <div className="">
            <img
              src={heroImage}
              alt="Student"
              className="relative z-10  object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
