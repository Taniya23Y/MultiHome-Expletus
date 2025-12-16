import { CheckCircle, XCircle, Ban, Eye } from "lucide-react";

import { useVerifyUserMutation } from "../../../redux/features/auth/authApi";
import {
  useGetUserListQuery,
  useToggleBanUserMutation,
} from "../../../redux/features/admin/adminPropertyApi";

const UsersList = () => {
  const { data, isLoading } = useGetUserListQuery();
  const [verifyUser] = useVerifyUserMutation();
  const [toggleBanUser] = useToggleBanUserMutation();

  const users = data?.users || [];

  if (isLoading) {
    return <p className="text-center py-10">Loading users...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Users ({users.length})</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Contact</th>
              <th className="px-6 py-4 text-center">Role</th>
              <th className="px-6 py-4 text-center">Verified</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-center">Joined</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                {/* User */}
                <td className="px-6 py-4">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </td>

                {/* Contact */}
                <td className="px-6 py-4">
                  <p>{user.phone || "-"}</p>
                </td>

                {/* Role */}
                <td className="px-6 py-4 text-center capitalize">
                  <span className="px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700">
                    {user.role}
                  </span>
                </td>

                {/* Verified */}
                <td className="px-6 py-4 text-center">
                  {user.isVerified ? (
                    <span className="text-green-600 inline-flex items-center gap-1">
                      <CheckCircle size={16} /> Verified
                    </span>
                  ) : (
                    <span className="text-yellow-600 inline-flex items-center gap-1">
                      <XCircle size={16} /> Pending
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="px-6 py-4 text-center">
                  {user.isActive ? (
                    <span className="text-green-600 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Banned</span>
                  )}
                </td>

                {/* Joined */}
                <td className="px-6 py-4 text-center text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Eye size={18} />
                    </button>

                    {!user.isVerified && (
                      <button
                        onClick={() => verifyUser(user._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}

                    <button
                      onClick={() => toggleBanUser(user._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Ban size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersList;
