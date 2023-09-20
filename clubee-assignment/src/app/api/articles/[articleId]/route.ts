import { NextResponse } from 'next/server'
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

export async function GET(request: Request, { params }: { params: { articleId: string } }) {
  if (!db) { await openDb(); }

  try {
    const queryResult: Article[] = await db.all(`SELECT * FROM articles WHERE id = ${params.articleId}`);
    return NextResponse.json(queryResult[0]);
  } catch(err) {
    console.error(err);
    return NextResponse.json({ error: err });
  }
}
