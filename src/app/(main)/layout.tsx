"use client";
import {
  PanelLeft,
  Upload,
  House,
  NotebookText,
  Search,
  Tags,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/nextjs";
import logo from "@/assets/logo.png";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const navigationList = [
    { name: "Dashboard", icon: <House />, link: "/" },
    { name: "All Notes", icon: <NotebookText />, link: "/all-notes" },
    { name: "Graph View", icon: <Upload />, link: "/graph-view" },
    { name: "Search", icon: <Search />, link: "/search" },
    { name: "Tags", icon: <Tags />, link: "/tags" },
  ];

  return (
    <div className="flex h-screen  text-white">
      {/* Backdrop: Only appears on mobile when the sidebar is open */}
      <div
        className={`fixed inset-0 bg-black/60 z-100 md:hidden ${
          isSidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`
          bg-[#0c0e12] flex flex-col justify-between p-2 h-full
          transition-all duration-300 ease-in-out z-200
          absolute md:relative w-72 overflow-x-hidden
          ${
            isSidebarOpen
              ? "translate-x-0 md:w-72" // Open state for mobile and desktop
              : "-translate-x-full md:translate-x-0 md:w-16" // Closed state for mobile and desktop
          }
        `}
      >
        <div className="flex flex-col gap-4 items-start">
          {/* Header */}
          <div className="flex gap-2 items-center px-2 py-2">
            <div
              className="w-[40px] h-[40px] rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "var(--gradient-primary)",
                boxShadow: "var(--shadow-glow)",
              }}
            >
              <Image src={logo.src} alt="Logo" className="w-8 h-8" />
            </div>
            <div
              className={`whitespace-nowrap transition-opacity duration-200 ${
                isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
              }`}
            >
              {isSidebarOpen && (
                <>
                  <div className="text-white text-lg">Zettelkasten</div>
                  <div className="text-[#898F98] text-md">
                    Knowledge Graph
                  </div>{" "}
                </>
              )}
            </div>
          </div>

          {/* Navigation Label */}
          <div
            className={`whitespace-nowrap transition-opacity duration-200 ${
              isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
            }`}
          >
            <div className={`text-[#898F98] rounded-lg px-2 py-2`}>
              Navigation
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 w-full">
            {navigationList.map((item) => (
              <Link
                href={item.link}
                key={item.link}
                className="no-underline w-full"
              >
                <div
                  className={`flex items-center gap-4 hover:bg-[#181C25] hover:text-white rounded-lg px-2 py-2 w-full ${
                    pathname === item.link
                      ? "bg-[#935BF0] text-black"
                      : "text-[#935BF0]"
                  }`}
                >
                  <div className="flex justify-center w-8">{item.icon}</div>
                  {isSidebarOpen && (
                    <div
                      className={`whitespace-nowrap transition-opacity duration-200 ${
                        isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
                      }`}
                    >
                      {item.name}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* Create Note Button */}
          <Link href="/notes/new" className="no-underline w-full">
            <Button
              className={`cursor-pointer flex items-center gap-2 text-black bg-[#9965F1] px-2 py-2 rounded-lg w-full hover:text-white
                ${isSidebarOpen ? "justify-start" : "justify-center"}
              `}
            >
              <Plus />
              {isSidebarOpen && (
                <span
                  className={`whitespace-nowrap transition-opacity duration-200 ${
                    isSidebarOpen ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                >
                  Create Notes
                </span>
              )}
            </Button>
          </Link>
        </div>

        {/* User Button */}
        <div
          className={`p-2 transition-all ${
            isSidebarOpen ? "self-start" : "self-center"
          }`}
        >
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-x-hidden">
        <div className="flex justify-between p-4">
          <PanelLeft
            className="text-white cursor-pointer hover:bg-[#2D1E47] hover:text-[#D1B9F8] p-1 h-8 w-8 rounded-md"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
          <div className="text-[#99A3B4] flex items-center">
            Welcome to your Knowledge Graph
          </div>
        </div>
        <main className="flex-1 min-h-0">{children}</main>
      </div>
    </div>
  );
}
