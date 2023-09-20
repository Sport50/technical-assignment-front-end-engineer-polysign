import { NextRequest, NextResponse } from 'next/server'
import sqlite3 from "sqlite3";
import { open } from "sqlite";

import { Article } from '@/app/interfaces';

let db: any = null;

const openDb = async () => {
  // If the database instance is not initialized, open the database connection
  db = await open({
    filename: "./data/articles.db",
    driver: sqlite3.Database,
  });
}

export async function GET(request: NextRequest) {
  if (!db) { await openDb(); }

  const pagination: number[] = JSON.parse(request.nextUrl.searchParams.get("pagination") || "[0, 5]");
  let sort: string = request.nextUrl.searchParams.get("sort") || "asc";

  if (!['asc', 'desc'].includes(sort.toLowerCase())) {
    sort = 'desc';
  }

  const page = pagination[0];
  const perPage = pagination[1];

  try {
    const allArticles: Article[] = await db.all(`SELECT * FROM articles ORDER BY publicationDateTimestamp ${sort.toUpperCase()}`);
    const articles = allArticles.slice(page * perPage, (page + 1) * perPage);
   
    return NextResponse.json({
      pagination: {
        page: page + 1,
        perPage: perPage,
        total: articles.length,
        totalPages: Math.ceil(allArticles.length / perPage),
      },
      results: articles,
    });
  } catch(err) {
    console.error(err);
    return NextResponse.json({ error: err });
  }
}

export async function POST(request: NextRequest) {
  if (!db) { await openDb(); }

  const article: Article = await request.json();
  const insertQuery = `INSERT INTO articles (title, body, authorEmail, authorName, publicationDateIso, publicationDateTimestamp) VALUES ("${article.title}", "${article.body}", "${article.authorEmail}", "${article.authorName}", "${article.publicationDateIso}", ${article.publicationDateTimestamp})`;
  const result = await db.run(insertQuery, {});
    
  return NextResponse.json({...article, id: result.lastID }, {
    status: 201,
  });
}
