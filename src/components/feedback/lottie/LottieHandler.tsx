import errorAnimation from "@assets/lottiefiles/404 blue.json";
import loadingAnimation from "@assets/lottiefiles/loading.json";
import successAnimation from "@assets/lottiefiles/Success Animation.json";
import * as LottieModule from "lottie-react";

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
};

export const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottieFiles[type];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Lottie animationData={lottie} loop className="h-64 w-72" />

      {message && (
        <p className="text-center text-lg font-medium text-ink-700">
          {message}
        </p>
      )}
    </div>
  );
};