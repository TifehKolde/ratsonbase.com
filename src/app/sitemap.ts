import type { MetadataRoute } from "next";
import { getPublicPosts, getPublicProjects, getPublicServices } from "@/lib/public-api";

const siteUrl = "https://www.ratsonbase.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    { url: siteUrl, priority: 1, changeFrequency: "weekly" },
    { url: `${siteUrl}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${siteUrl}/services`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${siteUrl}/projects`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${siteUrl}/blogs`, priority: 0.8, changeFrequency: "weekly" },
    { url: `${siteUrl}/contact`, priority: 0.6, changeFrequency: "monthly" },
  ];

  const [services, projects, posts] = await Promise.allSettled([
    getPublicServices(),
    getPublicProjects(),
    getPublicPosts(),
  ]);

  if (services.status === "fulfilled") {
    routes.push(...services.value.map((service) => ({
      url: `${siteUrl}/services/${encodeURIComponent(service.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })));
  }

  if (projects.status === "fulfilled") {
    routes.push(...projects.value.map((project) => ({
      url: `${siteUrl}/projects/${encodeURIComponent(project.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })));
  }

  if (posts.status === "fulfilled") {
    routes.push(...posts.value.posts.map((post) => ({
      url: `${siteUrl}/blogs/${encodeURIComponent(post.slug)}`,
      ...(post.published_at ? { lastModified: new Date(post.published_at) } : {}),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })));
  }

  return routes;
}
