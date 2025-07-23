import { Box, Typography } from '@mui/material';


const HeaderUI = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(90deg, #6366f1 0%, #9333ea 100%)',
                borderRadius: 4,
                p: { xs: 2, md: 4 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                mb: 2,
                boxShadow: 3,
                flexDirection: { xs: 'column', md: 'row' },
                gap: 2,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 800,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                {/* Usa un emoji estándar para máxima compatibilidad */}
                <span role="img" aria-label="cloud" style={{ fontSize: 36 }}>☁️</span>
                Dashboard <span style={{ color: '#fbbf24' }}>Climático</span>
            </Typography>
            <Typography
                variant="subtitle1"
                sx={{
                    color: '#e0e7ff',
                    fontWeight: 400,
                    mt: { xs: 1, md: 0 },
                }}
            >
                Monitoreo avanzado en tiempo real • Pronósticos precisos • Análisis detallado
            </Typography>
        </Box>
    );
};

export default HeaderUI;