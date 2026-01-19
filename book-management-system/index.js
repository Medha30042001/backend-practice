import express, { raw } from "express";
import fs from "fs/promises";

const app = express();
const PORT = 4000;
const DB_FILE = "./db.json";

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/books", async (req, res) => {
  try {
    const rawData = await fs.readFile(DB_FILE, "utf-8");
    const parsedData = JSON.parse(rawData);
    const books = parsedData.books;

    res.status(200).json({
      message: "Books are fetched",
      books,
    });
  } catch (error) {
    res.status(500).json({
      error: "Cannot find books data",
    });
  }
});

app.post("/books", async (req, res) => {
  try {
    const rawData = await fs.readFile(DB_FILE, "utf-8");
    const parsedData = JSON.parse(rawData);
    const books = parsedData.books;

    const newId = books.length > 0 ? books[books.length - 1].id + 1 : 1;

    const newBook = {
      id: newId,
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      publishedYear: req.body.publishedYear,
    };

    books.push(newBook);

    await fs.writeFile(DB_FILE, JSON.stringify(parsedData, null, 2));

    res.status(201).json({
      message: "Book added successfully",
      books,
    });
  } catch (error) {
    res.status(500).json({
      error: "Couldnt add book",
    });
  }
});

app.put("/books/:id", async (req, res) => {
    try {
        const idToUpdate = Number(req.params.id);

        const {title, author, genre, publishedYear} = req.body;

        const rawData = await fs.readFile(DB_FILE, 'utf-8');
        const parsedData = JSON.parse(rawData);
        const books = parsedData.books;

        const index = books.findIndex(b => b.id === idToUpdate);

        books[index] = {
            ...books[index],
            ...(title && {title}),
            ...(author && {author}),
            ...(genre && {genre}),
            ...(publishedYear && {publishedYear}),
        }

        await fs.writeFile(DB_FILE, JSON.stringify(parsedData, null, 2));

        res.status(200).json({
            message : 'Book updated',
            books
        })
    } catch (error) {
        
    }
})

app.delete("/books/:id", async (req, res) => {
  try {
    const idToDelete = Number(req.params.id);

    const rawData = await fs.readFile(DB_FILE, "utf-8");
    const parsedData = JSON.parse(rawData);
    const books = parsedData.books;

    const filteredBooks = books.filter((b) => b.id !== idToDelete);

    if (filteredBooks.length === books.length) {
      return res.status(404).json({
        message: "book not found",
      });
    }

    parsedData.books = filteredBooks;

    await fs.writeFile(DB_FILE, JSON.stringify(parsedData, null, 2));

    res.status(200).json({
      message: "Book deleted successfully",
      books: filteredBooks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Couldnt delete book",
    });
  }
});
