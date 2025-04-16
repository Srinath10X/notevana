"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { auth } from "@/lib/auth";

type Note = {
  id: string;
  title?: string;
};

export default function SideBarNavigation() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchNotes = async () => {
      const notesSnapshot = await getDocs(
        collection(db, "users", user.uid, "notes"),
      );

      const notesList = notesSnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data()?.title || "Untitled",
      }));
      setNotes(notesList);
    };

    fetchNotes();
  }, []);

  const createNote = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const newNote = await addDoc(collection(db, "users", user.uid, "notes"), {
      title: "Untitled",
      note_data: JSON.stringify([]),
      created_at: Timestamp.now(),
    });

    router.push(`/dashboard/${newNote.id}`);
  };

  return (
    <>
      <div>
        <button
          onClick={createNote}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          + New Note
        </button>

        <div className="space-y-2">
          {notes.map((note) => (
            <>
              <div
                key={note.id}
                onClick={() => router.push(`/dashboard/${note.id}`)}
                className="cursor-pointer p-2 border rounded hover:bg-gray-100"
              >
                {note.title}
              </div>

              <button className="bg-red-500 p-1 cursor-pointer active:scale-95">
                Del
              </button>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
