import { Grid } from '@mui/material'
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
    <>
      <Grid container spacing={5} justifyContent="center" alignItems="center">

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}>
          <HeaderUI />
        </Grid>

        {/* Alertas */}
        <Grid container justifyContent="right" alignItems="center" size={{ xs: 12, md: 12 }}>
          <AlertUI description="No se preveen lluvias" />
        </Grid>

        {/* Selector */}
        <Grid size={{ xs: 12, md: 3 }}>
          <SelectorUI
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </Grid>

        {/* Indicadores */}
        <Grid container size={{ xs: 12, md: 9 }}>
          {/* Renderizado condicional de los datos obtenidos */}

          {dataFetcherOutput.loading && <p>Cargando datos...</p>}
          {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
          {dataFetcherOutput.data && (
            <>

              {/* Indicadores con datos obtenidos */}

              <Grid size={{ xs: 12, md: 3 }} >
                <IndicatorUI
                  title='Temperatura (2m)'
                  description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Temperatura aparente'
                  description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Velocidad del viento'
                  description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <IndicatorUI
                  title='Humedad relativa'
                  description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
              </Grid>

            </>
          )}
        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <ChartUI
            data={
              dataFetcherOutput.data
                ? {
                  ...dataFetcherOutput.data,
                  // Limita a las últimas 24 horas si hay más datos
                  hourly: {
                    ...dataFetcherOutput.data.hourly,
                    time: dataFetcherOutput.data.hourly.time.slice(-50),
                    temperature_2m: dataFetcherOutput.data.hourly.temperature_2m.slice(-50),
                    wind_speed_10m: dataFetcherOutput.data.hourly.wind_speed_10m.slice(-50),
                  },
                }
                : null
            }
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
          />
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
          <TableUI
            data={
              dataFetcherOutput.data
                ? {
                  ...dataFetcherOutput.data,
                  // Limita a las últimas 24 filas
                  hourly: {
                    ...dataFetcherOutput.data.hourly,
                    time: dataFetcherOutput.data.hourly.time.slice(-50),
                    temperature_2m: dataFetcherOutput.data.hourly.temperature_2m.slice(-50),
                    wind_speed_10m: dataFetcherOutput.data.hourly.wind_speed_10m.slice(-50),
                  },
                }
                : null
            }
            loading={dataFetcherOutput.loading}
            error={dataFetcherOutput.error}
          />
        </Grid>

        {/* Asistente del Clima */}
        <Grid size={{ xs: 12, md: 12 }}>
          <div style={{ margin: 24 }}>
            <h3>Asistente de Clima (Cohere)</h3>
            <input
              type="text"
              value={userQuery}
              onChange={e => setUserQuery(e.target.value)}
              placeholder="Haz una pregunta sobre el clima..."
              style={{ width: 300, marginRight: 8 }}
            />
            <button onClick={handleAsk} disabled={loading || calls >= MAX_CALLS}>
              Consultar
            </button>
            <div>
              {loading && <p>Consultando a Cohere...</p>}
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {response && <p><strong>Respuesta:</strong> {response}</p>}
              <p>Consultas usadas: {calls} / {MAX_CALLS}</p>
            </div>
          </div>
        </Grid>

      </Grid>
    </>

  )
}

export default App
