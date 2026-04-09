import { AdminRoute } from '../../components/guards/AdminRoute';
import { AdminSidebar } from './components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminRoute>
      <div className="flex min-h-screen bg-gray-100">
        <AdminSidebar />
        <main className="flex-1 p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </AdminRoute>
  );
}