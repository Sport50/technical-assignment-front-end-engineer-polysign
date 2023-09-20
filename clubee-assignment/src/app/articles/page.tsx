import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import Link from 'next/link';

import { Article } from '@/app/interfaces';

import styles from './articles.module.scss';
import { getHumanReadableDate } from '../utils/DateUtils';

const openDb = async (): Promise<any> => {
  // If the database instance is not initialized, open the database connection
  const db = await open({
    filename: "./data/articles.db",
    driver: sqlite3.Database,
  });

  return db;
}

async function getArticlesFromDb() {
  // Get data from sqlite
  const db = await openDb()
  const articles = await db.all('SELECT * FROM articles ORDER BY publicationDateTimestamp DESC LIMIT 5')
  return articles
}

async function ArticleCards() {
  const articles: Article[] = await getArticlesFromDb()
 
  return (
    <div className={styles.articleCardsWrapper}>
      <Link href={`articles/new`}>
        <div className={styles.newArticle}>
          <h1>
            Create new article  
          </h1>
        </div>
      </Link>
      {articles.map((article, index) => (
        <Link href={`articles/${article.id}`} key={index}>
          <div key={article.id}>
            <h1>{ article.title }</h1>
            <ul>
              <li key="authot" className={styles.author}>{ article.authorName }</li>
              <li key="publicationDate" className={styles.publicationDate}>{ getHumanReadableDate(article.publicationDateIso) }</li>
            </ul>
            <p>Click to read</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function Page() {
  return (
    <ArticleCards />
  )
}
