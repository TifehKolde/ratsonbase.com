import { createPageMetadata } from "@/lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Contact Ratsonbase Construction Limited",
  description: "Speak with Ratsonbase about building construction, civil engineering, renovation, project management and property development in Lagos and across Nigeria.",
  path: "/contact",
});

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
