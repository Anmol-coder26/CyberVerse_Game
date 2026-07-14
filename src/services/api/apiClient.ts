// src/services/api/apiClient.ts
//
// STATUS: Not yet implemented.
//
// A thin fetch wrapper reserved for talking to the /server backend once it
// exists (leaderboard sync, save-state, etc). Kept as a single choke point
// so headers, base URL, and error handling are defined once.

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export async function apiGet<T>(path: string): Promise<T> {
  if (!BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured. The backend is not yet deployed.");
  }
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) throw new Error(`API GET ${path} failed: ${response.status}`);
  return response.json() as Promise<T>;
}
