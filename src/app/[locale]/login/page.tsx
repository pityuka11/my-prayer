"use client";

import { useParams } from 'next/navigation';

export default function LoginPage() {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 md:p-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#E8A96F] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xl">✞</span>
            </div>
            <h1 className="text-2xl font-playfair text-[#3A504B] font-bold">
              my prayer
            </h1>
          </div>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-playfair text-[#3A504B] mb-4 md:mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const email = (form.elements.namedItem('email') as HTMLInputElement).value;
          const username = email.split('@')[0] || 'user';
          localStorage.setItem('mp:user', JSON.stringify({ username }));
          window.location.href = `/${locale}`;
        }}>
          <div>
            <label className="block text-sm text-[#3A504B] mb-1">Email</label>
            <input name="email" type="email" required className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] text-sm md:text-base" />
          </div>
          <div>
            <label className="block text-sm text-[#3A504B] mb-1">Password</label>
            <input name="password" type="password" required className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] text-sm md:text-base" />
          </div>
          <button type="submit" className="w-full bg-[#8ECDCF] text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-[#7BB8BA] transition-colors text-sm md:text-base">Sign in</button>
        </form>
        <div className="mt-4 text-center">
          <a href={`/${locale}/register`} className="text-xs md:text-sm text-[#3A504B] underline">Create an account</a>
        </div>
      </div>
    </div>
  );
}
