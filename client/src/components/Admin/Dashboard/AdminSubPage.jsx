import { useParams } from "react-router-dom";
import AdminDashboardHero from "./AdminDashboardHero";
import AllProperties from "../AdminFunctionality/AllProperties";
import PendingApprovals from "../AdminFunctionality/PendingApprovals";
import FlaggedProperties from "../AdminFunctionality/FlaggedProperties";
import BoostedListings from "../AdminFunctionality/BoostedListings";
import OwnerVerification from "../AdminFunctionality/OwnerVerification";
import UsersList from "../AdminFunctionality/UsersList";
import SellersList from "../AdminFunctionality/SellersList";

export default function AdminSubPage() {
  const { section } = useParams();

  const pages = {
    "Dashboard-Overview": <AdminDashboardHero />,
    "users-list": <UsersList />,
    "sellers-multiowners": <SellersList />,
    "all-properties": <AllProperties />,
    "pending-approvals": <PendingApprovals />,
    "flagged-properties": <FlaggedProperties />,
    "boosted-listings": <BoostedListings />,
    "owner-verification-status": <OwnerVerification />,
    "Platform stats": <div>Edit Property Page Coming Soon</div>,
    "Daily activity": <div>Edit Property Page Coming Soon</div>,
    "Total users": <div>Edit Property Page Coming Soon</div>,
    "Revenue analytics": <div>Edit Property Page Coming Soon</div>,
    "System logs": <div>Edit Property Page Coming Soon</div>,
  };

  return (
    pages[section] || (
      <div className="bg-white p-6 shadow rounded-2xl mt-5">
        <h2 className="text-xl font-bold capitalize">
          {section.replace(/-/g, " ")}
        </h2>
        <p className="text-gray-600 mt-2">Page content for {section}</p>
      </div>
    )
  );
}
