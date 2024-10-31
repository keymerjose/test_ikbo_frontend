// src/pages/ProductPage.tsx
import React from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid2';
import DataTableResults from '../components/DataTableResults';
import ProductDialogForm from '../components/ProductDialogForm';
import MovementDialog from '../components/MovementsDialog';

import useProducts from '../hooks/useProducts';
import useDialog from '../hooks/useDialog';
import useMovements from '../hooks/useMovements';

const ProductPage: React.FC = () => {
  const { results, loading, error, handleSubmit } = useProducts();
  const {
    openDialogForm,
    openDialogMovement,
    openFormDialog,
    closeFormDialog,
    openMovementDialog,
    closeMovementDialog,
  } = useDialog();
  const { movements, setMovements, product, handleMovement, clearMovements } = useMovements(openMovementDialog);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'sku', headerName: 'Código', width: 150 },
    { field: 'expiry_date', headerName: 'Fecha de Vencimiento', width: 180 },
    { field: 'summary', headerName: 'Disponibilidad', width: 180 },
    { field: 'status', headerName: 'Estado', width: 180 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton aria-label="edit" color="primary" onClick={() => handleMovement(params.row)}>
            <CompareArrowsIcon />
          </IconButton>
          <IconButton aria-label="edit" color="primary" onClick={() => openFormDialog()}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="error">
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={2} style={{ width: '100%' }}>
        <Grid size={12}>
          <Button 
            variant="contained" 
            onClick={() => openFormDialog()}
            startIcon={<AddIcon />}
          >
            Crear
          </Button>
          <DataTableResults columns={columns} data={results} />
          <ProductDialogForm
            open={openDialogForm}
            onClose={closeFormDialog}
            onSubmit={handleSubmit}
          />
          <MovementDialog
            open={openDialogMovement}
            onClose={() => {
              clearMovements();
              closeMovementDialog();
            }}
            setMovements={setMovements}
            movements={movements}
            product={product}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProductPage;
