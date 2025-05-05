"use client";

import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createNoteAction } from "@/actions/notes";
// import { debounceTimeout } from "@/lib/constants";

type Props = { 
  user: User | null;
}

function NewNoteButton({ user }: Props) {
  // console.log(user?.email);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleClickNewNoteButton = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);

      // const savingToast = toast(
      //   "Saving Current Note", 
      //   { description: "Saving your current note before creating a new one!" }
      // );

      // await new Promise((resolve) => 
      //   setTimeout(resolve, debounceTimeout + 500), 
      // )

      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`);
      // router.push(`/?noteId=${uuid}&toastType=newNote`);

      toast.success(
        "New Note Created", 
        { description: "You have created a new note" }
      );
    }

    setLoading(false);
  }

  return (
    <Button
      onClick={handleClickNewNoteButton} 
      variant="secondary" 
      className="w-24" 
      disabled={loading} 
    >
      {loading ? <Loader2 className="animate-spin" /> : "New Note"}
    </Button>
  )
}

export default NewNoteButton;