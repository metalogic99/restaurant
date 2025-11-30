"use client";

import { Bell } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useLogout } from "@/hooks/auth.hooks";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type NotificationType = {
  title?: string;
  message?: string;
};

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
    });
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
          setNotifications(parsed);
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

  if (pathname.startsWith("/guest")) return <></>;

  return (
    <div className="w-full h-20 border border-foreground flex items-center justify-between px-6">
      {/* Hamburger menu */}
      <div className="flex flex-col justify-center gap-1">
        <span className="w-6 h-1 bg-forestGreen rounded-sm"></span>
        <span className="w-4 h-1 bg-forestGreen rounded-sm"></span>
        <span className="w-2 h-1 bg-forestGreen rounded-sm"></span>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" height={50} width={50} alt="restaurant logo" />
      </div>

      {pathname === "/guest" ? null : (
        <div className="flex items-center gap-5">
          <div
            className="w-10 h-10 relative flex items-center justify-center rounded-full bg-gray-100 cursor-pointer"
            onClick={() => router.push("/notifications")}
            title="View Notifications"
          >
            <Bell className="text-red-700" size={27} />
            {notifications.length > 0 && (
              <div className="absolute top-0 left-0 -translate-x-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-500">
                <span className="text-sm font-semibold text-white">
                  {notifications.length}
                </span>
              </div>
            )}
          </div>

          {/* Avatar */}
          <Avatar>
            <AvatarImage src="" alt="User Avatar" />
            <AvatarFallback className="bg-gray-300 text-foreground">
              User
            </AvatarFallback>
          </Avatar>

          {/* Logout button */}
          <Button onClick={handleLogout} disabled={isPending}>
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Logout"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
