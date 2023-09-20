import Link from "next/link";

import { Article } from '@/app/interfaces';
import { getHumanReadableDate } from "@/app/utils/DateUtils";

import styles from './page.module.scss';

const fetchArticle = async (articleId: string): Promise<Article> => {
  const res = await fetch(process.env.URL + `/api/articles/${articleId}`, { method: 'GET' });
  const article: Article = await res.json();
  return article;
}

export default async function Article({ params }: { params: { articleId: string }}) {
  const article: Article = await fetchArticle(params.articleId);

  return (
    <div>
      <div className={styles.actions}>
        <Link href="/articles">Back to articles</Link>
      </div>

      <article className={styles.article}>
        <h1>{ article.title }</h1>
        <div className={styles.articleMeta}>
          <p className={styles.articleMetaAuthor}>{ article.authorName } | <span>{ article.authorEmail }</span></p>
          <p className={styles.articleMetaDates}>{ getHumanReadableDate(article.publicationDateIso) }</p>
        </div>
        <div className={styles.articleContent}>{ article.body }</div>
      </article>
    </div>
  )
}