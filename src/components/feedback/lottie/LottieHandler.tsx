import errorAnimation from "@assets/lottiefiles/404 blue.json";
import loadingAnimation from "@assets/lottiefiles/loading.json";
import successAnimation from "@assets/lottiefiles/Success Animation.json";
import * as LottieModule from "lottie-react";
import { useNavigate } from "react-router-dom";

const Lottie =
  (LottieModule as any).default?.default ?? (LottieModule as any).default;

const lottieFiles = {
  error: errorAnimation,
  loading: loadingAnimation,
  success: successAnimation,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFiles;
  message?: string;
  BackToHomeButton?: boolean;
};

export const LottieHandler = ({
  type,
  message,
  BackToHomeButton,
}: LottieHandlerProps) => {
  const lottie = lottieFiles[type];
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Lottie animationData={lottie} loop className="h-64 w-72" />

      {message && (
        <p className="text-center text-lg font-medium text-ink-700">
          {message}
        </p>
      )}
      {BackToHomeButton && (
        <button
          onClick={() => navigate("/", { replace: true })}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to Home
        </button>
      )}
    </div>
  );
};
