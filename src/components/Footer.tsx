"use client";
import Link from 'next/link';
import { ShoppingOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, InstagramOutlined, TwitterOutlined, LinkedinOutlined } from '@ant-design/icons';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on login pages
  if (pathname === '/login' || pathname === '/admin/login') return null;

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 mt-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <ShoppingOutlined className="text-white text-xl" />
              </div>
              <span className="text-white text-xl font-bold">Shop<span className="text-blue-400">Admin</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              O'zbekistonning eng ishonchli online do'koni. Sifatli mahsulotlar, tez yetkazib berish.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <InstagramOutlined className="text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <TwitterOutlined className="text-gray-400 hover:text-white" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <LinkedinOutlined className="text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Sahifalar</h3>
            <ul className="space-y-3">
              {[
                { label: "Do'kon", href: "/" },
                { label: "Admin Panel", href: "/admin" },
                { label: "Biz haqimizda", href: "#" },
                { label: "Blog", href: "#" },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Kategoriyalar</h3>
            <ul className="space-y-3">
              {["Elektronika", "Kiyim-kechak", "Poyabzal", "Go'zallik", "Sport", "Uy jihozlari"].map(item => (
                <li key={item}>
                  <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Aloqa</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <EnvironmentOutlined className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Toshkent, Chilonzor tumani, 15-mavze</span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneOutlined className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+998 90 123 45 67</span>
              </li>
              <li className="flex items-center gap-3">
                <MailOutlined className="text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@shopadmin.uz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2026 ShopAdmin. Barcha huquqlar himoyalangan.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">Maxfiylik siyosati</Link>
            <Link href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">Foydalanish shartlari</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
