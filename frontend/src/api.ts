export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

export async function errorText(response: Response, fallback: string) {
  try {
    const payload = await response.json();
    return payload.message || payload.error || fallback;
  } catch {
    return fallback;
  }
}
