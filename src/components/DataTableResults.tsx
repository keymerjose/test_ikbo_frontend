import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import Grid from '@mui/material/Grid';
import { TextField } from "@mui/material";

interface DataTableProps {
    columns: GridColDef[];
    data: any;
}

const DataTableResults: React.FC<DataTableProps> = ({
    columns,
    data
}) => {
    const [filterText, setFilterText] = useState('');

    const filteredData = data.filter((row: any) => {
        return columns.some((column) => {
            const cellValue = row[column.field] || '';
            return String(cellValue).toLowerCase().includes(filterText.toLowerCase());
        });
    });

    return (
        <Grid container>
            <Grid item xs={12}>
                <div style={{ height: 400, width: '100%' }}> {/* Establecer altura y ancho */}
                    <TextField
                        variant="outlined"
                        placeholder="Buscar..."
                        value={filterText}
                        onChange={(e) => setFilterText(e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <DataGrid
                        rows={filteredData}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        autoHeight // Ajusta la altura automáticamente según el contenido
                        sx={{
                            '& .MuiDataGrid-columnHeader': {
                                backgroundColor: '#f0f0f0', // Color de fondo de los encabezados
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-cell': {
                                justifyContent: 'center', // Centrar contenido en las celdas
                            },
                        }}
                    />
                </div>
            </Grid>
        </Grid>
    );
}

export default DataTableResults;
