"use client";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useState } from 'react';

export default function CustomerLogin() {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    setLoading(true);
    setTimeout(() => {
      if (values.username === 'user' && values.password === '12345') {
        document.cookie = "user_auth=true; path=/; max-age=86400";
        message.success("Xush kelibsiz! Do'konimizga kirdingiz!");
        window.location.href = '/';
      } else {
        message.error("Login yoki parol noto'g'ri!");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left visual panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 flex-col justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3" />
        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
            <ShoppingOutlined className="text-5xl text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-4">ShopAdmin</h1>
          <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
            O'zbekistonning eng qulay va ishonchli online do'koni. Minglab mahsulotlar siz uchun!
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">1000+</div>
              <div className="text-blue-200 text-sm">Mahsulot</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">24h</div>
              <div className="text-blue-200 text-sm">Yetkazish</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">5★</div>
              <div className="text-blue-200 text-sm">Reyting</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right login form panel */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
              <ShoppingOutlined className="text-3xl text-white" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900">Xush kelibsiz!</h2>
            <p className="text-gray-500 mt-2">Do'konimizdan xarid qilish uchun kiring</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <Form name="customer_login" onFinish={onFinish} layout="vertical" size="large">
              <Form.Item name="username" label={<span className="font-semibold text-gray-700">Login</span>} rules={[{ required: true, message: 'Loginni kiriting!' }]}>
                <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Login: user" className="rounded-xl" />
              </Form.Item>
              <Form.Item name="password" label={<span className="font-semibold text-gray-700">Parol</span>} rules={[{ required: true, message: 'Parolni kiriting!' }]}>
                <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Parol: 12345" className="rounded-xl" />
              </Form.Item>
              <Form.Item className="mb-2 mt-4">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full h-13 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-base shadow-md"
                >
                  Kirish
                </Button>
              </Form.Item>
            </Form>
            <div className="mt-4 text-center text-gray-400 text-sm border-t pt-4">
              Demo: Login <b className="text-gray-600">user</b> | Parol <b className="text-gray-600">12345</b>
            </div>
            <div className="mt-3 text-center">
              <a href="/admin/login" className="text-blue-500 hover:text-blue-700 text-sm font-medium transition-colors">
                Admin sifatida kirish →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
