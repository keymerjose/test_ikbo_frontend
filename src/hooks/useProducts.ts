// src/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

export interface Product {
  id?: number | undefined;
  name: string;
  sku: string;
  expiry_date: string;
  movements?: any[] | undefined;
}

const useProducts = () => {
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/products');
        setResults(response.data.data);
      } catch (err) {
        setError('Error fetching results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const handleSubmit = async (product: Product) => {
    try {
      if (!product.id) {
        const response = await axios.post('http://localhost:8000/api/v1/products', product);
        setResults((prevResults) => [response.data.data, ...prevResults]);
      } else {
        const response = await axios.put(`http://localhost:8000/api/v1/products/${product.id}`, product);
        setResults((prevResults) =>
          prevResults.map((result) => (result.id === response.data.data.id ? response.data.data : result))
        );
      }
    } catch (error) {
      setError('Error saving product');
    }
  };

  return {
    results,
    loading,
    error,
    handleSubmit,
  };
};

export default useProducts;
