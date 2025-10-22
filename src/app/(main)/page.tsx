"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Upload } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import NotesCard from "@/components/NotesCard";
import Link from "next/link";
import { useNotes } from "@/lib/useNotes";
function Page() {
  const { notes } = useNotes();
  return (
    <div>
      <div
        className="flex flex-col justify-center p-8 text-white relative gap-8"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/15 z-10" />
        <div className="relative z-20 max-w-lg flex flex-col gap-8">
          <div className="text-[#8564ED] text-2xl md:text-4xl font-bold">
            Your Knowledge Universe
          </div>
          <div className="text-[#99A3B4] text-base md:text-xl">
            Connect ideas, discover patterns, and build your personal knowledge
            graph with the power of the Zettelkasten method.
          </div>
          <div className="flex gap-2">
            <Link href="/notes/new">
              <Button className="text-black bg-[#AE85F4] px-4 py-2 rounded-md cursor-pointer hover:text-white">
                <Plus /> Create First Note
              </Button>
            </Link>
            <Link href="/graph-view">
              <Button className="text-white bg-[#111219] px-4 py-2 rounded-md cursor-pointer">
                <Upload /> Explore Graph
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="px-8 py-8 rounded-md bg-[#11151C] border border-[#201C31] m-5 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 text-lg font-semibold items-center">
            <Clock className="text-[#935BF0]" /> Recent Notes
          </div>
          <div className="text-[#99A3B4] text-sm">
            Your latest thoughts and connections
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {notes.slice(0, 3).map((note) => {
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
    </div>
  );
}

export default Page;
