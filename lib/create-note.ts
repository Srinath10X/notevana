import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export const createNote = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const now = new Date();
  const noteId = now.toISOString();

  const ref = doc(db, "users", user.uid, "notes", noteId);

  await setDoc(ref, {
    title: "Untitled",
    note_data: [],
    updated_at: now,
  });

  return noteId;
};
