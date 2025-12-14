import React from "react";
import { useSellerPropertiesQuery } from "../../../redux/features/seller/sellerApi";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../../UI/Loader";

const ViewProperties = () => {
  const { data, isLoading, isError, error } = useSellerPropertiesQuery();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (isError)
    return <div>Error: {error?.data?.message || "Something went wrong"}</div>;

  const properties = data?.properties || [];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">My Properties</h2>

      {properties.length === 0 ? (
        <p>No properties found. Add some to display here.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Location
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Price
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {properties.map((property) => (
                <tr key={property._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{property.title}</td>

                  <td className="px-4 py-3">
                    {property.location?.address}, {property.location?.city}
                  </td>

                  <td className="px-4 py-3 text-green-600 font-semibold">
                    ₹{property.price}
                  </td>

                  <td
                    className={`px-4 py-3 font-medium ${
                      property.status === "available"
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {property.status}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() =>
                        navigate(
                          `/seller/dashboard/edit-property-details/${property._id}`
                        )
                      }
                      className="p-2 cursor-pointer rounded hover:bg-gray-200 transition"
                    >
                      <Pencil size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewProperties;
