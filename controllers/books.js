const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
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
  try {
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
    err.status = 500;
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
};
