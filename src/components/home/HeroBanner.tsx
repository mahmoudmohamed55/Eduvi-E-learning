
import heroImage from "@assets/HeroBanner.png";
import { useNavigate } from "react-router-dom";

export const HeroBanner = () => {
  const navigate = useNavigate();
  return (
<section className="py-16">
  <div className="">
    <div className="grid items-center gap-8 rounded-3xl bg-surface-100 px-10 py-12 lg:grid-cols-[1fr_1.2fr]">

      {/* Left */}
      <div className="max-w-md">
        <span className="inline-block rounded bg-primary-100 px-3 py-1 text-sm font-medium text-primary-600">
          College Level
        </span>

        <h1 className="mt-5 text-[54px] leading-[1.15] font-bold text-ink-900">
          Don’t waste time 
          Develop your skills.
        </h1>

        <p className="mt-6 text-[15px] leading-8 text-neutral-500">
          High-definition video is video of higher resolution and quality
          than standard-definition. While there is no standardized meaning
          for high-definition, generally any video.
        </p>

        <button onClick={() => navigate("/register")} className="mt-8 rounded-lg bg-primary-600 px-7 py-4 font-semibold text-white transition hover:bg-primary-700">
          Registration Now
        </button>
      </div>

     
      <div className="flex justify-end">
        <img
          src={heroImage}
          alt="Hero"
          className="w-full max-w-170 object-contain"
        />
      </div>

    </div>
  </div>
</section>
  );
};