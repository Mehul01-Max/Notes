"use client";
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuthToken } from './token';

type Note = {
    id: string;
    title: string;
    clerk_user_id: string;
    tags: string[];
    body: string;
    created_at: Date;
};

export function useNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const token = useAuthToken();
    
    const fetchNotes = useCallback(async () => {
        if (!token) return;
        
        try {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes`;
            console.log(url);
            const res = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            setNotes(res.data.notes);
        } catch (err) {
            console.error('Failed to fetch notes', err);
        }
    }, [token]);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const addNote = async (title: string, body: string | undefined, tags: string[]) => {
        console.log({ title, body, tags });
        await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/new`,
            { title, body, tags },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        fetchNotes();
    };

    const editNote = async (id: string, title: string, body: string | undefined, tags: string[]) => {
        await axios.put(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${id}`,
            { title, body, tags },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        fetchNotes();
    };

    const deleteNote = async (id: string) => {
        await axios.delete(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/notes/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        fetchNotes();
    };

    return { notes, addNote, editNote, deleteNote };
}