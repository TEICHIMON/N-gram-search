const nGram = (n) => {
  if (
    typeof n !== "number" ||
    Number.isNaN(n) ||
    n < 1 ||
    n === Number.POSITIVE_INFINITY
  ) {
    throw new Error("`" + n + "` is not a valid argument for `n-gram`");
  }

  return function grams(value) {
    const nGrams = [];

    if (value == null) {
      // More concise null check
      return nGrams;
    }

    const source = typeof value.slice === "function" ? value : String(value);
    const length = source.length - n + 1;

    if (length < 1) {
      return nGrams;
    }

    for (let i = 0; i < length; i++) {
      nGrams.push(source.slice(i, i + n));
    }
    return nGrams;
  };
};

const bigram = nGram(2);
const trigram = nGram(3);

const createIndex = (row, index) => {
  const fields = [
    "都道府県",
    "市区町村",
    "町域",
    "京都通り名",
    "字丁目",
    "事業所名",
    "事業所住所",
  ];
  fields.forEach((field) => {
    if (row[field]) {
      const tokens = bigram(row[field]);
      tokens.forEach((token) => {
        if (!index[token]) index[token] = [];
        index[token].push({
          郵便番号: row["郵便番号"],
          都道府県: row["都道府県"],
          市区町村: row["市区町村"],
          町域: row["町域"],
          京都通り名: row["京都通り名"],
          字丁目: row["字丁目"],
          事業所名: row["事業所名"],
          事業所住所: row["事業所住所"],
        });
      });
    }
  });
};

const searchIndex = (query, index) => {
  const tokens = bigram(query);
  if (tokens.length === 0) return [];

  // Get initial results for the first token
  let results = index[tokens[0]] || [];

  // Filter results to ensure all tokens are present
  for (let i = 1; i < tokens.length; i++) {
    results = results.filter((result) => {
      return (
        index[tokens[i]] &&
        index[tokens[i]].some((entry) => {
          return entry["郵便番号"] === result["郵便番号"];
        })
      );
    });
  }

  return results;
};

module.exports = { nGram, bigram, trigram, createIndex, searchIndex };
