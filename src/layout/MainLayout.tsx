import Footer from "@components/common/footer/Footer";
import Header from "@components/common/header/Header";

import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="container min-h-dvh flex flex-col ">
      <Header />
     
      <Outlet />
      <Footer />
    </div>
  );
};
