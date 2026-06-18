"use client";
import Link from 'next/link';
import { ShoppingCart, LayoutDashboard } from 'lucide-react';
import { Badge, Button } from 'antd';
import { useCartStore } from '@/store/useCartStore';
import { useState, useEffect } from 'react';
import CartDrawer from './CartDrawer';
import { usePathname } from 'next/navigation';
import { LogoutOutlined } from '@ant-design/icons';

export default function Navbar() {
  const { cart } = useCartStore();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMounted(true); }, []);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Hide navbar on login pages
  if (pathname === '/login' || pathname === '/admin/login') return null;

  const handleLogout = () => {
    document.cookie = "user_auth=; path=/; max-age=0";
    document.cookie = "admin_auth=; path=/; max-age=0";
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <LayoutDashboard className="text-blue-600" /> Shop<span className="text-gray-800">Admin</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/" className={`font-medium transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Do'kon</Link>
          <Link href="/admin" className={`font-medium transition-colors ${pathname.startsWith('/admin') ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>Admin Panel</Link>
          {mounted && (
            <>
              <Badge count={totalItems} showZero color="#2563eb">
                <Button type="text" className="flex items-center justify-center w-10 h-10 hover:bg-gray-50 rounded-full" onClick={() => setOpen(true)}>
                  <ShoppingCart size={22} className="text-gray-700" />
                </Button>
              </Badge>
              <CartDrawer open={open} onClose={() => setOpen(false)} />
            </>
          )}
          <Button
            type="text"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-500 font-medium"
          >
            Chiqish
          </Button>
        </div>
      </div>
    </nav>
  );
}
