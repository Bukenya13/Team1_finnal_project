const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res, next) => {
  try {
    const result = await mongodb.getDatabase().collection("authors").find();
    const authors = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authors);
  } catch (err) {
    console.error("Error fetching authors:", err.message);
    err.status = 500;
    next(err);
  }
};

const getSingle = async (req, res, next) => {
  try {
    const authorId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("authors")
      .find({ _id: authorId });

    const authors = await result.toArray();

    if (!authors || authors.length === 0) {
      return res
        .status(404)
        .json({ message: "Error fetching author: Not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(authors[0]);
  } catch (err) {
    console.error("Error fetching author:", err.message);
    err.status = 500;
    next(err);
  }
};

module.exports = {
  getAll,
  getSingle,
};
