// src/hooks/useMovements.ts
import { useState } from 'react';
import { Product } from './useProducts';

const useMovements = (openMovementDialog: any) => {
  const [movements, setMovements] = useState<any[]>([]);
  const [product, setProduct] = useState<any>({});

  const handleMovement = (row: Product) => {
    setMovements(row?.movements || []);
    setProduct(row);
    openMovementDialog();
  };

  const clearMovements = () => setMovements([]);

  return {
    movements,
    setMovements,
    product,
    handleMovement,
    clearMovements,
  };
};

export default useMovements;
