import { PencilIcon } from "lucide-react";
import React from "react";
import SaveDiscount from "./SaveDiscount";

interface DiscountProps {
  editingDiscount: boolean;
  discount: number;
  setDiscount: any;
  setEditDiscount: any;
  data: any;
  tableId: string;
  isPercentage: boolean;
  setIsPercentage: any;
}

const Discount = ({
  editingDiscount,
  discount,
  setDiscount,
  setEditDiscount,
  data,
  tableId,
  setIsPercentage,
  isPercentage,
}: DiscountProps) => {
  return (
    <td className="p-2 sm:p-3 text-xs flex gap-3 items-center text-forestGreen sm:text-sm font-bold">
      {!editingDiscount && (
        <span>
          {isPercentage ? "%" : "Rs. "} {discount}
        </span>
      )}
      {editingDiscount && (
        <>
          {isPercentage ? "%" : "Rs. "}
          <input
            value={discount}
            className="w-10"
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setDiscount(isNaN(value) ? 0 : value < 0 ? 0 : value);
            }}
            type="number"
            step="any"
          />
          <label className=" flex items-center gap-1">
            <input
              type="checkbox"
              checked={isPercentage}
              onChange={() => setIsPercentage(!isPercentage)}
            />
            <strong>Percentage</strong>
          </label>
        </>
      )}
      {!editingDiscount && (
        <PencilIcon
          className="cursor-pointer"
          onClick={() => setEditDiscount(true)}
          size={16}
        />
      )}

      {editingDiscount && (
        <SaveDiscount
          closeEdit={() => setEditDiscount(false)}
          data={data.data}
          tableId={tableId}
          discount={discount}
          isPercentage={isPercentage}
        />
      )}
    </td>
  );
};

export default Discount;
