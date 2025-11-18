import { useSocket } from "@/components/providers/SocketProvider";
import LoadingSmall from "@/components/shared/LoadingSmall";
import { useUpdateOrder } from "@/hooks/order.hooks";
import { useUpdateTableAll } from "@/hooks/tables.hooks";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

const ClearOrders = ({
  tableId,
  orderId,
}: {
  tableId: string;
  orderId: string;
}) => {
  const socket = useSocket();
  const pathname = usePathname();
  const paths = pathname.split("/");
  const istakeaway = paths.includes("takeaway");
  const { mutate: updateOrder, isPending } = useUpdateOrder(tableId);
  const { mutate: updateTable, isPending: statusPending } =
    useUpdateTableAll(tableId);
  const router = useRouter();
  const clearTable = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!orderId) {
      if (!istakeaway) {
        updateTable(
          { update: { status: "available" } },
          {
            onSuccess: (data) => {
              toast.success(data.message);
              localStorage.removeItem(tableId);
              window.dispatchEvent(new Event("local-storage-change"));
              router.push("/");
            },
            onError: (error) => {
              console.log(error.message);
              toast.error(error.message);
            },
          }
        );
        return;
      }
      localStorage.removeItem(tableId);
      window.dispatchEvent(new Event("local-storage-change"));
      return;
    }
    updateOrder(
      { orderId: orderId, status: "cancelled" },
      {
        onSuccess: (data) => {
          toast.success(data.message);
          if (socket && socket.connected) {
            console.log("updating other orders cancelled");
            socket.emit("clearOrders");
          }
          localStorage.removeItem(tableId);
          window.dispatchEvent(new Event("local-storage-change"));
          router.push("/");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <button
      onClick={clearTable}
      className={`flex-1 bg-red-600 flex items-center justify-center ${
        orderId || localStorage.getItem(tableId)
          ? ""
          : "bg-red-600/50 pointer-events-none"
      } hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors`}
    >
      {isPending || statusPending ? <LoadingSmall /> : "Clear All Order"}
    </button>
  );
};

export default ClearOrders;
