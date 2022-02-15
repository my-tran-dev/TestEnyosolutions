const express = require("express");
const mysql = require("mysql");
const Parser = require("rss-parser");
const parser = new Parser({
  customFields: {
    item: [["media:content", "media:content", { keepArray: true }]],
  },
});
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

/*------------------------*/
const con = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

con.connect((err) => {
  if (err) throw err;
  console.log("DBConnection Successfull!");
});
/*------------------------*/

app.get("/api/articles", async (req, res) => {
  const sql = `SELECT * FROM articles`;

  await con.query(sql, (error, result) => {
    if (error) {
      return console.error(error);
    }
    res.status(200).send(result);
  });
});

app.post("/api/articles/import", async (req, res) => {
  let feed = await parser.parseURL(req.query.siteRssUrl);

  feed.items.forEach(async (item) => {
    const now = new Date().toISOString().slice(0, 19).replace("T", " ");

    const pubDate = new Date(item.pubDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    // FIND IF ARTICLE EXISTED IN DB
    const sqlFind = `SELECT * FROM articles WHERE externalId='${item.guid}'`;
    await con.query(sqlFind, async (err, res, fields) => {
      if (err) {
        return console.error(err);
      }

      let sql;
      if (res.length) {
        //UPDATE if existed
        sql = `UPDATE articles SET importDate = ${con.escape(now)}, 
            title = ${con.escape(item.title)}, 
            description = ${con.escape(item.content)}, 
            publicationDate = ${con.escape(pubDate)}, 
            link = ${con.escape(item.link)},
            mainPicture = ${con.escape(item["media:content"][0]["$"]["url"])}
        WHERE externalId = ${con.escape(item.guid)}`;
      } else {
        //INSERT if non existed
        sql = `INSERT INTO articles(externalId, importDate, title, description, publicationDate, link, mainPicture)
        VALUES( ${con.escape(item.guid)}, 
                ${con.escape(now)}, 
                ${con.escape(item.title)}, 
                ${con.escape(item.content)}, 
                ${con.escape(pubDate)}, 
                ${con.escape(item.link)}, 
                ${con.escape(item["media:content"][0]["$"]["url"])})`;
      }
      await con.query(sql);
    });
  });

  let sqlALL = `INSERT INTO imports(importDate, rawContent)
        VALUES('${new Date()
          .toISOString()
          .slice(0, 19)
          .replace("T", " ")}', ${con.escape(JSON.stringify(feed))})`;

  await con.query(sqlALL);
  res.status(201).json({ feed });
});

app.listen(port, () => {
  console.log("Server is running...");
});
