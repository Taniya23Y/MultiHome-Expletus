import { useParams } from "react-router-dom";

export default function AdminSubPage() {
  const { section } = useParams();

  const pages = {
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
