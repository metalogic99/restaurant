"use client";
import React, { useMemo, useState } from "react";
import TableCard from "@/components/user/tableSection/TableCard";
import { useGetAllTables } from "@/hooks/tables.hooks";
import AdminError from "@/components/admin/AdminError";
import Loading from "@/components/shared/Loading";
import { useRouter } from "next/navigation";
import useSocketEvents from "@/utils/socketHandler";
import { ReservationPop } from "@/components/user/tableSection/ReservationPop";
import { useUser } from "@/components/providers/RoleProvider";

const AllTableSection = () => {
  useSocketEvents();
  const user = useUser();
  const role = JSON.parse(user.user.value).role;
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const { data, isLoading, error } = useGetAllTables();
  const router = useRouter();

  const filteredTable = useMemo(() => {
    switch (currentFilter) {
      case "all":
        return data?.data;
      case "occupied":
        return data?.data.filter((table) => table.status === "occupied");
      case "available":
        return data?.data.filter((table) => table.status === "available");
      default:
        return data?.data;
    }
  }, [currentFilter, data?.data]);
  if (error) {
    return <AdminError error={error.message} />;
  }
  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!data) {
    return <AdminError error="Error Fetching Tables" />;
  }

  const takeAwayClick = () => {
    router.push("/takeaway");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="w-full border border-gray-200 rounded-2xl grid md:grid-cols-4 grid-cols-1 p-6 bg-white gap-6 mb-10 shadow-lg">
          {[
            {
              label: "All Tables",
              value: "all",
            },
            {
              label: "Occupied",
              value: "occupied",
            },
            {
              label: "Available",
              value: "available",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentFilter(item.value)}
              className={`flex items-center justify-center ${
                currentFilter === item.value ? "border-orange border-2" : ""
              } h-24  shadow-xl rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:border-2 hover:border-black `}
            >
              <span className="text-lg font-semibold text-gray-800">
                {item.label}
              </span>
            </div>
          ))}
          <button
            onClick={takeAwayClick}
            className={`flex items-center justify-center h-24 bg-yellow-500 hover:bg-yellow-600  shadow-xl rounded-xl cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out hover:border-2 hover:border-black `}
          >
            <span className="text-lg font-semibold text-white">Take away</span>
          </button>
        </div>
        {(role === "admin" || role === "receptionist") && <ReservationPop />}
        {!filteredTable ? (
          <div>Cant filter tables</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {filteredTable.map((table, index) => (
              <TableCard key={index} table={table} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTableSection;
