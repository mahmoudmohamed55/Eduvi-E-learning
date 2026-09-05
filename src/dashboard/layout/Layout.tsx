
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "@dashboard/components/Sidebar";
import Header from "@dashboard/components/Header";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface-200">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main Area */}
      <div className="min-h-screen lg:ml-64">
       
        <Header onMenuClick={openSidebar} />

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

