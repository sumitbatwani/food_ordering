import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "react-use";
import { ROUTE_ROOT } from "../../../constants/routes";
import {
  setAuthModal,
  setItemSearch,
  setShowCart,
} from "../../../redux/features/userSlice";
import { useAppDispatch } from "../../../redux/hooks";
import UserMenu from "./UserMenu";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [,] = useDebounce(
    () => {
      setDebouncedSearchTerm(search.replace(/\s/g, ""));
    },
    500,
    [search]
  );
  useEffect(() => {
    dispatch(setItemSearch(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);
  return (
    <div className="flex items-center border border-gray-200 w-full hover:border-gray-300 px-2 rounded mb-4 md:mb-0">
      <MagnifyingGlassIcon className="size-4 text-gray-600" />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="w-full border-0 focus:ring-0"
      />
    </div>
  );
};

const DeliveryInfo = () => (
  <div className="flex flex-col flex-shrink-0 md:mr-4">
    <span className="font-bold text-sm md:text-base">
      Delivery in 10 minutes
    </span>
    <span className="font-light text-xs md:text-sm">
      Mumbai, Maharashtra, India
    </span>
  </div>
);

export const Logo = () => (
  <div>
    <span className="text-yellow-500 text-4xl lowercase font-bold">order</span>
    <span className="text-green-500 text-4xl lowercase font-bold">it</span>
  </div>
);

const LogoButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="border-0"
      onClick={() => {
        navigate(ROUTE_ROOT);
      }}
    >
      <Logo />
    </button>
  );
};

const CartButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="group bg-green-700 w-max flex flex-shrink-0 gap-2 items-center border-0 rounded-lg text-white font-semibold py-3 px-2"
      onClick={() => dispatch(setShowCart(true))}
    >
      <ShoppingCartIcon className="size-6 group-hover:animate-bounce" />
      <span className="hidden md:block">My Cart</span>
    </button>
  );
};

const LoginButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="px-2 mx-4"
      onClick={() => dispatch(setAuthModal(true))}
    >
      Login
    </button>
  );
};

const Header = () => {
  const authToken = useSelector((state: any) => state.auth.token);

  return (
    <header className="flex flex-col md:flex-row md:gap-4 md:items-center relative w-full h-30 md:h-20 border-b border-gray-200 shadow-sm px-8">
      <div className="flex gap-4 items-center h-20 flex-shrink-0">
        <LogoButton />
        <div className="h-8 bg-gray-200 w-px" />
        <DeliveryInfo />
        <div className="flex items-center ml-auto md:hidden">
          <LoginButton />
          <CartButton />
        </div>
      </div>
      <SearchBar />
      <div className="hidden md:flex md:items-center">
        {!authToken && <LoginButton />}
        {authToken && <UserMenu />}
        <CartButton />
      </div>
      {/* <div className="ml-auto">
        <UserMenu />
      </div> */}
    </header>
  );
};

export default Header;
