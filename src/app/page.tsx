"use client";
import { useState, useMemo } from 'react';
import { Input, Skeleton, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';

export default function Home() {
  const { data: products = [], isLoading, isError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Barchasi");

  const categories = ["Barchasi", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === "Barchasi" || p.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-800 text-white py-24 px-6 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400 text-blue-100 text-sm font-semibold tracking-wider mb-6">YANGI MAVSUM - 2026</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight drop-shadow-sm">Kuzgi Katta Chegirmalar!</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Eng sifatli elektronika, kiyim-kechak va maishiy texnikalarni arzon narxlarda xarid qiling. 
            Bugun buyurtma bering, O'zbekiston bo'ylab 24 soatda yetkazamiz.
          </p>
          <div className="flex justify-center gap-4">
            <Button type="primary" size="large" className="bg-blue-500 hover:bg-blue-400 text-white border-none font-bold px-10 h-14 rounded-full shadow-lg transition-all hover:-translate-y-1 text-lg">
              Xaridni Boshlash
            </Button>
            <Button size="large" href="/admin" className="bg-transparent text-white border border-white hover:text-blue-100 hover:border-blue-100 font-bold px-10 h-14 rounded-full transition-all hover:-translate-y-1 text-lg">
              Admin kirish
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 mt-8">
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <i className="fas fa-fire text-blue-600"></i>
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
        
        {/* Loading State - Skeletons */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
                <Skeleton.Image active className="w-full mb-4 rounded-lg" style={{ width: '100%', height: '220px' }} />
                <Skeleton active paragraph={{ rows: 2 }} />
                <div className="mt-auto pt-6"><Skeleton.Button active block size="large" /></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
            </div>
            <h3 className="text-red-700 text-xl font-bold mb-2">Xatolik yuz berdi!</h3>
            <p className="text-red-500">Ma'lumotlarni serverdan yuklab bo'lmadi. Aloqani tekshirib qaytadan urinib ko'ring.</p>
            <Button onClick={() => window.location.reload()} className="mt-6" size="large">Qaytadan yuklash</Button>
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && !isError && (
          <>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
                <i className="fas fa-search text-5xl text-gray-200 mb-4 block"></i>
                <h3 className="text-gray-600 text-xl font-medium mb-2">Hech qanday mahsulot topilmadi</h3>
                <p className="text-gray-400">Qidiruv so'zini o'zgartirib ko'ring yoki boshqa kategoriyani tanlang.</p>
                <Button onClick={() => {setSearchTerm(""); setSelectedCategory("Barchasi")}} type="primary" ghost className="mt-6">Filtrlarni tozalash</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
