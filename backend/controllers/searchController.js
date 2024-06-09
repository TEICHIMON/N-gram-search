const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const { createIndex, searchIndex } = require('../modules/ngram');

// Load index
const indexFilePath = path.resolve(__dirname, '../config/invertedIndex.json');
let invertedIndex = {};
if (fs.existsSync(indexFilePath)) {
    invertedIndex = JSON.parse(fs.readFileSync(indexFilePath, 'utf-8'));
}

// Search controller
exports.search = (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }
    const results = searchIndex(query, invertedIndex);
    res.json(results);
};

// Create index if not exists
if (!Object.keys(invertedIndex).length) {
    const csvFilePath = path.resolve(__dirname, '../address_data.csv');
    fs.createReadStream(csvFilePath)
        .pipe(csvParser())
        .on('data', (row) => {
            createIndex(row, invertedIndex);
        })
        .on('end', () => {
            fs.writeFileSync(indexFilePath, JSON.stringify(invertedIndex, null, 2));
            console.log('Inverted index created and saved to file.');
        });
}
