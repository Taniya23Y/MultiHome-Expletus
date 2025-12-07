import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminPrivateRoute() {
  const { isSellerAuthenticated, sellerLoading } = useSelector(
    (state) => state.sellerAuth
  );

  if (sellerLoading) return <div>Loading...</div>;

  return isSellerAuthenticated ? <Outlet /> : <Navigate to="/seller-login" />;
}
