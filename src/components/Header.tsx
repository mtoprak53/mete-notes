import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/auth/server";

async function Header() {
  // const user = null;
  // const user = "mete";
  const user = await getUser();

  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8"
      style={{
        boxShadow: shadow
      }}>
      <Link className="flex items-end gap-2" href="/">
        <Image
          src="/kurt.png"
          alt="METE Notes Logo"
          width={60}
          height={60}
          className="rounded-full"
          priority
        />

        <h1 className="flex flex-col text-2xl font-semibold leading-6">
          METE <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
          <Button asChild>
            <Link href="/sign-up" className="hidden sm:block">
              Sign Up
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">
              Login
            </Link>
          </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  )
}

export default Header;