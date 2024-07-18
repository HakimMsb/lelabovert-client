import { useState, useEffect } from 'react';
import { CartDto, CategoryDto, ChangePasswordRequest, CommuneDto, ProductDto, WilayaDto } from './lelabovert-api-generated-client/api';
import { accountApiClient, algeriaCitiesApiClient, cartApiClient, categoryApiClient, customerApiClient, productApiClient } from './api-clients';

interface UseProductsResult {
  products: ProductDto[];
  categoryName: string | null;
  loading: boolean;
  error: Error | null;
}

interface UseProductResult {
  product: ProductDto | null;
  loading: boolean;
  error: Error | null;
}

interface UseCategoriesResult {
  categories: CategoryDto[];
  loading: boolean;
  error: Error | null;
}

interface UseWilayasResult {
  wilayas: WilayaDto[];
  loading: boolean;
  error: Error | null;
}

interface UseCommunesResult {
  communes: CommuneDto[];
  loading: boolean;
  error: Error | null;
}

export interface UseSubmitProfileProps {
  email: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  homeAddress: string,
  commune: number,
  currentPassword: string,
  newPassword: string
}

export function useProducts(categorySlug?: string): UseProductsResult {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if(categorySlug){
        const categoryResponse = await categoryApiClient.getCategoryBySlug(categorySlug);
        const categoryName = categoryResponse.data.name || null;
        if(categoryResponse.data.id !== undefined){
          response = await productApiClient.getProductsByCategory(categoryResponse.data.id);
          setCategoryName(categoryName);
        }else{
          throw new Error('Category ID is undefined');
        }
      }else{
        response = await productApiClient.getProducts();
      }
      if (response.data.products !== undefined) {
        setProducts(response.data.products);
      }else{
        throw new Error('Products are undefined');
      }
      console.log(response.data.products);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categorySlug]);

  return { products, categoryName, loading, error };
}

export function useProduct(productSlug: string): UseProductResult {
  const [product, setProduct] = useState<ProductDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await productApiClient.getProductBySlug(productSlug);
      if (response.data !== undefined) {
        setProduct(response.data);
      }
      console.log(response.data);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productSlug]);

  return { product, loading, error };
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      const response = await categoryApiClient.getCategories();
      if (response.data !== undefined) {
        setCategories(response.data);
      }
      console.log(response.data);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {categories, loading, error};
}

export function useWilayas(): UseWilayasResult {
  const [wilayas, setWilayas] = useState<WilayaDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWilayas = async () => {
  try {
      const response = await algeriaCitiesApiClient.getWilayas();
      if (response.data !== undefined) {
        setWilayas(response.data);
      }
      console.log(response.data);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWilayas();
  }, []);

  return {wilayas, loading, error};
}

export function useCommunes(wilayaCode: string): UseCommunesResult {
  const [communes, setCommunes] = useState<CommuneDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCommunes = async () => {
  try {
      const response = await algeriaCitiesApiClient.getCommunes(wilayaCode);
      if (response.data !== undefined) {
        setCommunes(response.data);
      }
      console.log(response.data);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(wilayaCode){
      fetchCommunes();
    }
  }, [wilayaCode]);

  return {communes, loading, error};
}

export function useSubmitProfile() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const submitProfile = async (formInputs: UseSubmitProfileProps) => {
    try {
      //add change email later
      console.log(formInputs);
      await customerApiClient.addOrUpdateCustomer(formInputs);
      if(formInputs.currentPassword && formInputs.newPassword){
        const changePasswordRequest: ChangePasswordRequest = {
          oldPassword: formInputs.currentPassword,
          newPassword: formInputs.newPassword,
        };
        await accountApiClient.changePassword(changePasswordRequest);
      }
    } catch (err) {
      setError(err as Error);
    }finally{
      setLoading(false);
    }
  }

  return { submitProfile, loading, error };
}

export function useCart() {
  const [cart, setCart] = useState<CartDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCart = async () => {
    try {
      const response = await cartApiClient.getCart();
      if (response.data !== undefined) {
        setCart(response.data);
      }
      console.log(response.data);
    } catch (err) {
      setError(err as Error);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart, loading, error };
}