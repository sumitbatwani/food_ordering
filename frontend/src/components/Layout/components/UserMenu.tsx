import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { ROUTE_USER_ORDER_HISTORY } from "../../../constants/routes";
import { logout } from "../../../redux/features/authSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { useGetUserQuery } from "../../../redux/services/user";
import Avatar from "../../Avatar";
import Button from "../../Button";
import Dropdown from "../../Dropdown";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: user } = useGetUserQuery();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="ml-auto mr-2">
      <Dropdown
        button={
          <Button
            variant="icon"
            className="flex items-center gap-2"
            onClick={() => {}}
          >
            <Avatar
              round
              alt={user?.first_name}
              color="lightgray"
              src={user?.profile_picture_url || ""}
              size="30px"
            />
            <ChevronDownIcon className="h-4 w-4 text-gray-500" />
          </Button>
        }
        menuHeader={
          <div className="px-4 py-4 border-b flex items-center gap-2 max-w-80 w-80">
            <Avatar
              round
              alt={user?.email}
              color="lightgray"
              src={user?.profile_picture_url || ""}
              size="40px"
            />
            <div className="flex flex-col max-w-60">
              <div className="text-sm text-gray-700 truncate">
                {user?.email}
              </div>
            </div>
          </div>
        }
        menuItems={[
          {
            key: "order-history",
            label: "Order History",
          },
          {
            key: "logout",
            label: "Logout",
            icon: (
              <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-gray-700" />
            ),
          },
        ]}
        onClick={(key) => {
          if (key === "logout") {
            handleLogout();
          } else if (key === "order-history") {
            navigate(ROUTE_USER_ORDER_HISTORY);
          }
        }}
      />
    </div>
  );
};

export default UserMenu;
