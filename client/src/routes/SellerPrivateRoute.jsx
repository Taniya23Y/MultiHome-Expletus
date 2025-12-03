import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function SellerPrivateRoute({ children }) {
  const { isSellerAuthenticated, sellerLoading } = useSelector(
    (state) => state.sellerAuth
  );

  if (sellerLoading) return <div>Loading...</div>;

  return isSellerAuthenticated ? children : <Navigate to="/seller/login" />;
}
