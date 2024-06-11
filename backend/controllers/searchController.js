const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const iconv = require("iconv-lite");
const { createIndex, searchIndex } = require("../modules/ngram");
const {
  createInvertedIndexFile,
  loadInvertedIndexFile,
} = require("../modules/InvertedIndexFile");

const indexFilePath = path.resolve(
  __dirname,
  "../config/invertedIndex/invertedIndex.json",
);

//check invertedIndex file
let invertedIndex = {};
invertedIndex = loadInvertedIndexFile(invertedIndex, indexFilePath);

//create invertedIndex file
if (!Object.keys(invertedIndex).length) {
  createInvertedIndexFile(invertedIndex);
}

// Search controller
exports.search = (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  const results = searchIndex(query, invertedIndex);
  res.json(results);
};
