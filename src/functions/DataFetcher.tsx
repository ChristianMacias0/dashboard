import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const cityCoords: Record<string, { latitude: number; longitude: number }> = {
    guayaquil: { latitude: -2.1962, longitude: -79.8862 },
    quito: { latitude: -0.1807, longitude: -78.4678 },
    manta: { latitude: -0.9677, longitude: -80.7089 },
    esmeraldas: { latitude: 0.9592, longitude: -79.6500 },
    cuenca: { latitude: -2.9006, longitude: -79.0045 },
};

export default function DataFetcher(city: string): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const coords = cityCoords[city] || cityCoords.guayaquil;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err instanceof Error ? err.message : "Ocurrió un error desconocido al obtener los datos.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    return { data, loading, error };
}