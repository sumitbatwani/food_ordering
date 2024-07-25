import { setShowCart, setShowOrderSuccess } from "../redux/features/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { useGetCartQuery } from "../redux/services/cart";
import { useCreateOrderMutation } from "../redux/services/orders";
import LoadingSpinner from "./LoadingSpinner";

const ProceedToPay = () => {
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { refetch } = useGetCartQuery();
  const proceedToCreateOrder = async () => {
    await createOrder()
      .unwrap()
      .then((response: any) => {
        console.log({ response });
        if (response?.status === "error") {
          refetch();
        } else {
          dispatch(setShowCart(false));
          dispatch(setShowOrderSuccess({ status: true, detail: response }));
        }
      })
      .catch((error: any) => {});
  };
  return (
    <div className="absolute bottom-1 w-full mt-4 p-4 px-6 bg-green-600 text-white rounded text-center">
      <button onClick={proceedToCreateOrder}>
        {isLoading ? <LoadingSpinner /> : "Proceed To Pay"}
      </button>
    </div>
  );
};

export default ProceedToPay;
