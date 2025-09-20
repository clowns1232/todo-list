const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;
const TENANT = process.env.NEXT_PUBLIC_TENANT_ID!;

export async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}/${TENANT}${path}`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.headers.get("content-type")?.includes("json")
    ? res.json()
    : res.text();
}
