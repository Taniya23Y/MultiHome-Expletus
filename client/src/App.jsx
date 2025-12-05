import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { logoutState, setCredentials } from "./redux/features/auth/authSlice";
import {
  setSellerCredentials,
  sellerLogoutState,
} from "./redux/features/seller/sellerAuthSlice";

import NotFound from "./pages/NotFound";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import Home from "./pages/Home";
import AdminDashboard from "./components/Admin/Dashboard/AdminDashboard";
import Footer from "./components/Screens/common/Footer";
import Navbar from "./components/Screens/common/Navbar/Navbar";
import VerifyEmail from "./components/Auth/verifyEmail";
import UserDashboard from "./components/User/Dashboard/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerPrivateRoute from "./routes/SellerPrivateRoute";
import PropertyDetail from "./pages/PropertyDetail";
import SellerHome from "./pages/SellerHome";
import SellerCreation from "./components/Auth/sellerCreation";
import { useRefreshTokenQuery } from "./redux/features/auth/authApi";
import { useSellerRefreshQuery } from "./redux/features/seller/sellerApi";
import SellerDashboard from "./components/Seller/Dashboard/SellerDashboard";
import SellerProfile from "./components/Seller/SellerProfile";
import SellerProperties from "./components/Seller/SellerProperties";
import SellerVerifyPhone from "./components/Auth/verifyPhoneOTP";
import ForgotPassword from "./components/Auth/ForgotPassword";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  // --- Hide Navbar & Footer ---
  const hideNavFooter = useMemo(
    () =>
      [
        "/admin",
        "/login",
        "/seller-login",
        "/forgot-password",
        "/signup",
        "/seller-create",
        "/verify-user",
        "/verify-phone-otp",
        "/profile",
      ].includes(pathname),
    [pathname]
  );

  const isUserRoute = useMemo(
    () => pathname.startsWith("/profile") || pathname.startsWith("/"),
    [pathname]
  );

  const isSellerRoute = useMemo(
    () =>
      pathname.startsWith("/seller") ||
      pathname.startsWith("/become-a-seller") ||
      pathname.startsWith("/verify-phone-otp") ||
      pathname.startsWith("/seller"),
    [pathname]
  );

  // --- Always call hooks, skip based on route ---
  // const userRefresh = useRefreshTokenQuery();
  const userRefresh = useRefreshTokenQuery(undefined, {
    skip: !isUserRoute,
  });
  const sellerRefresh = useSellerRefreshQuery(undefined, {
    skip: !isSellerRoute,
  });

  // --- Handle refresh & populate Redux ---
  useEffect(() => {
    if (userRefresh.isSuccess && userRefresh.data) {
      dispatch(
        setCredentials({
          user: userRefresh.data.user,
          roles: userRefresh.data.roles,
          accessToken: userRefresh.data.access,
        })
      );
    } else if (userRefresh.isError) {
      dispatch(logoutState());
    }

    if (sellerRefresh.isSuccess && sellerRefresh.data) {
      dispatch(setSellerCredentials(sellerRefresh.data.seller));
    } else if (sellerRefresh.isError) {
      dispatch(sellerLogoutState());
    }
  }, [
    userRefresh.isSuccess,
    userRefresh.isError,
    userRefresh.data,
    sellerRefresh.isSuccess,
    sellerRefresh.isError,
    sellerRefresh.data,
    dispatch,
  ]);

  // --- Wait for refresh to complete BEFORE rendering anything ---
  const loading = userRefresh.isLoading || sellerRefresh.isLoading;

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {!hideNavFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        {/* User Auth */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-user" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Seller */}
        <Route path="/become-a-seller" element={<SellerHome />} />
        <Route path="/seller-create" element={<SellerCreation />} />
        <Route path="/verify-phone-otp" element={<SellerVerifyPhone />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute loading={loading} />}>
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route
          path="/seller"
          element={<SellerPrivateRoute loading={loading} />}
        >
          <Route path="dashboard" element={<SellerDashboard />} />
          <Route path="profile" element={<SellerProfile />} />
          {/* <Route path="properties" element={<SellerProperties />} /> */}
          {/* <Route path="stats" element={<SellerStats />} /> */}
          {/* <Route path="documents" element={<SellerDocuments />} /> */}
        </Route>

        <Route path="/property-detail/:id" element={<PropertyDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
