"use client";
import { Drawer, List, Button } from 'antd';
import { useCartStore } from '@/store/useCartStore';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, getCartTotal } = useCartStore();

  return (
    <Drawer title="Sizning Savatchangiz" placement="right" onClose={onClose} open={open} width={400}>
      <List
        itemLayout="horizontal"
        dataSource={cart}
        renderItem={(item) => (
          <List.Item
            actions={[<Button danger type="text" onClick={() => removeFromCart(item.id)}>O'chirish</Button>]}
            className="hover:bg-gray-50 px-2 rounded-lg transition-colors"
          >
            <List.Item.Meta
              avatar={<img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md border border-gray-100" />}
              title={<span className="font-semibold text-gray-800">{item.name}</span>}
              description={<span className="text-blue-600 font-medium">{item.quantity} ta x ${item.price}</span>}
            />
          </List.Item>
        )}
      />
      {cart.length > 0 ? (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500 text-lg">Jami summa:</span>
            <span className="text-2xl font-extrabold text-gray-900">${getCartTotal().toFixed(2)}</span>
          </div>
          <Button type="primary" size="large" block className="h-12 text-lg font-medium" onClick={() => {
            alert('Xarid muvaffaqiyatli amalga oshirildi!');
            onClose();
          }}>
            Rasmiylashtirish
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
            <i className="fas fa-shopping-bag text-2xl text-gray-300"></i>
          </div>
          <p>Savatchangiz hozircha bo'sh</p>
        </div>
      )}
    </Drawer>
  );
}
