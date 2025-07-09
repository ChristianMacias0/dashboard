
import Box from '@mui/material/Box';
import type {GridColDef} from '@mui/x-data-grid';
import { DataGrid} from '@mui/x-data-grid';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function TableUI(props: TableUIProps) {
    if (props.loading) return <p>Cargando datos de la tabla...</p>;
    if (props.error) return <p>Error al cargar la tabla: {props.error}</p>;
    if (!props.data) return <p>No hay datos para mostrar.</p>;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'time', headerName: 'Hora', width: 180 },
        { field: 'temperature_2m', headerName: `Temp (${props.data.hourly_units.temperature_2m})`, width: 180 },
        { field: 'wind_speed_10m', headerName: `Viento (${props.data.hourly_units.wind_speed_10m})`, width: 180 },
    ];

    const rows = props.data.hourly.time.map((time, idx) => ({
        id: idx,
        time,
        temperature_2m: props.data!.hourly.temperature_2m[idx],
        wind_speed_10m: props.data!.hourly.wind_speed_10m[idx],
    }));

    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}