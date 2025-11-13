import React, { useEffect, useState } from "react";
import DatabasePropertyCard from "./databaseCardProperty";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties");
        const data = await res.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading properties...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {properties.map((property) => (
        <DatabasePropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default PropertyList;
