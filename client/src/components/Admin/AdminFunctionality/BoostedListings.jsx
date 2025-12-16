import AdminPropertyCard from "./AdminPropertyCard";
import { useGetBoostedPropertiesQuery } from "../../../redux/features/admin/adminPropertyApi";

const BoostedListings = () => {
  const { data, isLoading } = useGetBoostedPropertiesQuery();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data?.properties.map((property) => (
        <AdminPropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default BoostedListings;
