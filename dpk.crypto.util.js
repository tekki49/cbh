const crypto = require("crypto");

exports.hashDataByAlgoAndEncoding = (hashAlgo, data, encoding) => {
    return crypto.createHash(hashAlgo).update(data).digest(encoding);
};