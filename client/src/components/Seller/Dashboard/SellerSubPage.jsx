import { useParams } from "react-router-dom";
import AddProperty from "../Property/AddProperty";
import ViewProperties from "../Property/ViewProperties";
import EditPropertyDetails from "../Property/EditPropertyDetails";
import SellerProfile from "../SellerProfile";

export default function SellerSubPage() {
  const { section } = useParams();

  const pages = {
    "add-property": <AddProperty />,
    "view-properties": <ViewProperties />,
    "edit-property-details": <EditPropertyDetails />,
    "manage-availability": <div>Manage Availability Coming Soon</div>,
    profile: <SellerProfile />,
    "Bank details": <div>Manage Availability Coming Soon</div>,
    "Identity verification": <div>Manage Availability Coming Soon</div>,
    "Notification preferences": <div>Manage Availability Coming Soon</div>,
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
