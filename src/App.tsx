import { Box, Grid, Paper, Typography, Button } from '@mui/material'
import SelectorUI from './components/SelectorUI'
import IndicatorUI from './components/IndicatorUI'
import HeaderUI from './components/HeaderUI'
import AlertUI from './components/AlertUI'
import DataFetcher from './functions/DataFetcher'
import TableUI from './components/TableUI'
import ChartUI from './components/ChartUI'
import { useState } from 'react'
import { useCohereAssistant } from './functions/CohereAssistant'

function App() {
  const [selectedCity, setSelectedCity] = useState<string>('guayaquil');
  const dataFetcherOutput = DataFetcher(selectedCity);
  const [userQuery, setUserQuery] = useState('');
  const { sendQuery, response, loading, error, calls, MAX_CALLS } = useCohereAssistant();

  const handleAsk = () => {
    sendQuery(userQuery);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        maxWidth: '100%',
        background: 'linear-gradient(180deg, #18143a 0%, #2e2b5a 100%)',
        py: { xs: 2, md: 4 },
        px: { xs: 0.5, sm: 1, md: 4 },
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 3 }}>
        <HeaderUI />
      </Box>

      {/* Alertas */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 3 }}>
        <Paper elevation={3} sx={{ p: 2, background: '#fffbe7', borderRadius: 3, mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#f59e42', fontWeight: 700 }}>
            Alertas Meteorológicas Activas
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {/* 'item' prop removida */}
            <Grid xs={12} sm={12} md={6}>
              <AlertUI description="Alerta de tormenta: Se esperan lluvias intensas en las próximas 2 horas" />
            </Grid>
            {/* 'item' prop removida */}
            <Grid xs={12} sm={12} md={6}>
              <AlertUI description="Advertencia: Posibles tormentas eléctricas entre las 16:00 y 20:00" />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Selector + Indicadores */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 3, width: '100%' }}>
        <Grid container spacing={2}>
          {/* Selector */}
          {/* 'item' prop removida */}
          <Grid xs={12} sm={6} md={3}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, background: 'linear-gradient(135deg, #6d6afc 0%, #a7bfff 100%)', color: '#fff' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Ubicación Actual
              </Typography>
              <SelectorUI
                selectedCity={selectedCity}
                onCityChange={setSelectedCity}
              />
            </Paper>
          </Grid>
          {/* Indicadores */}
          {/* 'item' prop removida */}
          <Grid xs={12} sm={6} md={9}>
            <Grid container spacing={2}>
              {dataFetcherOutput.loading && <Grid xs={12}><Typography>Cargando datos...</Typography></Grid>}
              {dataFetcherOutput.error && <Grid xs={12}><Typography color="error">Error: {dataFetcherOutput.error}</Typography></Grid>}
              {dataFetcherOutput.data && (
                <>
                  {/* 'item' prop removida */}
                  <Grid xs={12} sm={6} md={3}>
                    <IndicatorUI
                      title='Temperatura'
                      description={dataFetcherOutput.data.current.temperature_2m + "°C"}
                      color="#ff7043"
                      icon="🌡"
                      extra={`Sensación: ${dataFetcherOutput.data.current.apparent_temperature}°C`}
                    />
                  </Grid>
                  {/* 'item' prop removida */}
                  <Grid xs={12} sm={6} md={3}>
                    <IndicatorUI
                      title='Humedad'
                      description={dataFetcherOutput.data.current.relative_humidity_2m + "%"}
                      color="#42a5f5"
                      icon="💧"
                      extra={`Punto rocío: ${Math.round(dataFetcherOutput.data.current.temperature_2m - ((100 - dataFetcherOutput.data.current.relative_humidity_2m) / 5))}°C`}
                    />
                  </Grid>
                  {/* 'item' prop removida */}
                  <Grid xs={12} sm={6} md={3}>
                    <IndicatorUI
                      title='Viento'
                      description={dataFetcherOutput.data.current.wind_speed_10m + " km/h"}
                      color="#66bb6a"
                      icon="💨"
                      extra="Dirección: NO"
                    />
                  </Grid>
                  {/* 'item' prop removida */}
                  <Grid xs={12} sm={6} md={3}>
                    <IndicatorUI
                      title='Presión'
                      description="1013 hPa"
                      color="#ab47bc"
                      icon="🧭"
                      extra="Estable"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      {/* Gráfico + Datos Astronómicos + Consejos */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 3 }}>
        <Grid container spacing={2}>
          {/* Gráfico */}
          {/* 'item' prop removida */}
          <Grid xs={12} sm={12} md={8}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)' }}>
              <Typography variant="h6" sx={{ color: '#4f46e5', fontWeight: 700, mb: 2 }}>
                Tendencias Climáticas - Últimas 24 Horas
              </Typography>
              <ChartUI
                data={
                  dataFetcherOutput.data
                    ? {
                      ...dataFetcherOutput.data,
                      hourly: {
                        ...dataFetcherOutput.data.hourly,
                        time: dataFetcherOutput.data.hourly.time.slice(-24),
                        temperature_2m: dataFetcherOutput.data.hourly.temperature_2m.slice(-24),
                        wind_speed_10m: dataFetcherOutput.data.hourly.wind_speed_10m.slice(-24),
                      },
                    }
                    : null
                }
                loading={dataFetcherOutput.loading}
                error={dataFetcherOutput.error}
              />
            </Paper>
          </Grid>
          {/* Consejos */}
          {/* 'item' prop removida */}
          <Grid xs={12} sm={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 3, background: 'linear-gradient(135deg, #34d399 0%, #6ee7b7 100%)', color: '#065f46' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Consejos Inteligentes
              </Typography>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                <li>🟠 Usa protector solar SPF 30+</li>
                <li>🧥 Lleva chaqueta ligera para la noche</li>
                <li>💧 Mantente hidratado durante el día</li>
                <li>🌟 Excelente día para actividades</li>
              </ul>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Tabla */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 3 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3, background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)' }}>
          <Typography variant="h6" sx={{ color: '#4f46e5', fontWeight: 700, mb: 2 }}>
            <span role="img" aria-label="clock">🕒</span> Pronóstico Detallado por Horas
          </Typography>
          <TableUI
            data={
              dataFetcherOutput.data
                ? {
                  ...dataFetcherOutput.data,
                  hourly: {
                    ...dataFetcherOutput.data.hourly,
                    time: dataFetcherOutput.data.hourly.time.slice(-24),
                    temperature_2m: dataFetcherOutput.data.hourly.temperature_2m.slice(-24),
                    wind_speed_10m: dataFetcherOutput.data.hourly.wind_speed_10m.slice(-24),
                  },
                }
                : null
            }
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
          />
        </Paper>
      </Box>

      {/* Asistente del Clima */}
      <Box sx={{ maxWidth: 1200, mx: 'auto', mb: 3 }}>
        <Paper elevation={3} sx={{ p: 2, borderRadius: 3, background: '#fff' }}>
          <Typography variant="h6" sx={{ color: '#4f46e5', fontWeight: 700, mb: 2 }}>
            Asistente de Clima (Cohere)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <input
              type="text"
              value={userQuery}
              onChange={e => setUserQuery(e.target.value)}
              placeholder="Haz una pregunta sobre el clima..."
              style={{
                width: 300,
                marginRight: 8,
                padding: 8,
                borderRadius: 8,
                border: '1px solid #d1d5db',
                fontSize: 16,
              }}
            />
            <Button
              variant="contained"
              sx={{ background: 'linear-gradient(90deg, #6366f1 0%, #93333ea 100%)', color: '#fff', fontWeight: 700 }}
              onClick={handleAsk}
              disabled={loading || calls >= MAX_CALLS}
            >
              Consultar
            </Button>
          </Box>
          <div>
            {loading && <Typography>Consultando a Cohere...</Typography>}
            {error && <Typography color="error">{error}</Typography>}
            {response && <Typography><strong>Respuesta:</strong> {response}</Typography>}
            <Typography variant="caption">Consultas usadas: {calls} / {MAX_CALLS}</Typography>
          </div>
        </Paper>
      </Box>
    </Box>
  )
}

export default App