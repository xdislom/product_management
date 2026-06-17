"use client";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // Hardcoded credentials for "Pro" mockup
    if (values.username === 'admin' && values.password === '12345') {
      // Set cookie for 1 day
      document.cookie = "admin_auth=true; path=/; max-age=86400";
      message.success("Tizimga muvaffaqiyatli kirdingiz!");
      window.location.href = '/admin';
    } else {
      message.error("Login yoki parol noto'g'ri!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <UserOutlined className="text-3xl text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Panel</h2>
          <p className="text-blue-100 mt-1">Tizimga kirish uchun ma'lumotlarni kiriting</p>
        </div>
        
        <div className="p-8">
          <Form
            name="admin_login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Iltimos, loginni kiriting!' }]}
            >
              <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Login (admin)" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Iltimos, parolni kiriting!' }]}
            >
              <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Parol (12345)" />
            </Form.Item>

            <Form.Item className="mb-0 mt-6">
              <Button type="primary" htmlType="submit" className="w-full bg-blue-600 hover:bg-blue-500 h-12 text-lg rounded-xl font-semibold" loading={loading}>
                Kirish
              </Button>
            </Form.Item>
          </Form>
          
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>Demo uchun Login: <b>admin</b> | Parol: <b>12345</b></p>
          </div>
        </div>
      </div>
    </div>
  );
}
