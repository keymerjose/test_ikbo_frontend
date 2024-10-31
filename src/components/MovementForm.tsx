import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Select, MenuItem, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";

interface MovementFormProps {
    product: any;
    setMovements: any;
}

const MovementForm: React.FC<MovementFormProps> = ({
    product,
    setMovements,
}) => {
    const validationSchema = Yup.object().shape({
        type: Yup.string().required('Este campo es requerido.'),
        quantity: Yup.number().required('Este campo es requerido.').min(1, 'La cantidad debe ser mayor que 0.'),
        movementDate: Yup.date().required('Este campo es requerido.'),
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: { type: '', quantity: undefined, movementDate: undefined },
    });

    const formatDate = ( movementDate : string ) => {
        const date = new Date(movementDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const onSubmit = async (movement: any) => {
        movement.movement_date = formatDate(movement.movementDate);
        movement.product_id = product.id;
        try {
            const resp = await axios.post('http://localhost:8000/api/v1/inventory-movements', movement);
            setMovements((prevResults: any) => [resp.data.data, ...prevResults]);
            console.log(resp.data.data);
        } catch (error) {
            
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container xs={12} spacing={2} style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} fullWidth>
                                <MenuItem value="entry">Entrada</MenuItem>
                                <MenuItem value="exit">Salida</MenuItem>
                            </Select>
                        )}
                    />
                    {errors.type && <span style={{ color: 'red' }}>{errors.type.message}</span>}
                </Grid>
                <Grid item xs={12} sm={6} md={2} lg={2}>
                    <Controller
                        name="quantity"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Cantidad"
                                type="number"
                                fullWidth
                            />
                        )}
                    />
                    {errors.quantity && <span style={{ color: 'red' }}>{errors.quantity.message}</span>}
                </Grid>
                <Grid item xs={12} sm={6} md={5} lg={5}>
                    <Controller
                        name="movementDate"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Fecha de Movimiento"
                                type="date"
                                fullWidth
                            />
                        )}
                    />
                    {errors.movementDate && <span style={{ color: 'red' }}>{errors.movementDate.message}</span>}
                </Grid>
                <Grid item xs={12} sm={6} md={1} lg={1}>
                    <IconButton type="submit" aria-label="add" color="primary" style={{ marginTop: '15px' }}>
                        <AddIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </form>
    );
}

export default MovementForm;
