"use client"
import { useAuth } from "@/hooks/authContext";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  return (
    <div className="flex justify-center items-center h-screen">
      {user ? <div className="flex flex-col justify-center items-center gap-8">
        <h2 className="text-2xl md:text-4xl font-semibold leading-tight md:leading-10 pt-8">Welcome to Movielist, {user.email}</h2>
        <Link href={'/movies'} className="btn_primary">Movies</Link>
      </div>
        : <div className="flex flex-col justify-center items-center gap-8">
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight md:leading-10 pt-8">Welcome to Movielist.</h2>
          <Link href={'/login'} className="p-4 btn_secondary">Please Login</Link></div>}
    </div>
  );
}
