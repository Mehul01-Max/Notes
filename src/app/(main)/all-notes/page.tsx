"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNotes } from "@/lib/useNotes";
import NotesCard from "@/components/NotesCard";
function page() {
  const { notes } = useNotes();
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="text-[#AE85F4] font-bold text-3xl">All Notes</div>
          <div className="text-[#99A3B4]">Manage your knowledge collection</div>
        </div>
        <Link href="/notes/new">
          <Button className="text-black bg-[#AE85F4] px-4 py-2 rounded-md cursor-pointer hover:text-white">
            <Plus /> new Note
          </Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {notes.map((note) => {
          return (
            <NotesCard
              title={note.title}
              tags={note.tags}
              created_at={note.created_at}
              key={note.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default page;
