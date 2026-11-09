const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://construction-api-qv4x.onrender.com"
).replace(/\/$/, "");

export type PublicService = {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon?: string | null;
  featured_image?: string | null;
  is_published: boolean;
};

export type PublicProject = {
  id: number;
  title: string;
  slug: string;
  description: string;
  project_type: string;
  location?: string | null;
  status: string;
  featured_image?: string | null;
  is_published: boolean;
};

type ApiEnvelope<T> = {
  success: boolean;
  data?: T;
  error?: { message?: string };
};

async function getPublicData<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`The Ratsonbase API returned HTTP ${response.status}`);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (!payload.success || !payload.data) {
    throw new Error(payload.error?.message || "The API returned an unexpected response.");
  }

  return payload.data;
}

export async function getPublicServices(): Promise<PublicService[]> {
  const data = await getPublicData<{ services: PublicService[] }>("/api/v1/services");
  return data.services ?? [];
}

export async function getPublicProjects(): Promise<PublicProject[]> {
  const data = await getPublicData<{ projects: PublicProject[] }>("/api/v1/projects");
  return data.projects ?? [];
}
