"use client";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F2] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        <h1 className="text-3xl font-playfair text-[#3A504B] mb-6 text-center">Login</h1>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const email = (form.elements.namedItem('email') as HTMLInputElement).value;
          const username = email.split('@')[0] || 'user';
          localStorage.setItem('mp:user', JSON.stringify({ username }));
          window.location.href = '/hu';
        }}>
          <div>
            <label className="block text-sm text-[#3A504B] mb-1">Email</label>
            <input name="email" type="email" required className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]" />
          </div>
          <div>
            <label className="block text-sm text-[#3A504B] mb-1">Password</label>
            <input name="password" type="password" required className="w-full px-4 py-3 border border-[#8ECDCF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8ECDCF]" />
          </div>
          <button type="submit" className="w-full bg-[#8ECDCF] text-white py-3 rounded-lg font-semibold hover:bg-[#7BB8BA] transition-colors">Sign in</button>
        </form>
      </div>
    </div>
  );
}
