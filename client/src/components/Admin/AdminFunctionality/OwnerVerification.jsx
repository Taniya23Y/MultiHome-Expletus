import { useGetOwnerVerificationPropertiesQuery } from "../../../redux/features/admin/adminPropertyApi";
import AdminPropertyCard from "./AdminPropertyCard";

const OwnerVerification = () => {
  const { data, isLoading } = useGetOwnerVerificationPropertiesQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data?.properties.map((property) => (
        <AdminPropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default OwnerVerification;
