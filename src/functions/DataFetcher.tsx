import { useEffect, useState } from 'react';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface DataFetcherOutput {
    data: OpenMeteoResponse | null;
    loading: boolean;
    error: string | null;
}

const CACHE_MINUTES = 10; // Vigencia en minutos

export default function DataFetcher(city: string): DataFetcherOutput {
    const [data, setData] = useState<OpenMeteoResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Coordenadas por ciudad
    const cityCoords: Record<string, { latitude: number; longitude: number }> = {
        guayaquil: { latitude: -2.170998, longitude: -79.922359 },
        quito: { latitude: -0.180653, longitude: -78.467834 },
        manta: { latitude: -0.967653, longitude: -80.708910 },
        cuenca: { latitude: -2.900128, longitude: -79.005896 },
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        const coords = cityCoords[city];
        if (!coords) {
            setError('Ciudad no soportada');
            setLoading(false);
            setData(null);
            return;
        }

        const cacheKey = `openmeteo_${city}`; // Usa backticks para interpolar
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
            try {
                const { timestamp, response } = JSON.parse(cached);
                const now = Date.now();
                // Si la cache es válida, úsala
                if (now - timestamp < CACHE_MINUTES * 60 * 1000) {
                    setData(response);
                    setLoading(false);
                    return;
                }
            } catch {
                // Si hay error en el parseo, ignora la cache
            }
        }

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m,wind_speed_10m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
                }
                const result: OpenMeteoResponse = await response.json();
                setData(result);
                // Guarda en localStorage con timestamp
                localStorage.setItem(
                    cacheKey,
                    JSON.stringify({ timestamp: Date.now(), response: result })
                );
                console.log('Guardado xd', cacheKey, result);
            } catch (err: any) {
                if (cached) {
                    // Si hay error, pero hay cache, úsala como respaldo
                    try {
                        const { response } = JSON.parse(cached);
                        setData(response);
                        setError("Mostrando datos en caché por error de red.");
                    } catch {
                        setError("Ocurrió un error desconocido al obtener los datos.");
                    }
                } else if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Ocurrió un error desconocido al obtener los datos.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [city]);

    return { data, loading, error };
}