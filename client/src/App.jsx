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
import AdminLayout from "./components/Admin/Dashboard/AdminLayout";
import Footer from "./components/Screens/common/Footer";
import Navbar from "./components/Screens/common/Navbar/Navbar";
import VerifyEmail from "./components/Auth/verifyEmail";
import UserDashboard from "./components/User/Dashboard/UserDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import SellerPrivateRoute from "./routes/SellerPrivateRoute";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import PropertyDetail from "./pages/PropertyDetail";
import SellerHome from "./pages/SellerHome";
import { useRefreshTokenQuery } from "./redux/features/auth/authApi";
import { useSellerRefreshQuery } from "./redux/features/seller/sellerApi";
import SellerLayout from "./components/Seller/Dashboard/SellerLayout";
import SellerProfile from "./components/Seller/SellerProfile";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Loader from "./components/UI/Loader";
import SellerLogin from "./components/Auth/SellerLogin";
import SellerOnboarding from "./components/Auth/SellerOnboarding";
import SellerDashboardHero from "./components/Seller/Dashboard/SellerDashboardHero";
import SellerSubPage from "./components/Seller/Dashboard/SellerSubPage";
import AdminSubPage from "./components/Admin/Dashboard/AdminSubPage";
import AdminDashboardHero from "./components/Admin/Dashboard/AdminDashboardHero";
import PropertyDetailPage from "./components/Screens/PropertyPage/PropertyDetailPage";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const hideNavFooter = useMemo(() => {
    return (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/seller") ||
      [
        "/login",
        "/forgot-password",
        "/signup",
        "/verify-user",
        "/seller-login",
        "/seller/onboarding",
        "/profile",
      ].includes(pathname)
    );
  }, [pathname]);

  const isUserRoute = !pathname.startsWith("/seller");

  const isSellerRoute = useMemo(
    () =>
      pathname.startsWith("/become-a-seller") ||
      pathname.startsWith("/seller") ||
      pathname.startsWith("/seller-login") ||
      pathname.startsWith("/seller/onboarding"),
    [pathname]
  );

  // const userRefresh = useRefreshTokenQuery(undefined, {
  //   skip: !isUserRoute,
  // });
  const userRefresh = useRefreshTokenQuery();

  const sellerRefresh = useSellerRefreshQuery(undefined, {
    skip: !isSellerRoute,
  });

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

  const loading = userRefresh.isLoading || sellerRefresh.isLoading;

  if (loading) return <Loader />;

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

        {/* Protected Routes */}
        <Route element={<ProtectedRoute loading={loading} />}>
          <Route path="/profile" element={<UserDashboard />} />
        </Route>

        {/* Seller */}
        <Route path="/become-a-seller" element={<SellerHome />} />
        <Route path="/seller/onboarding" element={<SellerOnboarding />} />
        <Route path="/seller-login" element={<SellerLogin />} />

        <Route element={<SellerPrivateRoute loading={loading} />}>
          <Route
            path="/seller/dashboard"
            element={<SellerLayout key="seller-layout" />}
          >
            <Route index element={<SellerDashboardHero />} />
            <Route path=":section" element={<SellerSubPage />} />
          </Route>

          <Route path="/seller/profile" element={<SellerProfile />} />
        </Route>

        <Route element={<AdminPrivateRoute loading={loading} />}>
          <Route
            path="/admin/dashboard"
            element={<AdminLayout key="admin-layout" />}
          >
            <Route index element={<AdminDashboardHero />} />
            <Route path=":section" element={<AdminSubPage />} />
          </Route>
        </Route>

        <Route path="/property-detail/:id" element={<PropertyDetail />} />
        <Route
          path="/property-detail-page/:id"
          element={<PropertyDetailPage />}
        />

        {/* <Route
          path="/admin/dashboard"
          element={<AdminLayout key="admin-layout" />}
        >
          <Route element={<AdminDashboardHero />} />
          <Route path=":section" element={<AdminSubPage />} />
        </Route> */}

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideNavFooter && <Footer />}
    </>
  );
}

export default App;
