const { hashDataByAlgoAndEncoding } = require("././dpk.crypto.util");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  const hashAlgo = "sha3-512";
  const encoding = "hex";
  let candidate = checkIfExistsOrGeneratePartitionKey(hashAlgo, event, encoding);
  candidate = validatePartitionKey(hashAlgo, candidate, encoding);
  return candidate;
};

function checkIfExistsOrGeneratePartitionKey(hashAlgo, data, encoding) {
  let partitionKey;
  if (data) {
    if (data.partitionKey) {
      partitionKey = data.partitionKey;
    } else {
      partitionKey = hashDataByAlgoAndEncoding(hashAlgo, JSON.stringify(data), encoding);
    }
  }
  return partitionKey;
}

function validatePartitionKey(hashAlgo, partitionKey, encoding) {
  if (partitionKey) {
    if (typeof partitionKey !== "string") {
      partitionKey = JSON.stringify(partitionKey);
    }
  } else {
    partitionKey = TRIVIAL_PARTITION_KEY;
  }
  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    partitionKey = hashDataByAlgoAndEncoding(hashAlgo, partitionKey, encoding)
  }
  return partitionKey;
}