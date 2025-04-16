"use client";
import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import Image from "next/image";

export default function Header() {
  const isMobile = useMobile();

  return (
    <header className="fixed top-0 w-[95%] mx-[2.5%] my-6 z-10 px-4 md:px-8 py-2 flex items-center justify-between backdrop-blur-md bg-white/10 border-white/20 rounded-md">
      <Image src={"logo.svg"} height={42} width={42} alt="logo" />
      {isMobile && (
        <div className="space-x-4 text-white pl-16">
          <a className="hover:underline transition-all duration-300" href="#">
            Home
          </a>
          <a className="hover:underline" href="#">
            Features
          </a>
          <a className="hover:underline" href="#">
            Pricing
          </a>
          <a className="hover:underline" href="#">
            About
          </a>
        </div>
      )}
      <div className="space-x-3">
        <Button
          variant={"ghost"}
          className="hover:bg-transparent text-white hover:text-white active:scale-95 hover:cursor-pointer hover:border"
        >
          Login
        </Button>
        <Button
          variant={"secondary"}
          className="active:scale-95 hover:cursor-pointer"
        >
          Signup
        </Button>
      </div>
    </header>
  );
}
