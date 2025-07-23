import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface IndicatorUIProps {
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
  extra?: string;
}

export default function IndicatorUI(props: IndicatorUIProps) {
  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 3,
        background: `linear-gradient(135deg, ${props.color || '#f0f4ff'} 0%, #fff 100%)`,
        color: '#222',
        minHeight: 120,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 1 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
          {props.icon} {props.description}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: '#555' }}>
          {props.title}
        </Typography>
        {props.extra && (
          <Typography variant="caption" sx={{ color: '#666' }}>
            {props.extra}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}