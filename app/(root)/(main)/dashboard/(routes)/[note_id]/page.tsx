"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { BlockNoteView } from "@blocknote/mantine";
import { BlockNoteEditor, PartialBlock, Block } from "@blocknote/core";

import "@blocknote/mantine/style.css";
import "@blocknote/core/fonts/inter.css";

import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Spinner } from "@/components/ui/spinner";

export default function NotePage() {
  const { user, loading } = useAuth();
  const { note_id } = useParams();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | "loading"
  >("loading");

  const saveNote = async (blocks: Block[]) => {
    if (!user || !note_id) return;

    const noteRef = doc(db, "users", user.uid, "notes", note_id as string);
    await setDoc(noteRef, {
      content: JSON.stringify(blocks),
      updatedAt: new Date(),
    });
  };

  const loadNote = async () => {
    if (!user || !note_id) return;

    const noteRef = doc(db, "users", user.uid, "notes", note_id as string);
    const snapshot = await getDoc(noteRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      return data?.content ? JSON.parse(data.content) : undefined;
    }

    return undefined;
  };

  useEffect(() => {
    if (!user || !note_id) return;
    loadNote().then((blocks) => {
      setInitialContent(
        blocks ?? [
          {
            id: "initial",
            type: "paragraph",
            content: [],
          },
        ],
      );
    });
  }, [user, note_id]);

  const editor = useMemo(() => {
    if (initialContent === "loading") return undefined;
    return BlockNoteEditor.create({
      initialContent,
    });
  }, [initialContent]);

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>You must be logged in.</p>;
  if (!editor)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Spinner size={"large"} />
      </div>
    );

  return (
    <div className="h-full w-full overflow-auto">
      <BlockNoteView
        className="overflow-auto"
        theme="light"
        editor={editor}
        onChange={() => saveNote(editor.document)}
        spellCheck={false}
      />
    </div>
  );
}
