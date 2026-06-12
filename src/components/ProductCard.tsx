import { Card, Button } from 'antd';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { message } from 'antd';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore(state => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product);
    message.success(`${product.name} savatchaga qo'shildi!`);
  };

  return (
    <Card
      hoverable
      className="overflow-hidden border-gray-100 shadow-sm flex flex-col h-full transition-shadow duration-300 hover:shadow-md"
      styles={{ body: { flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '20px' } }}
      cover={
        <div className="relative h-64 overflow-hidden bg-gray-50">
          <img 
            alt={product.name} 
            src={product.image} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            onError={(e: any) => { e.target.src = 'https://via.placeholder.com/300?text=Rasm+Yoq' }}
          />
          <div className="absolute top-3 right-3">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm tracking-wide">
              {product.category.toUpperCase()}
            </span>
          </div>
        </div>
      }
    >
      <div className="flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-2">{product.name}</h3>
        <p className="text-gray-500 text-sm line-clamp-2 mt-2 leading-relaxed">{product.description}</p>
        <div className="flex justify-between items-end mt-auto pt-4 mb-4">
          <span className="text-2xl font-extrabold text-blue-600">${product.price}</span>
          <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded">Omborda: {product.stock}</span>
        </div>
      </div>
      <Button 
        type="primary" 
        size="large"
        className="w-full flex items-center justify-center gap-2 font-medium" 
        onClick={handleAddToCart}
        disabled={product.stock === 0}
      >
        <ShoppingCart size={18} /> {product.stock === 0 ? "Sotuvda yo'q" : "Savatchaga"}
      </Button>
    </Card>
  );
}
