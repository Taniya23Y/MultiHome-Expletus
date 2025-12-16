import { CheckCircle, XCircle, Ban, Eye } from "lucide-react";
import {
  useGetSellerListQuery,
  useToggleBanUserMutation,
} from "../../../redux/features/admin/adminPropertyApi";
import { useVerifyUserMutation } from "../../../redux/features/auth/authApi";

const SellersList = () => {
  const { data, isLoading } = useGetSellerListQuery();
  const [verifyUser] = useVerifyUserMutation();
  const [toggleBanUser] = useToggleBanUserMutation();

  const sellers = data?.sellers || [];

  if (isLoading) {
    return <p className="text-center py-10">Loading sellers...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Sellers / Multiowners ({sellers.length})
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">Seller</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-center">Listings</th>
              <th className="px-6 py-4 text-center">Sales</th>
              <th className="px-6 py-4 text-center">Verified</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {sellers.map((seller) => (
              <tr key={seller._id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-semibold">{seller.name}</p>
                  <p className="text-xs text-gray-500">{seller.sellerCode}</p>
                </td>

                <td className="px-6 py-4">
                  <p>{seller.email}</p>
                  <p className="text-gray-500">{seller.phone}</p>
                </td>

                <td className="px-6 py-4">
                  {seller.city}, {seller.state}
                </td>

                <td className="px-6 py-4 text-center">
                  {seller.totalListings ?? 0}
                </td>

                <td className="px-6 py-4 text-center">
                  {seller.totalSales ?? 0}
                </td>

                <td className="px-6 py-4 text-center">
                  {seller.isVerified ? (
                    <span className="text-green-600 inline-flex items-center gap-1">
                      <CheckCircle size={16} /> Verified
                    </span>
                  ) : (
                    <span className="text-yellow-600 inline-flex items-center gap-1">
                      <XCircle size={16} /> Pending
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  {seller.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Banned</span>
                  )}
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Eye size={18} />
                    </button>

                    {!seller.isVerified && (
                      <button
                        onClick={() => verifyUser(seller._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}

                    <button
                      onClick={() => toggleBanUser(seller._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Ban size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {sellers.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-10 text-gray-500">
                  No sellers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellersList;
