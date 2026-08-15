import { Suspense } from "react"
import { LottieHandler } from "../lottie/LottieHandler";

type PageSuspenseFallbackProps = {
  children?: React.ReactNode;
};
const PageSuspenseFallback = ({ children }: PageSuspenseFallbackProps = {}) => {
  return (
   <Suspense fallback={<LottieHandler type="loading"  />}>
     {children}
   </Suspense>
  )
}

export default PageSuspenseFallback