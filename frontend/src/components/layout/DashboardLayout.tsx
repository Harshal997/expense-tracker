import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-gray-100 overflow-auto text-gray-900 dark:bg-gray-900 dark:text-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
