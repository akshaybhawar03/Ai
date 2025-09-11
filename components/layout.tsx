import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Mera Project</h1>
      </header>
      <main className="p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 Mera Project
      </footer>
    </div>
  );
}
