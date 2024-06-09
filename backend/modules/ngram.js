// Function to create n-grams
function ngrams(str, n) {
    str = str.replace(/\s+/g, '');
    let result = [];
    for (let i = 0; i <= str.length - n; i++) {
        result.push(str.substr(i, n));
    }
    return result;
}

// Function to create an inverted index
function createIndex(row, index) {
    const fields = ['都道府県', '市区町村', '町域', '京都通り名', '字丁目', '事業所名', '事業所住所'];
    fields.forEach(field => {
        if (row[field]) {
            const tokens = ngrams(row[field], 2);
            tokens.forEach(token => {
                if (!index[token]) index[token] = [];
                index[token].push(row);
            });
        }
    });
}

// Function to search in the inverted index
function searchIndex(query, index) {
    const tokens = ngrams(query, 2);
    let results = [];
    tokens.forEach(token => {
        if (index[token]) {
            results = results.concat(index[token]);
        }
    });
    return results;
}

module.exports = { createIndex, searchIndex };
