"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Account } from "@/models/auth";
import { getLocalAccount, getLocalProfile } from "@/utils/local_store";
import { Profile } from "@/models/user_profiles";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const storedUser = getLocalAccount();
    const storedProfile = getLocalProfile();
    if (storedUser && storedProfile) {
      setProfile(storedProfile);
      setAccount(storedUser);
    } else {
      setAccount(null);
      setProfile(null);
    }
  }, []);

  return (
    <header className="bg-transparent w-full py-4 px-4 sm:px-6 lg:px-8 from-gray-900 to-gray-800 backdrop-blur-lg fixed top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo et nom */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">How to ?</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8"></nav>

        {/* Boutons de connexion et inscription */}

        {!account && !profile ? (
          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant="outline"
              className="hidden md:inline-flex border-blue-600 text-white bg-blue-600 "
            >
              <Link href="/signin">Sign in</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="hidden md:inline-flex bg-transparent border-blue-600 text-blue-600 "
            >
              <Link href="/login">Log In</Link>
            </Button>
            {/* Menu mobile */}
            <Button variant="ghost" className="md:hidden text-blue-600">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        ) : (
          <div className="cursor-pointer flex items-center space-x-4" onClick={() => {router.push("/user-profile")}}>
            {/* Quick preview of account and profile */}
            <div className="text-white">
              <p className="font-bold">
                Welcome, {profile?.getFullName() || "User"}!
              </p>
              <p className="text-sm">Account: {account?.email || "N/A"}</p>
            </div>
            {/* Menu mobile */}
            <Button variant="ghost" className="md:hidden text-blue-600">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
