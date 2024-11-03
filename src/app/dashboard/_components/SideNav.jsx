"use client"

import React from "react";
import {
  BookOpen,
  GraduationCap,
  Hand,
  LayoutIcon,
  Settings,
} from "lucide-react";
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from "next/navigation";

const SideNav = () => {
  const { user } = useUser();

  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutIcon,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Students",
      icon: GraduationCap,
      path: "/dashboard/students",
    },
    {
      id: 3,
      name: "Attendance",
      icon: Hand,
      path: "/dashboard/attendance",
    },
    {
      id: 4,
      name: "Courses",
      icon: BookOpen,
      path: "/dashboard/courses",
    },
    {
      id: 5,
      name: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ];
  const path = usePathname();

  

  return (
    <div className="flex flex-col border shadow-md h-screen">
      <div className="p-4 border-b">
        <Link href= "/">
        <div className="flex items-center gap-2">
          <BookOpen size={32} className="text-emerald-700" />
          <h1 className="font-bold font-mono text-2xl text-emerald-700 cursor-pointer">
            AttendEase
          </h1>
        </div>
        </Link>
      </div>

      <nav className="flex-grow">
        {menuList.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className={`flex items-center rounded-lg m-2 gap-3 p-4 text-slate-600 hover:bg-emerald-600 hover:text-white transition-colors duration-200 ${path == menu.path && 'bg-emerald-600 text-white'}`}
          >
            <menu.icon size={20} aria-hidden="true" />
            <span>{menu.name}</span>
          </Link>
        ))}
      </nav>

      <div className="flex items-center p-4 border-t">
        <UserButton afterSignOutUrl="/" />
        {user && (
          <span className="ml-3 text-sm cursor-pointer flex flex-col">
            <div className="text-slate-800 font-bold">{user.fullName || user.username}</div>
            <div className="text-slate-500 text-xs">{user.emailAddresses[0].emailAddress}</div>
          </span>
        )}
      </div>
    </div>
  );
};

export default SideNav;