import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

type Props = {
  title: string;
  description: string;
  image: string;
};

export const Heading = ({ title, description, image }: Props) => {
  return (
    <section className="relative overflow-hidden ">
      <div className="container flex min-h-65 items-center justify-between py-5 px-2.5">


        <div className="max-w-xl">
          <div className="mb-5 flex items-center gap-2 text-sm">
            <Link
              to="/"
              className="font-medium text-primary-600 transition hover:text-primary-700"
            >
              Home
            </Link>

            <FaChevronRight className="text-[10px] text-neutral-400" />

            <span className="text-neutral-500">{title}</span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-ink-900 md:text-5xl">
            {title}
          </h1>

          <p className="max-w-md text-lg leading-7 text-neutral-500">
            {description}
          </p>
        </div>

        <div className="hidden lg:block">
          <img
            src={image}
            alt={title}
            className="w-90 object-contain rounded-2xl"
          />
        </div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="absolute left-1/2 top-0 h-32 w-32 rounded-full bg-primary-100/50 blur-2xl" />
    </section>
  );
};