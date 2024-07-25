const BillDetail = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <div className="mt-4 p-4 px-6 bg-white rounded">
      <div className="font-semibold">Bill details</div>
      <div className="flex justify-between">
        <div>Grand total</div>
        <div>₹{totalPrice}</div>
      </div>
    </div>
  );
};

export default BillDetail;
