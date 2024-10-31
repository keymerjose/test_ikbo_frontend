import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Select,
    MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTableResults from './DataTableResults';
import AddIcon from '@mui/icons-material/Add';
import { GridColDef } from '@mui/x-data-grid';
import MovementForm from './MovementForm';
import axios from 'axios';

interface MovementDialogProps {
    open: boolean;
    onClose: () => void;
    movements: any;
    setMovements: any;
    product: any;
}

const MovementDialog: React.FC<MovementDialogProps> = ({
    open,
    onClose,
    movements,
    setMovements,
    product
}) => {
    console.log(product);

    const handleDelete = async (id: number) => {
        console.log(`Eliminando ID: ${id}`);
        try {
            await axios.delete(`http://localhost:8000/api/v1/inventory-movements/${id}`);

            setMovements((prevResults: any) =>
                prevResults.filter((result: any) => result.id !== id) // Excluir el registro que se eliminó
            );
        } catch (error) {
            console.log(error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'type', headerName: 'Tipo', flex: 1 },
        { field: 'quantity', headerName: 'Cantidad', flex: 1 },
        { field: 'movementDate', headerName: 'Fecha de Movimiento', flex: 1 },
        {
            field: 'actions',
            headerName: 'Acciones',
            flex: 0.5, // Puedes ajustar esto si quieres que las acciones sean más pequeñas
            renderCell: (params) => (
                <IconButton aria-label="delete" color="error" onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];
    

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>Movimientos de {product.name}</DialogTitle>
            <DialogContent>
                <MovementForm product={product} setMovements={setMovements}/>
                <DataTableResults
                    columns={columns}
                    data={movements}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default MovementDialog;
