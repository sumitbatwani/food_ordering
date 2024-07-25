import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, RouteProps, useLocation } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import { ROUTE_ROOT } from "../../../constants/routes";

const ProtectedRoute: React.FC<RouteProps> = () => {
  const location = useLocation();
  const token = useSelector((state: any) => state.auth.token);

  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate
      to={ROUTE_ROOT}
      state={{ from: location }}
    />
  );
};

export default ProtectedRoute;
