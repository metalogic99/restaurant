"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  useDeleteReservation,
  useGetReservationsSearch,
} from "@/hooks/reservation.hooks";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Reservation = () => {
  const [activeTab, setActiveTab] = useState<"today" | "upcoming" | "past">(
    "today"
  );

  const { data: reservations, isLoading: loading } =
    useGetReservationsSearch(activeTab);

  const { mutate, isPending } = useDeleteReservation(activeTab);

  const handleDelete = async (id: string) => {
    console.log("string is", id);
    mutate(id, {
      onSuccess: () => {
        toast.success("Reservation Deletion Successful");
      },

      onError: (e) => {
        console.log("error reservation deleteion", e);
        toast.error("Reservation deletion Failed");
      },
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reservations</h1>

      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "today" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("today")}
        >
          Today
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "upcoming" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "past" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>

      {loading ? (
        <p>Loading reservations...</p>
      ) : !reservations || reservations.reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reservations.reservations.map((res: any) => (
            <div key={res._id} className="border p-4 rounded shadow relative">
              <h2 className="font-semibold text-lg">{res.name}</h2>
              <p>
                Table: {res.table.tableName} | People: {res.peopleNos}
              </p>
              <p>Phone: {res.phone}</p>
              <p>
                Time:{" "}
                {new Date(res.time).toLocaleString("en-US", {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </p>
              <p>Pre-Ordered: {res.preOrdered ? "Yes" : "No"}</p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete it?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(res._id)}
                      disabled={isPending}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservation;
