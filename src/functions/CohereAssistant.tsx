import { useState } from 'react';

const COHERE_API_KEY = import.meta.env.VITE_COHERE_API_KEY;
const COHERE_CHAT_ENDPOINT = 'https://api.cohere.ai/v1/chat';
const MAX_CALLS = 10; // Límite de llamadas por sesión

export function useCohereAssistant() {
  const [calls, setCalls] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const sendQuery = async (query: string, context?: string) => {
    if (calls >= MAX_CALLS) {
      setError('Límite de consultas alcanzado. Intente más tarde.');
      return;
    }
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(COHERE_CHAT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${COHERE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: query,
          // Puedes agregar contexto adicional si lo deseas
          ...(context ? { context } : {}),
        }),
      });

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
      if (data.text) {
        setResponse(data.text);
      } else if (data.generations && data.generations[0]?.text) {
        setResponse(data.generations[0].text);
      } else {
        setError('Respuesta inesperada de Cohere.');
      }
      setCalls(prev => prev + 1);
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Error desconocido al consultar Cohere.');
    } finally {
      setLoading(false);
    }
  };

  return { sendQuery, response, loading, error, calls, MAX_CALLS };
}