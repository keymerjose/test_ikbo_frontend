import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface ProductDialogFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (product: Product) => void;
  product?: Product | null; // Para editar un producto
}

interface Product {
  id?: number | undefined;
  name: string;
  sku: string;
  expiry_date: string;
}

const ProductDialogForm: React.FC<ProductDialogFormProps> = ({
  open,
  onClose,
  onSubmit,
  product = null,
}) => {
  const [name, setName] = useState<string>('');
  const [sku, setSku] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSku(product.sku);
      setExpiryDate(product.expiry_date);
    } else {
      setName('');
      setSku('');
      setExpiryDate('');
    }
  }, [product]);

  const handleSubmit = () => {
    const newProduct: any = {
      id: product?.id, // Solo si está editando
      name,
      sku: (!product?.id ? sku : undefined),
      expiry_date: expiryDate,
    };
    onSubmit(newProduct);
    onClose(); // Cerrar el diálogo después de enviar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product ? 'Editar Producto' : 'Crear Producto'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Nombre"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Código"
          type="text"
          fullWidth
          value={sku}
          disabled={!!product?.id}
          onChange={(e) => setSku(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Fecha de Vencimiento"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {product ? 'Actualizar' : 'Crear'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDialogForm;
