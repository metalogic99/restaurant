"use client";

import {
  LayoutDashboard,
  Utensils, 
  ChevronDown,
  ChevronRight,
  FolderPlus,
  Tag,
  Coffee,
  Menu,
  X,
  Table,
  Users,
  Album,
  Settings,
  Gem,
  BanknoteArrowDown,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { label: "Settings", icon: Settings, href: "/admin/settings" },
    { label: "Table Management", icon: Table, href: "/admin/tables" },
    { label: "User Management", icon: Users, href: "/admin/user-management" },
    { label: "Sales Report", icon: Album, href: "/admin/sales" },
    { label: "Today's Special", icon: Gem, href: "/admin/special" },
    {
      label: "Expense tracking",
      icon: BanknoteArrowDown,
      href: "/admin/expense",
    },
  ];

  const menuItems = [
    {
      label: "Add Category",
      icon: FolderPlus,
      href: "/admin/add-category",
    },
    {
      label: "Add Sub-Category",
      icon: Tag,
      href: "/admin/add-subCategory",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-40 w-64 h-screen bg-slate-900 text-white flex flex-col transition-transform md:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Coffee className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">RestaurantPOS</h2>
              <p className="text-sm text-slate-400">Admin Dashboard</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-slate-400"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start text-slate-200 transition-colors ${
                  pathname === item.href
                    ? "bg-blue-600 text-white hover:bg-blue-600"
                    : "hover:bg-slate-700"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}

          {/* Menu Management */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-200 hover:bg-slate-700 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Utensils className="mr-3 h-5 w-5" />
              Menu Management
              {isMenuOpen ? (
                <ChevronDown className="ml-auto h-4 w-4" />
              ) : (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </Button>

            {isMenuOpen && (
              <div className="space-y-1 pl-4 border-l-2 border-slate-700 ml-4">
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-slate-200 transition-colors ${
                        pathname === item.href
                          ? "bg-blue-600 text-white hover:bg-blue-600"
                          : "hover:bg-slate-700"
                      }`}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
