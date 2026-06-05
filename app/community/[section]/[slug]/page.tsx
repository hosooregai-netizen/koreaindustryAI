import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { communityArticles, getCommunityArticle, type CommunityArticleBlock } from "@/lib/community-content";
import { SiteShell } from "@/components/site";

type CommunityArticlePageProps = {
  params: Promise<{
    section: string;
    slug: string;
  }>;
};

const formatDateTime = (date: string) => date.replaceAll(".", "-").replace(/-$/, "");

export function generateStaticParams() {
  return communityArticles.map((article) => ({
    section: article.section,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: CommunityArticlePageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const article = getCommunityArticle(section, slug);

  if (!article) {
    return {
      title: "Community | 대한산업AI",
    };
  }

  return {
    title: `${article.title} | 대한산업AI`,
    description: article.description,
  };
}

function CommunityArticleBodyBlock({ block, index }: { block: CommunityArticleBlock; index: number }) {
  if (block.type === "heading") {
    return <h2 key={index}>{block.text}</h2>;
  }

  if (block.type === "quote") {
    return (
      <blockquote key={index}>
        <p>{block.text}</p>
      </blockquote>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return <p key={index}>{block.text}</p>;
}

export default async function CommunityArticlePage({ params }: CommunityArticlePageProps) {
  const { section, slug } = await params;
  const article = getCommunityArticle(section, slug);

  if (!article) notFound();

  return (
    <SiteShell>
      <main className="site-community-article-page">
        <article className="site-community-article">
          <header className="site-community-article-header">
            <Link className="site-community-article-back" href={`/community/${article.section}`}>
              목록으로 돌아가기
            </Link>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <div className="site-community-article-meta">
              <span>{article.author}</span>
              <time dateTime={formatDateTime(article.date)}>{article.date}</time>
              <span>{article.readingTime}</span>
            </div>
          </header>

          <figure className="site-community-article-cover">
            <img src={article.imageSrc} alt={article.imageAlt} />
          </figure>

          <div className="site-community-article-body">
            {article.body.map((block, index) => (
              <CommunityArticleBodyBlock block={block} index={index} key={`${block.type}-${index}`} />
            ))}
          </div>
        </article>
      </main>
    </SiteShell>
  );
}
