"use client"
import { useUpdateTable } from "@/hooks/tables.hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSocket } from "../providers/SocketProvider";

const OccupyTable = () => {
  const searchParams = useSearchParams();
  const { mutate: updateStatus } = useUpdateTable();
  const router = useRouter();
  const socket = useSocket();
  const [tableId, setTableId] = useState<string>("");
  const [message, setMessage] = useState<{ success: boolean; message: string }>(
    { success: false, message: "" }
  );

  useEffect(() => {
    const id = searchParams.get("tableId");
    if (id) {
      setTableId(id);
      updateStatus(
        {
          tableId: id,
          update: {
            status: "occupied",
          },
        },
        {
          onSuccess: (data) => {
            socket?.emit("occupyTable");
            setMessage({
              success: data.success,
              message: "Successful, You have Occupied the table",
            });
          },
          onError: (error) => {
            console.log(error);
            setMessage({
              success: false,
              message: "Oops! Couldn't Occupy the table",
            });
          },
        }
      );
      const params = new URLSearchParams(searchParams.toString());
      params.delete("tableId");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [router, searchParams, updateStatus, socket]);
  return (
    <div>
      {tableId && message.message && (
        <div
          className={`py-4 px-2 text-semibold ${
            message.success
              ? "bg-green-50 text-green-800"
              : "bg-red-200 text-red-600"
          }`}
        >
          <span>{message.message}</span>
        </div>
      )}
    </div>
  );
};

export default OccupyTable;
