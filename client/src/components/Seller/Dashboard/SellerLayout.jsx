import { Outlet } from "react-router-dom";
import SellerSidebar from "./SellerSidebar";

export default function SellerLayout() {
  return (
    <div className="flex">
      <div className="1500px:w-[16%] w-1/5">
        <SellerSidebar />
      </div>

      <div className="w-[100%] sm:w-[85%]">
        <Outlet />
      </div>
    </div>
  );
}
