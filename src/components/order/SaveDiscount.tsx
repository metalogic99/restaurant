import { useUpdateOrder } from "@/hooks/order.hooks";
import React from "react";
import { toast } from "sonner";

const SaveDiscount = ({
  tableId,
  data,
  closeEdit,
  discount,
  isPercentage,
}: {
  tableId: string;
  data: any;
  closeEdit: any;
  discount: number;
  isPercentage: boolean;
}) => {
  const { mutate: updateDiscount } = useUpdateOrder(tableId);
  const changeDiscount = () => {
    closeEdit();
    if (data) {
      updateDiscount(
        { orderId: data._id, discount: discount, isPercentage },
        {
          onSuccess: () => {
            toast.success("Discount updated");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } else {
      toast.error("Cant set discount without order");
    }
  };
  return (
    <button
      className="p-1 bg-forestGreen text-white rounded-lg"
      onClick={changeDiscount}
    >
      Save
    </button>
  );
};

export default SaveDiscount;
