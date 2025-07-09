import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';

interface ChartUIProps {
   loading: boolean;
   error: string | null;
   labels: string[];
   values1: number[];
   values2: number[];
}

export default function ChartUI({ loading, error, labels, values1, values2 }: ChartUIProps) {
   if (loading) return <Typography>Cargando datos...</Typography>;
   if (error) return <Typography color="error">{error}</Typography>;

   return (
      <>
         <Typography variant="h5" component="div">
            Temperatura vs Viento por hora
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: values1.slice(0, 24), label: 'Temp. (°C)' },
               { data: values2.slice(0, 24), label: 'Viento (km/h)' },
            ]}
            xAxis={[{ scaleType: 'point', data: labels.slice(0, 24) }]}
         />
      </>
   );
}