// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { ArrowLeft, Bell, X } from "lucide-react";
// import { Button } from "@/components/ui/button";

// type NotificationType = {
//   title?: string;
//   message?: string;
//   content?: string;
//   timestamp?: string | number;
// };

// const Notifications = () => {
//   const router = useRouter();
//   const [notifications, setNotifications] = useState<NotificationType[]>([]);

//   useEffect(() => {
//     const getLocalStorageData = () => {
//       try {
//         const raw = localStorage.getItem("notifications");
//         if (!raw) {
//           setNotifications([]);
//           return;
//         }
//         const parsed = JSON.parse(raw);
//         if (Array.isArray(parsed)) {
//           // Reverse to show latest notification first
//           setNotifications(parsed.slice().reverse());
//         } else {
//           setNotifications([]);
//         }
//       } catch {
//         setNotifications([]);
//       }
//     };
//     getLocalStorageData();
//     window.addEventListener("notification-change", getLocalStorageData);
//     return () => {
//       window.removeEventListener("notification-change", getLocalStorageData);
//     };
//   }, []);

//   const clearAllNotifications = () => {
//     localStorage.setItem("notifications", JSON.stringify([]));
//     setNotifications([]);
//     window.dispatchEvent(new Event("notification-change"));
//   };

//   const removeNotification = (index: number) => {
//     const updated = notifications.filter((_, i) => i !== index);
//     localStorage.setItem("notifications", JSON.stringify(updated));
//     setNotifications(updated);
//     window.dispatchEvent(new Event("notification-change"));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white border-b px-4 py-4 shadow-sm">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Button variant="ghost" size="sm" onClick={() => router.back()}>
//               <ArrowLeft size={20} />
//             </Button>
//             <h1 className="text-xl font-semibold text-gray-900">
//               Notifications
//             </h1>
//           </div>
//           {notifications.length > 0 && (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={clearAllNotifications}
//               className="text-red-600 hover:text-red-700"
//             >
//               Clear All
//             </Button>
//           )}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="px-4 py-6">
//         {notifications.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-12">
//             <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
//               <Bell size={24} className="text-gray-400" />
//             </div>
//             <h2 className="text-lg font-medium text-gray-900 mb-2">
//               No notifications
//             </h2>
//             <p className="text-gray-500 text-center">
//               New notifications will appear here.
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {notifications.map((notification, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <p className="text-gray-600 text-sm mb-2">
//                       {notification.message ||
//                         notification.content ||
//                         "New notification"}
//                     </p>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => removeNotification(index)}
//                     className="p-1 hover:bg-gray-100"
//                   >
//                     <X size={16} className="text-gray-400" />
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Notifications;



"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type NotificationType = {
  title?: string;
  message?: string;
  content?: string;
  timestamp?: string | number;
};

const Notifications = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  // Function to format timestamp to MM/DD/YYYY format
  const formatDate = (timestamp?: string | number): string => {
    if (!timestamp) return new Date().toLocaleDateString('en-US');
    
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US');
  };

  useEffect(() => {
    const getLocalStorageData = () => {
      try {
        const raw = localStorage.getItem("notifications");
        if (!raw) {
          setNotifications([]);
          return;
        }
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Reverse to show latest notification first
          setNotifications(parsed.slice().reverse());
        } else {
          setNotifications([]);
        }
      } catch {
        setNotifications([]);
      }
    };
    getLocalStorageData();
    window.addEventListener("notification-change", getLocalStorageData);
    return () => {
      window.removeEventListener("notification-change", getLocalStorageData);
    };
  }, []);

  const clearAllNotifications = () => {
    localStorage.setItem("notifications", JSON.stringify([]));
    setNotifications([]);
    window.dispatchEvent(new Event("notification-change"));
  };

  const removeNotification = (index: number) => {
    const updated = notifications.filter((_, i) => i !== index);
    // Need to reverse back to original order for localStorage
    const originalOrder = updated.slice().reverse();
    localStorage.setItem("notifications", JSON.stringify(originalOrder));
    setNotifications(updated);
    window.dispatchEvent(new Event("notification-change"));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Notifications
            </h1>
          </div>
          {notifications.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllNotifications}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Bell size={24} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              No notifications
            </h2>
            <p className="text-gray-500 text-center">
              New notifications will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-gray-600 text-sm mb-2">
                      {notification.message ||
                        notification.content ||
                        "New notification"}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatDate(notification.timestamp)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeNotification(index)}
                    className="p-1 hover:bg-gray-100"
                  >
                    <X size={16} className="text-gray-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;