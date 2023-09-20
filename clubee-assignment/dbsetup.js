const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database("./data/articles.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the SQlite database.");
});

// Serialize method ensures that database queries are executed sequentially
db.serialize(async () => {
  // Create the items table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY,
        title TEXT,
        body TEXT,
        authorEmail TEXT,
        authorName TEXT,
        publicationDateIso TEXT,
        publicationDateTimestamp INTEGER
      )`,
    async (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created articles table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM articles`, async (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from articles table");

        // Insert new data into the products table
        const articles = [
          {
            title: "News Article 1",
            body: "The content of this article is about the first news article.",
            authorEmail: "georges@polysign.lu",
            authorName: "Georges Jentgen",
            publicationDateIso: "2023-09-10T18:00:00.038Z",
            publicationDateTimestamp: 1694368800038,
          },
          {
            title: "News Article 2",
            body: "The content of this article is about the second news article.",
            authorEmail: "georges@polysign.lu",
            authorName: "Georges Jentgen",
            publicationDateIso: "2023-09-14T20:30:00.038Z",
            publicationDateTimestamp: 1694723400038,
          },
          {
            title: "News Article 3",
            body: "The content of this article is about the 3rd news article.",
            authorEmail: "georges@polysign.lu",
            authorName: "Georges Jentgen",
            publicationDateIso: "2023-09-18T22:00:00.038Z",
            publicationDateTimestamp: 1695074400038,
          },
        ];

        const insertSql = `INSERT INTO articles (title, body, authorEmail, authorName, publicationDateIso, publicationDateTimestamp) VALUES (?, ?, ?, ?, ?, ?)`;

        await Promise.all(articles.map(async (article) => {
          return new Promise((resolve, reject) => {
            db.run(insertSql, Object.values(article), function (err) {
              if (err) {
                reject(err.message);
              }
              resolve();
            });
          });
        }));

        //   Close the database connection after all insertions are done
        db.close(async (err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log("Closed the database connection.");
        });
      });
    }
  );
});