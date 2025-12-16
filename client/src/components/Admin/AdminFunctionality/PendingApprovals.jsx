import AdminPropertyCard from "./AdminPropertyCard";
import {
  useApprovePropertyMutation,
  useGetPendingPropertiesQuery,
} from "../../../redux/features/admin/adminPropertyApi";

const PendingApprovals = () => {
  const { data, isLoading } = useGetPendingPropertiesQuery();
  const [approveProperty] = useApprovePropertyMutation();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data?.properties.map((property) => (
        <AdminPropertyCard
          key={property._id}
          property={property}
          actions={
            <>
              <button
                onClick={() =>
                  approveProperty({ id: property._id, approved: true })
                }
                className="px-3 py-1 bg-green-600 text-white rounded"
              >
                Approve
              </button>

              <button
                onClick={() =>
                  approveProperty({ id: property._id, approved: false })
                }
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Reject
              </button>
            </>
          }
        />
      ))}
    </div>
  );
};

export default PendingApprovals;
