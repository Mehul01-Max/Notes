"use client";
import "dotenv/config";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Hash, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { useNotes } from "@/lib/useNotes";
import Link from "next/link";
import { useAuthToken } from "@/lib/token";
import { useRouter } from "next/navigation";
import axios from "axios";
type Note = {
  id: string;
  title: string;
  clerk_user_id: string;
  tags: string[];
  body: string;
  created_at: Date;
};

function Page({ params }: { params: Promise<{ id: string }> }) {
  const [tags, setTags] = useState<string[]>([]);
  const [ctags, setCTags] = useState("");
  const [title, setTitle] = useState("");
  const [value, setValue] = useState<string | undefined>("");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { editNote } = useNotes();
  const token = useAuthToken();
  const save = async () => {
    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    setIsSaving(true);
    try {
      const { id } = await params;
      await editNote(id, title, value, tags);
      router.push("/all-notes");
    } catch (error) {
      console.error("Failed to save note:", error);
      alert("Failed to save note. Please try again.");
      setIsSaving(false);
    }
  };
  const fetchNotes = async () => {
    const { id } = await params;
    if (!token) return;
    if (!id) return;

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${id}`;
      const res = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTitle(res.data.note.title);
      setValue(res.data.note.body);
      setTags(res.data.note.tags);
      setCTags(res.data.note.tags.join(", "));
    } catch (err) {
      console.error("Failed to fetch notes", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, [token]);
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }
  return (
    <>
      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4 bg-[#1a1b26] p-8 rounded-lg border border-[#A578F2]/20">
            <Loader2 className="h-12 w-12 animate-spin text-[#A578F2]" />
            <p className="text-lg font-medium text-white">
              Saving your note...
            </p>
            <p className="text-sm text-gray-400">Please wait</p>
          </div>
        </div>
      )}
      <div className="flex flex-col h-full bg-[#111219] text-white">
        <div className="p-4 flex flex-col md:flex-row gap-2 items-start md:items-center">
          <Link href="/all-notes">
            <div className="flex gap-2 hover:bg-[#2D1E47] hover:text-[#D1B9F8] rounded-lg p-2 whitespace-nowrap cursor-pointer">
              {" "}
              <div>
                {" "}
                <ArrowLeft />{" "}
              </div>{" "}
              <div>Back to Notes</div>{" "}
            </div>{" "}
          </Link>
          <Input
            placeholder="Note title..."
            className="placeholder:text-[#99A3B4]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />{" "}
          <Button
            className="flex-1 bg-[#A578F2] text-black hover:text-white cursor-pointer"
            onClick={save}
          >
            {" "}
            <Save /> Save{" "}
          </Button>
        </div>
        {/* Main content */}
        <main className="flex-1 flex flex-col md:flex-row gap-4 p-4 ">
          {/* Editor */}
          <div className="flex flex-col flex-1 gap-4 justify-between">
            <MDEditor
              value={value}
              onChange={setValue}
              height="100%"
              preview="edit"
              className="w-full"
            />
            <div className="flex gap-2 items-center">
              <Hash />{" "}
              <Input
                placeholder="Tags (comma-sperated)"
                className="placeholder:text-[#99A3B4]"
                value={ctags}
                onChange={(e) => {
                  setCTags(e.target.value);
                  setTags(
                    e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter((tag) => tag.length > 0)
                  );
                }}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 border p-2 overflow-auto bg-[#0C1116]">
            <MDEditor.Markdown source={value} />
          </div>
        </main>
      </div>
    </>
  );
}

export default Page;
