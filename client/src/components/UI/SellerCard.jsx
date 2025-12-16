/* eslint-disable no-unused-vars */
const SellerCard = ({ sellerId }) => {
  const seller = {
    name: "Verified Seller",
    phone: "+91 9876543210",
    email: "seller@realestate.com",
    experience: "10+ years experience",
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Seller Information</h2>

      <p className="text-gray-700">{seller.experience}</p>

      <div className="space-y-1 text-gray-700">
        <p>
          <strong>Name:</strong> {seller.name}
        </p>
        <p>
          <strong>Email:</strong> {seller.email}
        </p>
        <p>
          <strong>Phone:</strong> {seller.phone}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <button className="bg-blue-600 text-white py-2 rounded-md">
          Message Seller
        </button>
        <button className="bg-green-600 text-white py-2 rounded-md">
          Call Seller
        </button>
      </div>
    </div>
  );
};

export default SellerCard;
