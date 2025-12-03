import React from "react";
import { useSellerProfileQuery } from "../../redux/features/seller/sellerApi";

const SellerProfile = () => {
  const { data, isLoading } = useSellerProfileQuery();

  if (isLoading) return <p>Loading seller profile...</p>;

  const seller = data?.seller;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Seller Profile</h1>

      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <p>
          <b>Name:</b> {seller.name}
        </p>
        <p>
          <b>Email:</b> {seller.email}
        </p>
        <p>
          <b>Phone:</b> {seller.phone}
        </p>
        <p>
          <b>Business:</b> {seller.businessName}
        </p>
        <p>
          <b>Area:</b> {seller.area}
        </p>
        <p>
          <b>Address:</b> {seller.address}
        </p>
        <p>
          <b>Pincode:</b> {seller.pincode}
        </p>
        <p>
          <b>Seller Code:</b> {seller.sellerCode}
        </p>
      </div>
    </div>
  );
};

export default SellerProfile;
