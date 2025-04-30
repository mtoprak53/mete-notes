"use client";

import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
import { logOutAction } from "@/actions/users";



function LogOutButton() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);

    // await new Promise((resolve) => setTimeout(resolve, 2000));

    // const errorMessage = null;
    // const errorMessage = "error when logging out !!";
    const { errorMessage } = await logOutAction();

    if (!errorMessage) {
      toast.success("Logged out", {
        description: "You have been logged out successfully",
      });
      router.push("/");
    } else {
      toast.error("Error", {
        description: errorMessage,
      });
    }

    setLoading(false);
  }

  return (
    <Button
      variant="outline" 
      onClick={handleLogOut}
      disabled={loading}
      className="w-24"
    >
      { loading ? <Loader2 className="animate-spin" /> : "Log Out" }
    </Button>
  )
}

export default LogOutButton

