"use client";
import React, { useState, useEffect, useCallback } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { Trash, Edit } from "lucide-react";
import { useAuthToken } from "@/lib/token";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Note = {
  id: string;
  title: string;
  clerk_user_id: string;
  tags: string[];
  body: string;
  created_at: Date;
};

function Page({ params }: { params: Promise<{ id: string }> }) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const token = useAuthToken();
  const router = useRouter();

  const handleDelete = useCallback(async () => {
    setDeleting(true);
    try {
      const { id } = await params;
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${id}`;
      await axios.delete(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      router.push("/");
    } catch (err) {
      console.error("Failed to delete note", err);
      setDeleting(false);
    }
  }, [params, token, router]);

  const fetchNotes = useCallback(async () => {
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
      setNote(res.data.note);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    } finally {
      setLoading(false);
    }
  }, [params, token]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-400">Note not found</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <main className="flex-1 flex flex-col gap-4 p-4 h-full">
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            <div className="text-2xl font-bold break-words">{note.title}</div>
            <div className="flex gap-2 items-center flex-wrap">
              {note.tags.map((tag) => {
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
          </div>
          <div className="flex gap-4 items-start">
            <div
              className="text-gray-400 hover:text-gray-300 p-2 cursor-pointer"
              onClick={() => router.push(`/note/${note.id}/edit`)}
            >
              <Edit className="w-5 h-5" />
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="text-red-600 hover:text-red-500 p-2 cursor-pointer">
                  <Trash className="w-5 h-5" />
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your note &ldquo;{note.title}&rdquo;.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className="flex-1 border p-2 overflow-auto bg-[#0C1116] h-full">
          <MDEditor.Markdown source={note.body} />
        </div>
      </main>
    </div>
  );
}

export default Page;
