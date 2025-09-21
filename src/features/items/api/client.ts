// 공용 fetch 래퍼: 항상 `${BASE}/${TENANT}` 접두를 붙여 호출
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT = process.env.NEXT_PUBLIC_TENANT_ID!;

function ensureEnv() {
  if (!BASE) throw new Error("NEXT_PUBLIC_API_BASE_URL is missing");
  if (!TENANT) throw new Error("NEXT_PUBLIC_TENANT_ID is missing");
}

async function jsonOrText(res: Response) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return res.text();
}

export async function api(path: string, init?: RequestInit) {
  ensureEnv();
  const res = await fetch(`${BASE}/${TENANT}${path}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${body || res.statusText}`);
  }
  return jsonOrText(res);
}
