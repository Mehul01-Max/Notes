"use client";
import React from "react";
import { timeAgo } from "@/lib/timeAgo";
import { useRouter } from "next/navigation";
type NotesCardProps = {
  title: string;
  tags?: string[];
  id: string;
  created_at: Date;
};

function NotesCard({ title, tags, id, created_at }: NotesCardProps) {
  const router = useRouter();
  function handleClick() {
    router.push(`/note/${id}`);
  }
  return (
    <div
      className="p-4 rounded-md cursor-pointer bg-[#11151C] border border-[#201C31] hover:bg-[#151620] hover:border-[#2E244A] flex flex-col gap-4"
      onClick={handleClick}
    >
      <div className="text-xl text-white hover:text-[#935BF0] font-bold truncate">
        {title}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-wrap">
          {tags?.map((tag) => {
            return (
              <div
                className="bg-[#221D35] text-[#935BF0] px-3 py-1 rounded-full text-sm"
                key={tag}
              >
                #{tag}
              </div>
            );
          })}
        </div>
        <div className="text-sm text-[#99A3B4] whitespace-nowrap">
          {timeAgo(created_at)}
        </div>
      </div>
    </div>
  );
}

export default NotesCard;
