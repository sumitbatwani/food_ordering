import { useGetOrdersQuery } from "../../redux/services/orders";

const OrderHistory = () => {
  const { data: orders } = useGetOrdersQuery();
  return (
    <div className="px-12">
      <div className="font-semibold text-xl">Orders History</div>
      {orders?.length === 0 && <div className="mt-2">No order</div>}
      {orders?.length > 0 && (
        <div className="flex flex-col gap-3 space-y-4 mt-4">
          {orders?.map((order: any) => (
            <OrderDetail
              key={order.id}
              order={order}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const OrderDetail = ({ order }: any) => {
  const { is_delivered, order_items, timestamp, total_price } = order;
  return (
    <div className="border border-gray-200 rounded p-4">
      <div>
        Delivered:{" "}
        {is_delivered ? `Delivered at ${timestamp}` : "Not delivered yet."}
        <div className="flex justify-between mt-4">
          {order_items?.map((item: any) => {
            return (
              <div key={item.id}>
                {/* <img
                src={item.image_url}
                width={100}
              /> */}
                <div className="w-36 h-36 border border-gray-200 flex items-center justify-center bg-gray-200">
                  {item.name}
                </div>
                ₹{item.price} x {item.quantity}{" "}
                {item.quantity > 1 ? "items" : "item"}
              </div>
            );
          })}
          <div className="mr-4">
            Bill details
            <div>Total</div>
            <div>₹{total_price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
