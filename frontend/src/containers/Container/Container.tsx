import Modal from "react-modal";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import {
  ROUTE_ITEMS_BY_CATEGORY,
  ROUTE_ROOT,
  ROUTE_USER_ORDER_HISTORY,
} from "../../constants/routes";
import App from "../App";

import { useSelector } from "react-redux";
import Cart from "../../components/Cart";
import Drawer from "../../components/Drawer";
import "../../index.css";
import AuthModal from "../../modals/AuthModal";
import OrderSuccessModal from "../../modals/OrderSuccessModal";
import CategoryItems from "../../pages/CategoryItems/CategoryItems";
import Dashboard from "../../pages/Dashboard";
import OrderHistory from "../../pages/OrderHistory";
import {
  setAuthModal,
  setShowCart,
  setShowOrderSuccess,
} from "../../redux/features/userSlice";
import { useAppDispatch } from "../../redux/hooks";
import ProtectedRoute from "./components/ProtectedRoute";
Modal.setAppElement("#root");
const routes = {
  protected: [{ path: ROUTE_USER_ORDER_HISTORY, element: <OrderHistory /> }],
  public: [
    { path: ROUTE_ROOT, element: <Dashboard /> },
    { path: ROUTE_ITEMS_BY_CATEGORY, element: <CategoryItems /> },
  ],
};

const Container = () => {
  const dispatch = useAppDispatch();
  const showAuthModal = useSelector((state: any) => state.user.showAuthModal);
  const showCart = useSelector((state: any) => state.user.showCart);
  const showOrderSuccess = useSelector(
    (state: any) => state.user.showOrderSuccess
  );

  return (
    <>
      <div className="h-full">
        <Router>
          <Routes>
            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              {routes.protected.map(({ path, element }, index) => (
                <Route
                  key={index}
                  path={path}
                  element={element}
                />
              ))}
            </Route>
            {/* Public Routes */}
            <Route element={<App />}>
              {routes.public.map(({ path, element }, index) => (
                <Route
                  key={index + path}
                  path={path}
                  element={element}
                />
              ))}
            </Route>
          </Routes>
        </Router>
      </div>
      {showAuthModal && (
        <AuthModal onRequestClose={() => dispatch(setAuthModal(false))} />
      )}
      {showCart && (
        <Drawer
          onRequestClose={() => {
            dispatch(setShowCart(false));
          }}
        >
          <Cart />
        </Drawer>
      )}
      {showOrderSuccess?.status && (
        <OrderSuccessModal
          orderDetail={showOrderSuccess?.detail!}
          onRequestClose={() =>
            dispatch(setShowOrderSuccess({ status: false, detail: undefined }))
          }
        />
      )}
    </>
  );
};

export default Container;
