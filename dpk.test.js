const { deterministicPartitionKey } = require("./dpk");
const { hashDataByAlgoAndEncoding } = require("./dpk.crypto.util")

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the literal '1234' when given partitionkey less than 256", () => {
    const data = {
      partitionKey: '1234'
    }
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe("1234");
  });
  it("Returns the hashed data when given data without partitionkey", () => {
    const data = {
      'test': 'test'
    }
    const generatedHash = hashDataByAlgoAndEncoding("sha3-512", JSON.stringify(data), "hex");
    console.log(generatedHash);
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(generatedHash);
  })
  it("Returns the partitionKey value of data when given data partitionkey is string literal and less than 256", () => {
    const data = {
      partitionKey: '1234'
    }
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(data.partitionKey);
  });
  it("Returns the partitionKey value of json stringified data when given data when partitionkey is data and less than 256", () => {
    const data = {
      partitionKey: {
        key : '1234'
      }
    }
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(JSON.stringify(data.partitionKey));
  });
  it("Returns the partitionKey value of hashed json stringified data.partitionKey when given data when partitionkey is data and greater than 256", () => {
    const data = {
      partitionKey: {
        key : '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
      }
    }
    const generatedHash = hashDataByAlgoAndEncoding("sha3-512", JSON.stringify(data.partitionKey), "hex");
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe(generatedHash);
  });
});
