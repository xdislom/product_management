"use client";
import { useState, useMemo, useRef } from 'react';
import { Input, Skeleton, Select, Button, Form, message } from 'antd';
import {
  SearchOutlined,
  LeftOutlined,
  RightOutlined,
  FireOutlined,
  StarOutlined,
  PhoneOutlined,
  MailOutlined,
  SendOutlined,
} from '@ant-design/icons';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { data: products = [], isLoading, isError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");
  const carouselRef = useRef<HTMLDivElement>(null);
  const [contactForm] = Form.useForm();
  const [sending, setSending] = useState(false);

  const categories = ["Barchasi", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === "Barchasi" || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Featured: top 8 products for carousel
  const featuredProducts = products.slice(0, 8);

  const scrollCarousel = (dir: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: dir === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (values: { name: string; email: string; message: string }) => {
    setSending(true);
    setTimeout(() => {
      message.success("Xabaringiz yuborildi! Tez orada bog'lanamiz.");
      contactForm.resetFields();
      setSending(false);
    }, 1000);
  };

  return (
    <div>
      {/* ─── Hero Banner ─────────────────────────────────── */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-blue-500/30 border border-blue-400 text-blue-100 text-sm font-semibold tracking-wider mb-6">
            YANGI MAVSUM — 2026
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm">
            Kuzgi Katta Chegirmalar!
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Eng sifatli elektronika, kiyim-kechak va maishiy texnikalarni arzon narxlarda xarid qiling.
            Bugun buyurtma bering, O'zbekiston bo'ylab 24 soatda yetkazamiz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              type="primary" size="large"
              className="bg-white text-blue-700 hover:bg-blue-50 border-none font-bold px-10 h-14 rounded-full shadow-lg transition-all hover:-translate-y-1 text-lg"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Xaridni Boshlash
            </Button>
            <Button
              size="large" href="/admin"
              className="bg-transparent text-white border border-white font-bold px-10 h-14 rounded-full transition-all hover:-translate-y-1 text-lg"
            >
              Admin kirish
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Horizontal Carousel ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 mt-14">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <FireOutlined className="text-orange-500 text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Trendlar</h2>
              <p className="text-gray-400 text-sm">Ommabop va yangi mahsulotlar</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
            >
              <LeftOutlined />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
            >
              <RightOutlined />
            </button>
          </div>
        </div>

        {/* Scrollable row */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth hide-scrollbar carousel-track"
        >
          {isLoading
            ? [1, 2, 3, 4, 5].map(n => (
              <div key={n} className="flex-shrink-0 w-60 bg-white rounded-2xl border border-gray-100 p-4">
                <Skeleton.Image active style={{ width: '100%', height: 180, borderRadius: 12 }} />
                <Skeleton active paragraph={{ rows: 2 }} className="mt-3" />
              </div>
            ))
            : featuredProducts.map(product => (
              <div
                key={product.id}
                className="flex-shrink-0 w-60 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group"
              >
                <div className="relative overflow-hidden h-44">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    YANGI
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
                  <p className="text-blue-600 font-bold mt-1">${product.price}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <StarOutlined className="text-yellow-400 text-xs" />
                    <span className="text-gray-400 text-xs">4.8 (120)</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </section>

      {/* ─── Products Grid ──────────────────────────────── */}
      <section id="products" className="max-w-7xl mx-auto p-6 mt-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <StarOutlined className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Top Mahsulotlar</h2>
              <p className="text-gray-500 text-sm">Siz uchun saralangan.</p>
            </div>
          </div>
          <div className="flex w-full md:w-auto gap-3">
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="w-full md:w-48"
              size="large"
              options={categories.map(c => ({ value: c, label: c }))}
            />
            <Input
              placeholder="Mahsulot nomini qidiring..."
              prefix={<SearchOutlined className="text-gray-400" />}
              className="w-full md:w-72"
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <Skeleton.Image active style={{ width: '100%', height: 220 }} />
                <Skeleton active paragraph={{ rows: 2 }} className="mt-3" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
            <h3 className="text-red-700 text-xl font-bold mb-2">Xatolik yuz berdi!</h3>
            <p className="text-red-500">Ma'lumotlarni serverdan yuklab bo'lmadi.</p>
            <Button onClick={() => window.location.reload()} className="mt-6" size="large">Qaytadan yuklash</Button>
          </div>
        )}

        {!isLoading && !isError && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
                <h3 className="text-gray-600 text-xl font-medium mb-2">Hech qanday mahsulot topilmadi</h3>
                <p className="text-gray-400">Qidiruv so'zini o'zgartirib ko'ring yoki boshqa kategoriyani tanlang.</p>
                <Button onClick={() => { setSearchTerm(""); setSelectedCategory("Barchasi"); }} type="primary" ghost className="mt-6">
                  Filtrlarni tozalash
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* ─── Contact Section ────────────────────────────── */}
      <section id="contact" className="mt-20 bg-gradient-to-br from-blue-700 to-indigo-800 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-blue-100 text-sm font-semibold mb-4">Aloqa</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Biz bilan bog'laning</h2>
            <p className="text-blue-200 text-lg max-w-xl mx-auto">Savollaringiz bormi? Biz har doim yordam berishga tayyormiz.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: <PhoneOutlined className="text-2xl" />, title: "Telefon", desc: "+998 90 123 45 67" },
                { icon: <MailOutlined className="text-2xl" />, title: "Email", desc: "info@shopadmin.uz" },
                { icon: <SendOutlined className="text-2xl" />, title: "Telegram", desc: "@shopadmin_uz" },
              ].map(item => (
                <div key={item.title} className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">{item.title}</p>
                    <p className="text-white font-semibold">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <Form form={contactForm} layout="vertical" onFinish={handleContactSubmit} size="large">
                <Form.Item name="name" label={<span className="font-semibold text-gray-700">Ismingiz</span>} rules={[{ required: true, message: "Ismingizni kiriting!" }]}>
                  <Input placeholder="Ism Familiya" className="rounded-xl" />
                </Form.Item>
                <Form.Item name="email" label={<span className="font-semibold text-gray-700">Email</span>} rules={[{ required: true, type: 'email', message: "To'g'ri email kiriting!" }]}>
                  <Input placeholder="email@example.com" className="rounded-xl" />
                </Form.Item>
                <Form.Item name="message" label={<span className="font-semibold text-gray-700">Xabar</span>} rules={[{ required: true, message: "Xabaringizni yozing!" }]}>
                  <Input.TextArea rows={4} placeholder="Savolingiz yoki izohingiz..." className="rounded-xl" />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={sending}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-base"
                >
                  Yuborish
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
