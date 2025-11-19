"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useGetAllTables } from "@/hooks/tables.hooks";
import AdminError from "@/components/admin/AdminError";
import Loading from "@/components/shared/Loading";
import { useRouter } from "next/navigation";
import ButtonActions from "@/components/user/tableSection/ButtonActions";
import { CheckCheck } from "lucide-react";
import { toast } from "sonner";
import ClearOrders from "@/components/user/tableSection/ClearOrders";
import {
  useAddOrder,
  useGetOrderbyTableId,
  useUpdateOrder,
} from "@/hooks/order.hooks";
import ModifyOrder from "@/components/order/ModifyOrder";
import { useSocket } from "@/components/providers/SocketProvider";
import useSocketEvents from "@/utils/socketHandler";
import BillModal from "@/components/order/BillModal";
import { useUser } from "@/components/providers/RoleProvider";
import Discount from "@/components/order/Discount";

interface HandleOrderProps {
  tableId: string;
  isTakeaway?: boolean;
}

const HandleOrder: React.FC<HandleOrderProps> = ({
  tableId,
  isTakeaway = false,
}) => {
  const user = useUser();
  const role = JSON.parse(user.user.value).role;
  const router = useRouter();
  const socket = useSocket();
  useSocketEvents(tableId);
  const { data, error, isLoading } = useGetOrderbyTableId(tableId);
  const { data: tables, error: tableError } = useGetAllTables();
  const { mutate: addOrder, isPending: addPending } = useAddOrder(tableId);
  const { mutate: updateOrder, isPending: updatePending } =
    useUpdateOrder(tableId);

  const [localDataResult, setLocalData] = useState([]);
  const [editingDiscount, setEditDiscount] = useState(false);
  const [isPercentage, setIsPercentage] = useState<boolean>(
    data && data.data && data?.data?.discount ? data.data.isPercentage : true
  );

  useEffect(() => {
    console.log("discount and type is", discount, isPercentage, data);
  }, [data]);

  const [showProductModifyModal, setShowModifyOrderModal] = useState<{
    product: {
      product: Product;
      quantity: number;
      notes: string;
      status: string;
    };
    type: string;
  } | null>(null);
  const [discount, setDiscount] = useState<number>(
    data && data.data && data?.data?.discount ? data.data.discount : 0
  );
  const [billModal, setBillModal] = useState<boolean>(false);

  useEffect(() => {
    setDiscount(
      data && data.data && data?.data?.discount ? data.data.discount : 0
    );
    setIsPercentage(
      data && data.data && data?.data?.discount ? data.data.isPercentage : true
    );
  }, [data?.data, data]);

  useEffect(() => {
    const getLocalStorageData = () => {
      const local = JSON.parse(localStorage.getItem(tableId) as string) || [];
      setLocalData(local);
    };
    getLocalStorageData();
    window.addEventListener("local-storage-change", getLocalStorageData);

    return () => {
      window.removeEventListener("local-storage-change", getLocalStorageData);
    };
  }, [tableId]);

  const calculateTotal = useCallback(() => {
    let grossTotal = data?.data?.grossTotal ?? 0;
    let total = data?.data?.total ?? 0;

    if (data?.data?.orderedProducts && !data?.data?.grossTotal) {
      grossTotal += data.data.orderedProducts.reduce(
        (sum: number, product: OrderedProduct) =>
          sum + product.product.price * product.quantity,
        0
      );
    }

    if (localDataResult && localDataResult.length > 0) {
      grossTotal += localDataResult.reduce(
        (sum: number, product: LocalOrderItem) =>
          sum + product.product.price * product.quantity,
        0
      );
    }

    if (isPercentage) {
      total = grossTotal - (discount / 100) * grossTotal;
      total = parseInt(total.toFixed(1));
    } else {
      total = grossTotal - discount;
    }
    return { grossTotal, total };
  }, [
    discount,
    data?.data?.grossTotal,
    data?.data?.total,
    data?.data?.orderedProducts,
    localDataResult,
    isPercentage,
  ]);

  if (error) {
    return <AdminError error={error.message} />;
  }

  if (isLoading) {
    return (
      <section className="w-full flex items-center justify-center lg:w-1/2 px-2 sm:px-4 lg:px-0 lg:ml-4 xl:ml-6 2xl:ml-8 mt-6 lg:mt-0">
        <Loading />
      </section>
    );
  }

  if (!data) {
    return <AdminError error="Trouble fetching order data" />;
  }

  const changeTableHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isTakeaway) {
      router.push(`/takeaway/${e.target.value}`);
    } else {
      router.push(`/${e.target.value}`);
    }
  };

  const orderClickHandler = () => {
    const localStorageData =
      JSON.parse(localStorage.getItem(tableId) as string) || [];

    if (localStorageData.length === 0) {
      toast.error("Please add items to your order first");
      return;
    }

    if (data.data) {
      const updateOrderData: UpdateOrder[] = localStorageData.map(
        (added: LocalOrderItem) => ({
          productId: added.product._id,
          quantity: added.quantity,
          notes: added.notes || "",
        })
      );
      updateOrder(
        {
          orderId: data.data._id,
          updateData: updateOrderData,
          discount: discount,
          isPercentage: isPercentage,
        },
        {
          onSuccess: (data) => {
            toast.success(data.message);
            if (socket && socket.connected) {
              socket.emit("updateOrder", tableId);
            }
            localStorage.removeItem(tableId);
            window.dispatchEvent(new Event("local-storage-change"));
          },
          onError: (error: any) => {
            toast.error(error.message || "Failed to update order");
          },
        }
      );
    } else {
      const addOrderData: AddOrder[] = localStorageData.map(
        (added: LocalOrderItem) => ({
          productId: added.product._id,
          quantity: added.quantity,
          notes: added.notes || "",
        })
      );
      addOrder(
        {
          orderType: isTakeaway ? "takeaway" : "dineIn",
          currentOrders: addOrderData,
          discount: discount,
        },
        {
          onSuccess: (data) => {
            toast.success(
              data.message ||
                (isTakeaway
                  ? "Takeaway order created successfully"
                  : "Order created successfully")
            );
            if (socket && socket.connected) {
              socket.emit("updateOrder", tableId);
              socket.emit("clearOrders");
            }
            if (isTakeaway) {
              router.push(`/takeaway`);
            }
            localStorage.removeItem(tableId);
            window.dispatchEvent(new Event("local-storage-change"));
          },
          onError: (error: any) => {
            toast.error(error.message || "Failed to create order");
          },
        }
      );
    }
  };

  const totalAmount = calculateTotal();

  return (
    <section className="w-full lg:w-1/2 px-2 sm:px-4 lg:px-0 lg:ml-4 xl:ml-6 2xl:ml-8 mt-6 lg:mt-0">
      {!isTakeaway && tableError ? (
        <AdminError error={tableError.message} />
      ) : (
        !isTakeaway &&
        tables && (
          <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-4 sm:mb-6">
            <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
              Table: {}
            </span>
            <select
              defaultValue={tableId}
              onChange={changeTableHandler}
              className="w-full xs:w-auto xs:min-w-[120px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-500 text-sm sm:text-base"
            >
              {tables.data.map((table: Table) => (
                <option key={table._id} value={table._id}>
                  Table {table.tableName}
                </option>
              ))}
            </select>
          </div>
        )
      )}
      {showProductModifyModal && (
        <ModifyOrder
          productDescription={showProductModifyModal}
          onClose={() => setShowModifyOrderModal(null)}
          tableId={tableId}
          orderId={data.data ? data.data._id : ""}
        />
      )}

      <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-2xl shadow-md">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
          {isTakeaway ? "Takeaway Order Summary" : "Order Summary"}
        </h2>

        <div className="overflow-x-auto mb-4 sm:mb-6">
          <div className="hidden sm:block">
            <table className="w-full border border-gray-200 rounded-md overflow-hidden min-w-full">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 sm:p-3 border-b text-xs sm:text-sm font-semibold">
                    Product Name
                  </th>
                  <th className="p-2 sm:p-3 border-b text-xs sm:text-sm font-semibold">
                    Quantity
                  </th>
                  <th className="p-2 sm:p-3 border-b text-xs sm:text-sm font-semibold">
                    Price
                  </th>
                  <th className="p-2 sm:p-3 border-b text-xs sm:text-sm font-semibold">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data &&
                data.data.orderedProducts &&
                data.data.orderedProducts.length > 0
                  ? data.data.orderedProducts.map((product, index) => (
                      <tr
                        key={`server-${index}`}
                        className="border-t hover:bg-gray-50"
                        onClick={() =>
                          setShowModifyOrderModal({
                            product: product,
                            type: "ordered",
                          })
                        }
                      >
                        <td className="p-2 sm:p-3 text-xs sm:text-sm">
                          {product.product.name}
                        </td>
                        <td className="p-2 sm:p-3 text-xs sm:text-sm">
                          {product.quantity}
                        </td>
                        <td className="p-2 sm:p-3 text-xs sm:text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <span>
                              Rs. {product.product.price * product.quantity}
                            </span>
                            {product.status === "completed" && (
                              <CheckCheck
                                className="text-forestGreen"
                                size={16}
                              />
                            )}
                          </div>
                        </td>
                        <td className="p-2 sm:p-3 text-xs sm:text-sm">
                          {product.notes}
                        </td>
                      </tr>
                    ))
                  : null}

                {localDataResult &&
                  localDataResult.length > 0 &&
                  localDataResult.map((added: any, index: number) => (
                    <tr
                      key={`local-${index}`}
                      className="border-t hover:bg-gray-50 bg-yellow-50"
                      onClick={() =>
                        setShowModifyOrderModal({
                          product: added,
                          type: "added",
                        })
                      }
                    >
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {added.product.name}
                        <span className="ml-2 text-xs text-orange-600">
                          (Pending)
                        </span>
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {added.quantity}
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <span>
                            Rs. {added.product.price * added.quantity}
                          </span>
                        </div>
                      </td>
                      <td className="p-2 sm:p-3 text-xs sm:text-sm">
                        {added.notes}
                      </td>
                    </tr>
                  ))}

                {!data.data?.orderedProducts?.length &&
                  !localDataResult?.length && (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-4 sm:p-6 text-center text-gray-500 text-xs sm:text-sm"
                      >
                        No items added.
                      </td>
                    </tr>
                  )}

                {(role === "admin" || role === "receptionist") && (
                  <tr className="bg-gray-50 font-semibold border-t">
                    <td className="p-2 sm:p-3 text-xs sm:text-sm" colSpan={3}>
                      GrossTotal
                    </td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm font-bold">
                      Rs. {totalAmount.grossTotal}
                    </td>
                  </tr>
                )}
                {(role === "admin" || role === "receptionist") && (
                  <tr className="bg-gray-50 font-semibold border-t">
                    <td
                      className="p-2 sm:p-3 text-xs text-forestGreen sm:text-sm"
                      colSpan={3}
                    >
                      Discount
                    </td>
                    <Discount
                      tableId={tableId}
                      setDiscount={setDiscount}
                      setEditDiscount={setEditDiscount}
                      data={data}
                      discount={discount}
                      editingDiscount={editingDiscount}
                      isPercentage={isPercentage}
                      setIsPercentage={setIsPercentage}
                    />
                  </tr>
                )}
                {(role === "admin" || role === "receptionist") && (
                  <tr className="bg-gray-50 font-semibold border-t">
                    <td className="p-2 sm:p-3 text-xs sm:text-sm" colSpan={3}>
                      Total
                    </td>
                    <td className="p-2 sm:p-3 text-xs sm:text-sm font-bold">
                      Rs. {totalAmount.total}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="block sm:hidden space-y-3">
            {data &&
              data.data?.orderedProducts.length &&
              data.data?.orderedProducts?.length > 0 &&
              data.data.orderedProducts.map((product: OrderedProduct) => (
                <div
                  key={product.product._id}
                  className="bg-gray-50 p-3 rounded-lg border"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm text-gray-800 truncate flex-1 mr-2">
                      {product.product.name}
                    </span>
                    <span className="text-sm text-gray-600">
                      ×{product.quantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-sm text-green-600">
                      Rs. {product.product.price * product.quantity}
                    </span>
                  </div>
                </div>
              ))}

            {localDataResult?.length > 0 &&
              localDataResult.map((added: LocalOrderItem, index: number) => (
                <div
                  key={`mobile-local-${index}`}
                  className="bg-yellow-50 p-3 rounded-lg border border-orange-200"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium text-sm text-gray-800 truncate flex-1 mr-2">
                      {added.product.name}
                      <span className="ml-2 text-xs text-orange-600">
                        (Pending)
                      </span>
                    </span>
                    <span className="text-sm text-gray-600">
                      ×{added.quantity}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-sm text-green-600">
                      Rs. {added.product.price * added.quantity}
                    </span>
                  </div>
                </div>
              ))}

            {(role === "admin" || role === "receptionist") && (
              <div className="bg-gray-100 p-3 rounded-lg border-2 border-gray-300">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base">GrossTotal</span>
                  <span className="font-bold text-base">
                    Rs. {totalAmount.grossTotal}
                  </span>
                </div>
                <div className="flex justify-between items-center text-forestGreen">
                  <span className="font-bold text-base">Discount</span>
                  <div className="font-bold text-base flex items-center">
                    <span>Rs</span>
                    <input
                      className="w-8"
                      value={discount}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setDiscount(isNaN(value) ? 0 : value < 0 ? 0 : value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-base">Total</span>
                  <span className="font-bold text-base">
                    Rs. {totalAmount.total}
                  </span>
                </div>
              </div>
            )}

            {!data.data?.orderedProducts?.length &&
              !localDataResult?.length && (
                <div className="text-center py-6">
                  <p className="text-gray-500 text-sm">No items added.</p>
                </div>
              )}
          </div>
        </div>

        {billModal && data.data && (
          <BillModal order={data.data} onClose={() => setBillModal(false)} />
        )}

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 2xl:grid-cols-4 gap-2 sm:gap-3">
          <ButtonActions
            localDataResult={localDataResult}
            isLoading={updatePending || addPending}
            onClick={orderClickHandler}
            bg="bg-blue-600"
            bg_hover="hover:bg-blue-700"
            text="Order"
          />

          <ClearOrders
            tableId={tableId}
            orderId={data.data ? data.data._id : ""}
          />
          {(role === "admin" || role === "receptionist") && (
            <ButtonActions
              orderId={data.data ? data.data._id : ""}
              isLoading={false}
              onClick={() => {
                if (!data.data) {
                  return;
                }
                setBillModal(true);
              }}
              bg="bg-green-600"
              bg_hover="hover:bg-green-700"
              text="Finish Payment"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HandleOrder;
