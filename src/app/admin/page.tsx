"use client";
import { useState } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Space, Popconfirm, Statistic, Row, Col, Card } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, DollarOutlined, AppstoreOutlined, ShoppingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Product } from '@/types';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '@/hooks/useProducts';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const { data: products = [], isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  // Analytics Calculations
  const totalProducts = products.length;
  const totalStockValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);
  const uniqueCategories = new Set(products.map(p => p.category)).size;

  const showModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      form.setFieldsValue(product);
    } else {
      setEditingProduct(null);
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFinish = (values: any) => {
    if (editingProduct) {
      updateProduct.mutate(
        { id: editingProduct.id, data: values },
        { onSuccess: () => setIsModalVisible(false) }
      );
    } else {
      createProduct.mutate(values, { onSuccess: () => setIsModalVisible(false) });
    }
  };

  const columns = [
    {
      title: 'Rasm',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => <img src={text} alt="product" className="w-12 h-12 object-cover rounded border border-gray-200 shadow-sm" />
    },
    { 
      title: 'Nomi', 
      dataIndex: 'name', 
      key: 'name',
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name)
    },
    { 
      title: 'Kategoriya', 
      dataIndex: 'category', 
      key: 'category',
      filters: Array.from(new Set(products.map(p => p.category))).map(c => ({ text: c as string, value: c as string })),
      onFilter: (value: any, record: Product) => record.category === value,
    },
    { 
      title: 'Narx', 
      dataIndex: 'price', 
      key: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => <span className="font-bold text-blue-600">${price}</span>
    },
    { 
      title: 'Omborda (Soni)', 
      dataIndex: 'stock', 
      key: 'stock',
      sorter: (a: Product, b: Product) => a.stock - b.stock,
    },
    {
      title: 'Harakatlar',
      key: 'action',
      render: (_: any, record: Product) => (
        <Space size="middle">
          <Button type="primary" ghost icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Popconfirm title="Rostdan ham o'chirasizmi?" onConfirm={() => deleteProduct.mutate(record.id)}>
            <Button danger icon={<DeleteOutlined />} loading={deleteProduct.isPending} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 mt-4">
      {/* Analytics Overview */}
      <Row gutter={16} className="mb-8">
        <Col span={24} md={8}>
          <Card variant="borderless" className="shadow-sm border border-gray-100 rounded-xl mb-4 md:mb-0">
            <Statistic 
              title={<span className="text-gray-500 font-medium">Jami Mahsulotlar</span>} 
              value={totalProducts} 
              prefix={<ShoppingOutlined className="text-blue-500 mr-2" />} 
              styles={{ content: { fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' } }}
            />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card variant="borderless" className="shadow-sm border border-gray-100 rounded-xl mb-4 md:mb-0">
            <Statistic 
              title={<span className="text-gray-500 font-medium">Aktivlar Qiymati</span>} 
              value={totalStockValue} 
              precision={2} 
              prefix={<DollarOutlined className="text-green-500 mr-2" />} 
              styles={{ content: { fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' } }}
            />
          </Card>
        </Col>
        <Col span={24} md={8}>
          <Card variant="borderless" className="shadow-sm border border-gray-100 rounded-xl">
            <Statistic 
              title={<span className="text-gray-500 font-medium">Kategoriyalar Soni</span>} 
              value={uniqueCategories} 
              prefix={<AppstoreOutlined className="text-purple-500 mr-2" />} 
              styles={{ content: { fontSize: '2rem', fontWeight: 'bold', color: '#1f2937' } }}
            />
          </Card>
        </Col>
      </Row>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mahsulotlarni Boshqarish</h1>
            <p className="text-gray-500">Do'kondagi barcha tovarlarni shu yerdan boshqaring.</p>
          </div>
          <div className="flex gap-3">
            <Button size="large" danger className="rounded-lg font-medium" icon={<LogoutOutlined />} onClick={() => { document.cookie = "admin_auth=; path=/; max-age=0"; router.push('/admin/login'); }}>
              Chiqish
            </Button>
            <Button type="primary" size="large" className="rounded-lg shadow-md font-medium" icon={<PlusOutlined />} onClick={() => showModal()}>
              Yangi Qo'shish
            </Button>
          </div>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={products} 
          rowKey="id" 
          loading={isLoading}
          pagination={{ pageSize: 8, showSizeChanger: true }}
          className="overflow-x-auto"
        />
      </div>

      <Modal 
        title={<div className="text-xl font-bold text-gray-800 mb-4 pb-4 border-b">{editingProduct ? "Mahsulotni tahrirlash" : "Yangi mahsulot qo'shish"}</div>}
        open={isModalVisible} 
        onCancel={handleCancel}
        footer={null}
        width={650}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={handleFinish} className="mt-4">
          <Form.Item name="name" label={<span className="font-medium text-gray-700">Nomi</span>} rules={[{ required: true, message: 'Iltimos, nomini kiriting' }]}>
            <Input size="large" placeholder="Masalan: Nike Air Force" className="rounded-lg" />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-6">
            <Form.Item name="price" label={<span className="font-medium text-gray-700">Narxi ($)</span>} rules={[{ required: true }]}>
              <InputNumber size="large" className="w-full rounded-lg" min={0} placeholder="100" />
            </Form.Item>
            <Form.Item name="stock" label={<span className="font-medium text-gray-700">Soni (Omborda)</span>} rules={[{ required: true }]}>
              <InputNumber size="large" className="w-full rounded-lg" min={0} placeholder="50" />
            </Form.Item>
          </div>

          <Form.Item name="category" label={<span className="font-medium text-gray-700">Kategoriya</span>} rules={[{ required: true }]}>
            <Input size="large" placeholder="Poyabzal, Elektronika..." className="rounded-lg" />
          </Form.Item>

          <Form.Item name="image" label={<span className="font-medium text-gray-700">Rasm URL (Internetdan havola)</span>} rules={[{ required: true }]}>
            <Input size="large" placeholder="https://..." className="rounded-lg" />
          </Form.Item>

          <Form.Item name="description" label={<span className="font-medium text-gray-700">Tavsif</span>} rules={[{ required: true }]}>
            <Input.TextArea rows={4} placeholder="Mahsulot haqida batafsil ma'lumot..." className="rounded-lg" />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
            <Button size="large" onClick={handleCancel} className="rounded-lg font-medium">Bekor qilish</Button>
            <Button size="large" type="primary" htmlType="submit" className="rounded-lg font-medium px-8 shadow-md" loading={createProduct.isPending || updateProduct.isPending}>
              {editingProduct ? "Yangilash" : "Saqlash"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
