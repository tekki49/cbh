# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. The crypto hashing can be reusable code and can be used by additional functions too and hence will be moced to new util file 

2. The main deterministicPartitionKey function has following parts

    i.  If no data is passed then default to TRIVIAL_PARTITION_KEY which can change in future (configurable)

    ii. If partition key is passed, then if the key is a literal string, use it if not stringify the data and generate hash out of the partitionkey passed

    iii. check if passed partition key's length is greater than MAX_PARTITION_KEY_LENGTH(256) and if not use the key as is. If it is greater, a new key is generated from the current hash and is used

3. So we separate the main function into their corresponding 3 parts for better code readability and reusability
