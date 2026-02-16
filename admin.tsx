import { useEffect } from 'react';
import { AdminDashboard } from './components/AdminDashboard';

export default function AdminPage() {
  useEffect(() => {
    // Set dark theme
    document.documentElement.classList.add('dark');
    document.title = 'Maxorva Admin Dashboard';
  }, []);

  return <AdminDashboard />;
}