const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");

const app = express();

let dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initilizeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
  }
};

app.get("/books/", async (request, response) => {
  const getSsqlQuery = `
    SELECT * FROM 
    book 
    ORDER BY book_id
    LIMIT 2;
    `;
  const booksArray = await db.all(getSsqlQuery);
  response.send(booksArray);
});

initilizeDBAndServer();
