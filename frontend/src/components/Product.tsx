import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setAuthModal } from "../redux/features/userSlice";
import { useAppDispatch } from "../redux/hooks";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "../redux/services/cart";
import LoadingSpinner from "./LoadingSpinner";

const Product = ({ item, type = "", id }: any) => {
  console.log({ id });
  const [stockAvailable, setStockAvailable] = useState(item?.stock || 0);
  const dispatch = useAppDispatch();
  const authToken = useSelector((state: any) => state.auth.token);

  const [addToCart, { isLoading: adding }] = useAddToCartMutation();
  const [removeFromCart, { isLoading: removing }] = useRemoveFromCartMutation();
  const { data: cart } = useGetCartQuery();

  const handleAddToCart = async (itemId: string, quantity: number) => {
    if (stockAvailable === 0) {
      return;
    }
    if (!authToken) {
      dispatch(setAuthModal(true));
      return;
    }

    await addToCart({
      item_id: itemId,
      quantity,
    })
      .unwrap()
      .then((response: any) => {
        setStockAvailable((prevState: number) => prevState - 1);
      })
      .catch((error: any) => {});
  };

  const handleRemoveFromCart = async (itemId: string, quantity: number) => {
    if (!authToken) {
      dispatch(setAuthModal(true));
      return;
    }

    await removeFromCart({
      item_id: itemId,
      quantity,
    })
      .unwrap()
      .then((response: any) => {
        setStockAvailable((prevState: number) => prevState + 1);
      })
      .catch((error: any) => {});
  };

  const cartItem = cart?.items?.find(
    (cartItem: any) => cartItem.item_id === id
  );
  const itemQuantityInCart = cartItem ? cartItem.quantity : 0;
  const isLoading = removing || adding;
  const disableAdd = stockAvailable === 0;
  return (
    <div
      className={classNames({
        "flex flex-row items-center gap-1": type === "cart",
      })}
    >
      {/* <img
        src={item.image_url}
        className="max-w-36"
      /> */}
      <div className="w-36 h-36 border border-gray-200 flex items-center justify-center bg-gray-200">
        {item.name}
      </div>
      <div>₹{item.price}</div>

      {item.stock <= 0 && <div className="text-red-500">Out of stock</div>}
      {item.stock > 0 && itemQuantityInCart === 0 && (
        <AddButton
          loading={isLoading}
          disabled={disableAdd}
          onAdd={() => handleAddToCart(id, 1)}
        />
      )}
      {item.stock > 0 && itemQuantityInCart > 0 && (
        <div
          className={classNames("flex items-center min-w-2", {
            "ml-auto": type === "cart",
          })}
        >
          {!isLoading && (
            <MinusButton onRemove={() => handleRemoveFromCart(id, 1)} />
          )}
          <Quantity
            loading={isLoading}
            quantity={itemQuantityInCart}
          />
          {!isLoading && (
            <PlusButton
              disabled={disableAdd}
              onAdd={() => handleAddToCart(id, 1)}
            />
          )}
        </div>
      )}
    </div>
  );
};

const MinusButton = ({ onRemove }: { onRemove: () => void }) => (
  <button
    onClick={onRemove}
    className="bg-green-600 text-white p-1 px-2 rounded-l"
  >
    -
  </button>
);

const Quantity = ({
  loading,
  quantity,
}: {
  loading: boolean;
  quantity: number;
}) => (
  <div className="bg-green-600 text-white p-1 px-2 ">
    {loading ? <LoadingSpinner /> : quantity}
  </div>
);

const PlusButton = ({
  disabled,
  onAdd,
}: {
  disabled: boolean;
  onAdd: () => void;
}) => (
  <button
    disabled={disabled}
    onClick={onAdd}
    className={classNames(
      " text-white p-1 px-2 rounded-r",
      {
        "bg-gray-400 cursor-not-allowed": disabled,
      },
      { "bg-green-600": !disabled }
    )}
  >
    +
  </button>
);

const AddButton = ({
  loading,
  disabled,
  onAdd,
}: {
  loading: boolean;
  disabled: boolean;
  onAdd: () => void;
}) => (
  <button
    disabled={disabled}
    onClick={onAdd}
    className="bg-green-600 text-white p-1 px-2 w-20 rounded"
  >
    {loading ? <LoadingSpinner /> : "Add"}
  </button>
);

export default Product;
