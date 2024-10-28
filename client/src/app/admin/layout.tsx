// app/admin/layout.tsx
import Sidebar from '@/components/admin/Sidebar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />     
      <main className="flex-1 w-full overflow-x-hidden bg-gray-100 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
