const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://construction-api-qv4x.onrender.com"
).replace(/\/$/, "");

export type PublicService = {
  id: number; title: string; slug: string; description: string;
  icon?: string | null; featured_image?: string | null; is_published: boolean;
};
export type PublicProject = {
  id: number; title: string; slug: string; description: string;
  project_type: string; location?: string | null; client?: string | null; status: string;
  start_date?: string | null; completion_date?: string | null;
  featured_image?: string | null;
  gallery_images?: string[] | null;
  video_url?: string | null;
  is_published: boolean;
};
export type PublicProjectImage = {
  id: number;
  project_id: number;
  image_url: string;
  alt_text?: string | null;
  sort_order?: number;
  media_id?: number | null;
  created_at?: string;
};
export type PublicComment = { id: number; name: string; body: string; created_at: string; status?: string };
export type PublicPost = {
  id: number; title: string; slug: string; excerpt?: string | null;
  content_html: string; featured_image?: string | null; meta_title?: string | null;
  meta_description?: string | null; published_at?: string | null; created_at?: string;
  author?: { id: number; name: string; profile_picture?: string | null; bio?: string | null } | null;
  category?: { id: number; name: string; slug: string; description?: string | null } | null;
  tags?: Array<{ id: number; name: string; slug: string }>;
  comments_count?: number; likes_count?: number;
};
type ApiEnvelope<T> = { success: boolean; data?: T; error?: { message?: string } };

async function getPublicData<T>(path: string): Promise<T> {
  const response = await fetch(API_BASE_URL + path, {
    headers: { Accept: "application/json" }, cache: "no-store",
  });
  if (!response.ok) throw new Error("The Ratsonbase API returned HTTP " + response.status);
  const payload = (await response.json()) as ApiEnvelope<T>;
  if (!payload.success || payload.data === undefined) {
    throw new Error(payload.error?.message || "The API returned an unexpected response.");
  }
  return payload.data;
}
export async function getPublicServices(): Promise<PublicService[]> {
  const data = await getPublicData<{ services: PublicService[] }>("/api/v1/services");
  return data.services ?? [];
}
export async function getPublicServiceBySlug(slug: string): Promise<PublicService> {
  const data = await getPublicData<{ service: PublicService }>("/api/v1/services/" + encodeURIComponent(slug));
  return data.service;
}
export async function getPublicProjects(): Promise<PublicProject[]> {
  const data = await getPublicData<{ projects: PublicProject[] }>("/api/v1/projects");
  return data.projects ?? [];
}
export async function getPublicProjectImages(projectId: number): Promise<PublicProjectImage[]> {
  const data = await getPublicData<{ images: PublicProjectImage[] }>(
    "/api/v1/projects/" + encodeURIComponent(String(projectId)) + "/images"
  );
  return data.images ?? [];
}
export async function getPublicProjectBySlug(slug: string): Promise<PublicProject> {
  const data = await getPublicData<{ project: PublicProject }>("/api/v1/projects/" + encodeURIComponent(slug));
  return data.project;
}
export async function getPublicPosts(): Promise<{
  posts: PublicPost[];
  pagination: { page: number; limit: number; total: number; total_pages: number };
}> {
  return getPublicData("/api/v1/posts");
}
export async function getPublicPostBySlug(slug: string): Promise<PublicPost> {
  const data = await getPublicData<{ post: PublicPost }>("/api/v1/posts/" + encodeURIComponent(slug));
  return data.post;
}

export async function getPublicComments(slug: string): Promise<{ comments: PublicComment[]; pagination: { page: number; limit: number; total: number; total_pages: number } }> {
  return getPublicData("/api/v1/comments/post/" + encodeURIComponent(slug) + "?page=1&limit=8");
}
export async function submitPublicComment(slug: string, input: { name: string; email: string; body: string }): Promise<{ message?: string }> {
  const response = await fetch(API_BASE_URL + "/api/v1/comments/post/" + encodeURIComponent(slug), {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(input),
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) throw new Error(payload.error?.message || "Your comment could not be submitted.");
  return payload.data;
}
export async function likePublicPost(slug: string, email: string): Promise<{ liked: boolean; already_liked: boolean; likes_count: number }> {
  const response = await fetch(API_BASE_URL + "/api/v1/posts/" + encodeURIComponent(slug) + "/likes", {
    method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ email }),
  });
  const payload = await response.json();
  if (!response.ok || !payload.success) throw new Error(payload.error?.message || "You must be subscribed to the newsletter to like this article.");
  return payload.data;
}
