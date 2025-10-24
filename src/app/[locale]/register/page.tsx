"use client";

import { useParams } from 'next/navigation';

export default function RegisterPage() {
  const params = useParams();
  const locale = params.locale as string;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, email, passwordHash: password })
    });
console.log(res);
    if (res.ok) {
      localStorage.setItem('mp:user', JSON.stringify({ username: email, name }));
      window.location.href = `/${locale}`;
    } else {
      alert('Registration failed');
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-playfair text-[#3A504B] mb-4 md:mb-6 text-center">Register</h1>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm text-[#3A504B] mb-1">Name</label>
            <input name="name" required className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] text-sm md:text-base" />
          </div>
          <div>
            <label className="block text-sm text-[#3A504B] mb-1">Email</label>
            <input name="email" type="email" required className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] text-sm md:text-base" />
          </div>
          <div>
            <label className="block text-sm text-[#3A504B] mb-1">Password</label>
            <input name="password" type="password" required className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF] text-sm md:text-base" />
          </div>
          <button type="submit" className="w-full bg-[#8ECDCF] text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-[#7BB8BA] transition-colors text-sm md:text-base">Sign up</button>
        </form>
        <div className="mt-4 text-center">
          <a href={`/${locale}/login`} className="text-xs md:text-sm text-[#3A504B] underline">Already have an account? Login</a>
        </div>
      </div>
    </div>
  );
}
