"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

type UserState = {
  username: string;
} | null;

export default function UserButton() {
  const [user, setUser] = useState<UserState>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("mp:user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  const logout = () => {
    localStorage.removeItem("mp:user");
    setUser(null);
  };

  if (!user) {
    return (
      <Link href="/login" className="px-3 py-2 rounded bg-[#8ECDCF] text-white text-sm font-open-sans hover:bg-[#7BB8BA] transition-colors">
        Login
      </Link>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <span className="text-[#3A504B] font-open-sans text-sm">{user.username}</span>
      <button onClick={logout} className="px-3 py-2 rounded bg-[#E8A96F] text-white text-sm font-open-sans hover:opacity-90 transition-opacity">
        Logout
      </button>
    </div>
  );
}


