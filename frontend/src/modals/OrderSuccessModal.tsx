import Modal from "../components/Modal";

const OrderSuccessModal = ({
  orderDetail,
  onRequestClose,
}: {
  orderDetail: any;
  onRequestClose: () => void;
}) => {
  const formatDateUS = (
    dateString: string,
    year: boolean = true,
    monthLength: "long" | "short" = "short"
  ) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: year ? "numeric" : undefined,
      month: monthLength,
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      className="p-8"
      width={550}
      onRequestClose={onRequestClose}
      isOpen={true}
    >
      <div className="text-lg font-semibold text-green-600">
        You have successfully placed your order.
      </div>
      <div className="mt-2 font-serif">Order details</div>
      <div className="text-gray-600">Order Id: {orderDetail.id}</div>
      <div className="text-gray-600">
        Order Placed at {formatDateUS(orderDetail.timestamp)}
      </div>
      <div className="text-gray-600">
        Amount Paid: ₹{orderDetail.total_price}
      </div>
    </Modal>
  );
};

export default OrderSuccessModal;
