import Box from '@mui/material/Box';
import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

export default function ChartUI(props: ChartUIProps) {
    if (props.loading) return <p>Cargando gráfico...</p>;
    if (props.error) return <p>Error al cargar el gráfico: {props.error}</p>;
    if (!props.data) return <p>No hay datos para mostrar.</p>;

    return (
        <>
            <Typography variant="h5" component="div" sx={{textAlign: 'center', marginBottom: 2}}>
                Temperatura (Celcius) vs Viento (km/h)
            </Typography>
            <Box sx={{ height: 350, width: '100%' }}>
                <LineChart
                    height={350}
                    series={[
                        {
                            data: props.data.hourly.temperature_2m,
                            label: `Temp (${props.data.hourly_units.temperature_2m})`,
                            color: '#1976d2',
                        },
                        {
                            data: props.data.hourly.wind_speed_10m,
                            label: `Viento (${props.data.hourly_units.wind_speed_10m})`,
                            color: '#388e3c',
                        },
                    ]}
                    xAxis={[{ data: props.data.hourly.time, scaleType: 'point', label: 'Hora' }]}
                />
            </Box>
        </>
    );
}