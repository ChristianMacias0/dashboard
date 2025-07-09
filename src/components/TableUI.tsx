import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Hora',
      width: 180,
   },
   {
      field: 'value1',
      headerName: 'Temp. (°C)',
      width: 150,
   },
   {
      field: 'value2',
      headerName: 'Viento (km/h)',
      width: 150,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 200,
      valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''} ${row.value2 || ''}`,
   },
];

interface TableUIProps {
   loading: boolean;
   error: string | null;
   labels: string[];
   values1: number[];
   values2: number[];
}

export default function TableUI({ loading, error, labels, values1, values2 }: TableUIProps) {
   if (loading) return <Typography>Cargando datos...</Typography>;
   if (error) return <Typography color="error">{error}</Typography>;

   const rows = combineArrays(labels, values1, values2).slice(0, 24); // Solo primeras 24 horas

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
