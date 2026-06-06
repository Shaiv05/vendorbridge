import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const ACCESS = "vb_access";
const REFRESH = "vb_refresh";

export const tokenStore = {
  get access() { return typeof window !== "undefined" ? localStorage.getItem(ACCESS) : null; },
  get refresh() { return typeof window !== "undefined" ? localStorage.getItem(REFRESH) : null; },
  set(access: string, refresh: string) {
    localStorage.setItem(ACCESS, access);
    localStorage.setItem(REFRESH, refresh);
  },
  clear() { localStorage.removeItem(ACCESS); localStorage.removeItem(REFRESH); },
};

export const api = axios.create({ baseURL: API_URL, headers: { "Content-Type": "application/json" } });

api.interceptors.request.use((cfg) => {
  const t = tokenStore.access;
  if (t) cfg.headers.Authorization = `Bearer ${t}`;
  return cfg;
});

let refreshing: Promise<string> | null = null;

api.interceptors.response.use(
  (r) => r,
  async (err) => {
    const orig = err.config;
    if (err.response?.status === 401 && !orig._retry && tokenStore.refresh) {
      orig._retry = true;
      try {
        refreshing ??= (async () => {
          const { data } = await axios.post(`${API_URL}/auth/refresh/`, { refresh: tokenStore.refresh });
          tokenStore.set(data.access, tokenStore.refresh!);
          return data.access as string;
        })();
        const newAccess = await refreshing;
        refreshing = null;
        orig.headers.Authorization = `Bearer ${newAccess}`;
        return api(orig);
      } catch (e) {
        refreshing = null;
        tokenStore.clear();
        if (typeof window !== "undefined") window.location.href = "/login";
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  },
);
