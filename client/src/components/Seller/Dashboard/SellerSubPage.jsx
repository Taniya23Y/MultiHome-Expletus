import { useParams } from "react-router-dom";

export default function SellerSubPage() {
  const { section } = useParams();

  return (
    <div className="bg-white p-6 shadow rounded-2xl mt-5">
      <h2 className="text-xl font-bold capitalize">
        {section.replace(/-/g, " ")}
      </h2>
      <p className="text-gray-600 mt-2">Page content for {section}</p>
    </div>
  );
}
