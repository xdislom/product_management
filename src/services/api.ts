import axios from 'axios';
import { Product } from '@/types';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export const productAPI = {
  getAll: async () => {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },
  create: async (data: Omit<Product, 'id'>) => {
    const response = await apiClient.post<Product>('/products', data);
    return response.data;
  },
  update: async (id: string, data: Partial<Product>) => {
    const response = await apiClient.put<Product>(`/products/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  },
};
