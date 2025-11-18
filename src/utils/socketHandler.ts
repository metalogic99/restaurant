// import { useEffect, useRef } from "react";
// import { useSocket } from "@/components/providers/SocketProvider";
// import { useGetOrderbyStatus, useGetOrderbyTableId } from "@/hooks/order.hooks";
// import { useGetAllTables } from "@/hooks/tables.hooks";
// import { playNotification } from "./playNotification";

// const useSocketEvents = (tableId?: string) => {
//   const { refetch } = useGetOrderbyTableId(tableId ?? "");
//   const { refetch: ordersRefetch } = useGetOrderbyStatus("pending");
//   const { refetch: tablesRefetch } = useGetAllTables();
//   const socket = useSocket();

//   const listenersAddedRef = useRef(false);

//   useEffect(() => {
//     if (!socket) {
//       console.log("Socket not yet initialized, skipping event registration");
//       return;
//     }

//     if (listenersAddedRef.current) {
//       return;
//     }

//     listenersAddedRef.current = true;

//     const handleProductCompleted = (data: any) => {
//       let notifications: any[] = [];
//       try {
//         const localData = localStorage.getItem("notifications");
//         notifications = localData ? JSON.parse(localData) : [];
//         if (!Array.isArray(notifications)) {
//           notifications = [];
//         }
//       } catch (err) {
//         console.error("Failed to parse notifications from localStorage:", err);
//         notifications = [];
//       }
//       notifications.push(data);
//       localStorage.setItem("notifications", JSON.stringify(notifications));
//       window.dispatchEvent(new Event("notification-change"));
//       playNotification();
//     };

//     const handleUpdateOrder = (data: any) => {
//       refetch();
//       ordersRefetch();
//       playNotification();
//       console.log(data);
//     };

//     const handleTablesRefetch = () => {
//       tablesRefetch();
//     };

//     const handleClearOrders = () => {
//       refetch();
//       ordersRefetch();
//       tablesRefetch();
//     };
//     const handleDeleteNotification = (data: any) => {
//       let notifications: any[] = [];
//       try {
//         const localData = localStorage.getItem("notifications");
//         notifications = localData ? JSON.parse(localData) : [];
//         if (!Array.isArray(notifications)) {
//           notifications = [];
//         }
//         notifications = notifications.filter(
//           (item, notifIndex) => notifIndex !== data
//         );
//       } catch (err) {
//         console.error("Failed to parse notifications from localStorage:", err);
//         notifications = [];
//       }

//       localStorage.setItem("notifications", JSON.stringify(notifications));
//       window.dispatchEvent(new Event("notification-change"));
//     };

//     socket.on("connected", () => {
//       console.log("connected with socket");
//     });

//     socket.on("productCompleted", handleProductCompleted);
//     socket.on("updateOrder", handleUpdateOrder);
//     socket.on("clearOrders", handleClearOrders);
//     socket.on("deleteNotification", handleDeleteNotification);
//     socket.on("occupyTable", handleTablesRefetch);

//     return () => {
//       socket.off("productCompleted", handleProductCompleted);
//       socket.off("updateOrder", handleUpdateOrder);
//       socket.off("clearOrders", handleClearOrders);
//       socket.off("occupyTable", handleTablesRefetch);
//       listenersAddedRef.current = false;
//     };
//   }, [socket, refetch, ordersRefetch, tablesRefetch]);
// };

// export default useSocketEvents;

import { useEffect, useRef } from "react";
import { useSocket } from "@/components/providers/SocketProvider";
import { useGetOrderbyStatus, useGetOrderbyTableId } from "@/hooks/order.hooks";
import { useGetAllTables } from "@/hooks/tables.hooks";
import { playNotification } from "./playNotification";

const useSocketEvents = (tableId?: string) => {
  const { refetch } = useGetOrderbyTableId(tableId ?? "");
  const { refetch: ordersRefetch } = useGetOrderbyStatus("pending");
  const { refetch: tablesRefetch } = useGetAllTables();
  const socket = useSocket();
  const listenersAddedRef = useRef(false);

  useEffect(() => {
    if (!socket) {
      console.log("Socket not yet initialized, skipping event registration");
      return;
    }
    if (listenersAddedRef.current) {
      return;
    }
    listenersAddedRef.current = true;

    const handleProductCompleted = (data: any) => {
      let notifications: any[] = [];
      try {
        const localData = localStorage.getItem("notifications");
        notifications = localData ? JSON.parse(localData) : [];
        if (!Array.isArray(notifications)) {
          notifications = [];
        }
      } catch (err) {
        console.error("Failed to parse notifications from localStorage:", err);
        notifications = [];
      }

      // Add timestamp to the notification data
      const notificationWithTimestamp = {
        ...data,
        timestamp: new Date().toISOString(), // Add current timestamp
      };

      notifications.push(notificationWithTimestamp);
      localStorage.setItem("notifications", JSON.stringify(notifications));
      window.dispatchEvent(new Event("notification-change"));
      playNotification();
    };

    const handleUpdateOrder = (data: any) => {
      refetch();
      ordersRefetch();
      playNotification();
      console.log(data);
    };

    const handleTablesRefetch = () => {
      tablesRefetch();
    };

    const handleClearOrders = () => {
      refetch();
      ordersRefetch();
      tablesRefetch();
    };

    const handleDeleteNotification = (data: any) => {
      let notifications: any[] = [];
      try {
        const localData = localStorage.getItem("notifications");
        notifications = localData ? JSON.parse(localData) : [];
        if (!Array.isArray(notifications)) {
          notifications = [];
        }
        notifications = notifications.filter(
          (item, notifIndex) => notifIndex !== data
        );
      } catch (err) {
        console.error("Failed to parse notifications from localStorage:", err);
        notifications = [];
      }
      localStorage.setItem("notifications", JSON.stringify(notifications));
      window.dispatchEvent(new Event("notification-change"));
    };

    socket.on("connected", () => {
      console.log("connected with socket");
    });
    socket.on("productCompleted", handleProductCompleted);
    socket.on("updateOrder", handleUpdateOrder);
    socket.on("clearOrders", handleClearOrders);
    socket.on("deleteNotification", handleDeleteNotification);
    socket.on("occupyTable", handleTablesRefetch);

    return () => {
      socket.off("productCompleted", handleProductCompleted);
      socket.off("updateOrder", handleUpdateOrder);
      socket.off("clearOrders", handleClearOrders);
      socket.off("occupyTable", handleTablesRefetch);
      listenersAddedRef.current = false;
    };
  }, [socket, refetch, ordersRefetch, tablesRefetch]);
};

export default useSocketEvents;
