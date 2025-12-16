import { Eye, Edit, Trash2 } from "lucide-react";
import { useGetAllPublicPropertiesQuery } from "../../../redux/features/property/propertyApi";

const AllProperties = () => {
  const { data, isLoading } = useGetAllPublicPropertiesQuery();

  const properties = data?.properties || [];

  if (isLoading) {
    return <p className="text-center py-10">Loading properties...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        All Properties ({properties.length})
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Title</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-right">Price</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {properties.map((property) => (
              <tr key={property._id} className="hover:bg-gray-50">
                {/* Title */}
                <td className="px-6 py-4">
                  <p className="font-semibold">{property.title}</p>
                  <p className="text-xs text-gray-500">{property._id}</p>
                </td>

                {/* Location */}
                <td className="px-6 py-4">{property.location?.city || "-"}</td>

                {/* Property Type */}
                <td className="px-6 py-4">{property.propertyType}</td>

                {/* Price */}
                <td className="px-6 py-4 text-right font-medium">
                  ₹{property.price?.toLocaleString()}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  {property.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Inactive</span>
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="p-2 cursor-pointer hover:bg-gray-100 rounded">
                      <Eye size={18} />
                    </button>

                    <button className="p-2 cursor-pointer text-blue-600 hover:bg-blue-50 rounded">
                      <Edit size={18} />
                    </button>

                    <button className="p-2 cursor-pointer text-red-600 hover:bg-red-50 rounded">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {properties.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-10 text-gray-500">
                  No properties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProperties;
