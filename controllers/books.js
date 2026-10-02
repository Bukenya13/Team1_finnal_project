const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const createError = (status, message) => {
  const err = new Error(message);
  err.status = status;
  return err;
};

const requiredString = (value, field) => {
  if (typeof value !== "string" || !value.trim()) {
    throw createError(400, `${field} is required.`);
  }

  return value.trim();
};

const requiredInteger = (value, field) => {
  if (!Number.isInteger(value)) {
    throw createError(400, `${field} must be an integer.`);
  }

  return value;
};

const validateBookData = (data) => {
  if (!data || typeof data !== "object") {
    throw createError(400, "Book data is required.");
  }

  return {
    title: requiredString(data.title, "Book title"),
    isbn: requiredString(data.isbn, "Book isbn"),
    authorId: requiredString(data.authorId, "Book authorId"),
    categoryId: requiredString(data.categoryId, "Book categoryId"),
    publishedYear: requiredInteger(data.publishedYear, "Book publishedYear"),
    pages: requiredInteger(data.pages, "Book pages"),
    summary: requiredString(data.summary, "Book summary"),
  };
};

const getAll = async (req, res, next) => {
  //#swagger.tags=["Books"]
  try {
    const result = await mongodb.getDatabase().collection("books").find();
    const books = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books);
  } catch (err) {
    console.error("Error fetching books:", err.message);
    err.status = 500;
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  //#swagger.tags=["Books"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      throw createError(400, "Invalid book ID.");
    }

    const bookId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("books")
      .find({ _id: bookId });

    const books = await result.toArray();

    if (!books || books.length === 0) {
      return res
        .status(404)
        .json({ message: "Error fetching book: Not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(books[0]);
  } catch (err) {
    console.error("Error fetching book:", err.message);
    next(err);
  }
};

const createBook = async (req, res, next) => {
  //#swagger.tags=["Books"]
  try {
    const book = validateBookData(req.body);
    const result = await mongodb
      .getDatabase()
      .collection("books")
      .insertOne(book);

    res.status(201).json({
      _id: result.insertedId,
      ...book,
    });
  } catch (err) {
    console.error("Error creating book:", err.message);
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  //#swagger.tags=["Books"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      throw createError(400, "Invalid book ID.");
    }

    const book = validateBookData(req.body);
    const result = await mongodb
      .getDatabase()
      .collection("books")
      .findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        { $set: book },
        { returnDocument: "after" },
      );

    if (!result) {
      return res
        .status(404)
        .json({ message: "Error updating book: Not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error updating book:", err.message);
    next(err);
  }
};

const deleteBook = async (req, res, next) => {
  //#swagger.tags=["Books"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      throw createError(400, "Invalid book ID.");
    }

    const result = await mongodb
      .getDatabase()
      .collection("books")
      .findOneAndDelete({ _id: new ObjectId(req.params.id) });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Error deleting book: Not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("Error deleting book:", err.message);
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createBook,
  updateBook,
  deleteBook,
};
