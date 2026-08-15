import { LottieHandler } from "@components/feedback/lottie/LottieHandler";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <LottieHandler type="error" message="Oops! Page not found." />
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Go back to home
      </Link>
    </div>
  );
};

export default Error404;
