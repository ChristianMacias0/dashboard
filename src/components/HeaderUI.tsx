import { Box, Typography} from '@mui/material';


const HeaderUI = () => {
    return (
        <Box
            sx={{
                backgroundColor: '#0d0b38', // Fondo exterior azul oscuro
                padding: 2,
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#f0f4ff', // Fondo claro de la tarjeta
                    borderRadius: '12px',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column', // Fuerza columna para ambos textos
                    alignItems: { xs: 'flex-start', sm: 'flex-start' },
                    gap: 0,
                }}
            >


                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 600,
                        fontSize: '1.25rem',
                        color: '#4f46e5', // Morado
                        display: 'inline',
                    }}
                >
                    Dashboard <span style={{ color: '#9333ea' }}>Climático</span>
                </Typography>
                
                <Typography
                    variant="body2"
                    sx={{
                        color: '#4b5563',
                        marginTop: 1,
                    }}
                >
                    Monitoreo avanzado en tiempo real • Pronósticos precisos • Análisis detallado
                </Typography>
            </Box>
        </Box>
    );
};

export default HeaderUI;