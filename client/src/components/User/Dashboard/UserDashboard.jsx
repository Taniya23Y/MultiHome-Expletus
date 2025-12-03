import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />

      <main className="flex-1 ml-0 md:ml-64 p-6 transition-all">
        <Outlet />
      </main>
    </div>
  );
}
