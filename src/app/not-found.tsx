"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white px-4">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="text-[#935BF0] text-8xl font-bold">404</div>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-[#99A3B4] text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 mt-4">
          <Link href="/">
            <Button className="bg-[#AE85F4] text-black hover:text-white">
              <Home className="mr-2" /> Go Home
            </Button>
          </Link>
          <Button
            onClick={() => window.history.back()}
            className="bg-[#111219] text-white border border-[#201C31] hover:bg-[#151620]"
          >
            <ArrowLeft className="mr-2" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
