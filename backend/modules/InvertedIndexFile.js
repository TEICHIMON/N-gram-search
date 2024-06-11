const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const csvParser = require("csv-parser");
const { createIndex } = require("./ngram");

const indexFilePath = path.resolve(
  __dirname,
  "../config/invertedIndex/invertedIndex.json",
);

// Load index
const loadInvertedIndexFile = (invertedIndex) => {
  if (fs.existsSync(indexFilePath)) {
    invertedIndex = JSON.parse(fs.readFileSync(indexFilePath, "utf-8"));
  }
};
// Create index if not exists
const createInvertedIndexFile = (invertedIndex) => {
  const csvFilePath = path.resolve(
    __dirname,
    "../config/countryData/zenkoku.csv",
  );
  const stream = fs
    .createReadStream(csvFilePath)
    .pipe(iconv.decodeStream("Shift_JIS"))
    .pipe(csvParser());

  let tempIndex = {};
  let rowCount = 0;
  stream.on("data", (row) => {
    createIndex(row, tempIndex);
    rowCount++;
    if (rowCount % 1000 === 0) {
      Object.keys(tempIndex).forEach((token) => {
        if (!invertedIndex[token]) {
          invertedIndex[token] = [];
        }
        invertedIndex[token] = invertedIndex[token].concat(tempIndex[token]);
      });
      tempIndex = {}; // Clear temporary index to free up memory
      console.log(`Processed ${rowCount} rows.`);
    }
  });

  stream.on("end", () => {
    // Add any remaining data in tempIndex to invertedIndex
    Object.keys(tempIndex).forEach((token) => {
      if (!invertedIndex[token]) {
        invertedIndex[token] = [];
      }
      invertedIndex[token] = invertedIndex[token].concat(tempIndex[token]);
    });
    fs.writeFileSync(indexFilePath, JSON.stringify(invertedIndex, null, 2));
    console.log(
      `Processed remaining ${rowCount % 1000} rows and saved final index.`,
    );
    console.log("Inverted index created and saved to file.");
  });

  stream.on("error", (err) => {
    console.error("Error processing CSV file:", err);
  });
};

module.exports = { loadInvertedIndexFile, createInvertedIndexFile };
