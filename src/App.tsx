import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Grid, ThemeProvider, createTheme } from '@mui/material';
import SelectorUI from './components/SelectorUI';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container spacing={5} justifyContent="center" alignItems="center">

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Encabezado</Grid>

         {/* Alertas */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Alertas</Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3 }}><SelectorUI Elemento: Selector /></Grid>

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 9 }}>Elemento: Indicadores</Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }}>Elemento: Gráfico</Grid>

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }}>Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
      <div>
        <h2>Bienvenitue to the dashboard</h2>
      </div>
    </ThemeProvider>
  )
}

export default App
