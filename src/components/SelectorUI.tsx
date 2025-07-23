import { useState, useEffect } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

interface SelectorUIProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function SelectorUI(props: SelectorUIProps) {
  const [cityInput, setCityInput] = useState<string>(props.selectedCity);

  // Sincroniza el estado local si cambia el valor desde el padre
  useEffect(() => {
    setCityInput(props.selectedCity);
  }, [props.selectedCity]);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setCityInput(event.target.value);
    props.onCityChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="city-select-label" sx={{ color: '#fff' }}>Ciudad</InputLabel>
      <Select
        labelId="city-select-label"
        id="city-simple-select"
        label="Ciudad"
        value={cityInput}
        onChange={handleChange}
        sx={{
          background: 'rgba(255,255,255,0.9)',
          borderRadius: 2,
          mb: 1,
        }}
      >
        <MenuItem value="" disabled>
          <em>Seleccione una ciudad</em>
        </MenuItem>
        <MenuItem value={"guayaquil"}>Guayaquil</MenuItem>
        <MenuItem value={"quito"}>Quito</MenuItem>
        <MenuItem value={"manta"}>Manta</MenuItem>
        <MenuItem value={"cuenca"}>Cuenca</MenuItem>
      </Select>
      {cityInput && (
        <Typography variant="body2" sx={{ color: '#fff', mt: 1 }}>
          Información del clima en{' '}
          <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
            {cityInput}
          </span>
        </Typography>
      )}
    </FormControl>
  );
}