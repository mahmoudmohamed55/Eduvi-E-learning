import type { TLoading } from "@types";
import { LottieHandler } from "../lottie/LottieHandler";

type LoadingProps = {
  status: TLoading;
  error: string | null;
  children?: React.ReactNode;
  skeleton?: React.ReactNode;
};
const Loading = ({ status, error, children, skeleton }: LoadingProps) => {
  if (status === "pending") return skeleton ;
  if (status === "failed")
    return (
      <div>
        <LottieHandler type="error" message={error || "Something went wrong"} />
      </div>
    );
  return <div>{children}</div>;
};

export default Loading;
