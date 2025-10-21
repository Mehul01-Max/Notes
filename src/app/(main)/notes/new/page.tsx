// This code for Page.tsx is now correct and will work with the fixed layout.
"use client";
import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";

function Page() {
  const [value, setValue] = useState<string | undefined>("# Hello World");

  return (
    <div className="flex flex-col h-full bg-[#111219] text-white">
      {/* Top bar */}
      <div className="p-4 flex flex-col md:flex-row gap-2 items-start md:items-center">
        <div className="flex gap-2 hover:bg-[#2D1E47] hover:text-[#D1B9F8] rounded-lg p-2 whitespace-nowrap cursor-pointer">
          {" "}
          <div>
            {" "}
            <ArrowLeft />{" "}
          </div>{" "}
          <div>Back to Notes</div>{" "}
        </div>{" "}
        <Input
          placeholder="Note title..."
          className="placeholder:text-[#99A3B4]"
        />{" "}
        <Button className="flex-1 bg-[#A578F2] text-black hover:text-white cursor-pointer">
          {" "}
          <Save /> Save{" "}
        </Button>
      </div>
      {/* Main content */}
      <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 overflow-hidden">
        {/* Editor */}
        <div className="flex-1 min-h-0">
          <MDEditor
            value={value}
            onChange={setValue}
            height="100%"
            preview="edit"
            className="w-full"
          />
        </div>

        {/* Preview */}
        <div className="flex-1 min-h-0 border p-2 overflow-auto bg-[#0C1116]">
          <MDEditor.Markdown source={value} />
        </div>
      </main>
    </div>
  );
}

export default Page;
