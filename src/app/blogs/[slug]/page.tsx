import type { Metadata } from "next";
import MiriArticlePage from "@/components/miri-blog/article-page";

export const metadata: Metadata = {
  title: "Where Is the Clean Air Money Going? | Miri Africa",
  description: "A closer look at global air quality finance, Africa's funding gap and the role of environmental data in directing investment.",
  openGraph: { title: "Where Is the Clean Air Money Going?", description: "Where does clean air funding go, and who benefits?", type: "article" },
};

export default function BlogArticleRoute() { return <MiriArticlePage />; }
