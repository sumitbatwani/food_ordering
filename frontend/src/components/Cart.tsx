import { useEffect } from "react";
import { useGetCartQuery } from "../redux/services/cart";
import BillDetail from "./BillDetail";
import ProceedToPay from "./ProceedToPay";
import Product from "./Product";

const Cart = () => {
  const { data: cartData, refetch } = useGetCartQuery();
  useEffect(() => {
    refetch();
  }, [refetch]);

  const totalPrice =
    cartData?.items
      ?.reduce((total: any, item: any) => total + item.price * item.quantity, 0)
      ?.toFixed(2) || 0;

  return (
    <div className="bg-blue-50/50 h-full">
      <div className="font-semibold bg-white h-16 flex items-center px-4">
        My Cart
      </div>
      {cartData?.removed_items.length > 0 && (
        <div className="alert alert-warning p-4">
          <strong className="text-red-600">
            Some items were removed from your cart due to unavailability:
          </strong>
          <ul className="flex flex-col gap-2">
            {cartData?.removed_items.map((item: any) => (
              <li key={item.id}>
                <div className="w-36 h-36 border border-gray-200 flex items-center justify-center bg-gray-200">
                  {item.name}
                </div>
                <div className="text-red-500">Out of stock</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {cartData?.items?.length > 0 ? (
        <div>
          <div className="overflow-scroll max-h-[41rem] mt-4 p-4 px-6 bg-white rounded flex flex-col gap-4">
            {cartData?.items?.map((item: any) => {
              return (
                <Product
                  key={item.item_id}
                  id={item.item_id}
                  {...{ item }}
                  type="cart"
                />
              );
            })}
          </div>
          <BillDetail totalPrice={totalPrice} />
          <ProceedToPay />
        </div>
      ) : (
        <div className="mt-10 text-center w-full">Please add item to cart.</div>
      )}
    </div>
  );
};

export default Cart;
