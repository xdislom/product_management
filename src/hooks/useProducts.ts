import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { productAPI } from '@/services/api';
import { Product } from '@/types';
import { message } from 'antd';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productAPI.getAll,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      message.success("Mahsulot muvaffaqiyatli qo'shildi!");
    },
    onError: () => {
      message.error("Saqlashda xatolik yuz berdi!");
    }
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Product> }) => productAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      message.success("Mahsulot muvaffaqiyatli yangilandi!");
    },
    onError: () => {
      message.error("Yangilashda xatolik yuz berdi!");
    }
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      message.success("Mahsulot muvaffaqiyatli o'chirildi!");
    },
    onError: () => {
      message.error("O'chirishda xatolik yuz berdi!");
    }
  });
};
