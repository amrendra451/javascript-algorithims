const LinkedList = require("../LinkedList/LinkedList");

// Hash table size directly affects on the number of collisions.
// The bigger the hash table size the less collisions you'll get.
// For demonstrating purposes hash table size is small to show how collisions are being handled.
const defaultHashTableSize = 31;

class HashTable {
    /**
     * @param {number} hashTableSize 
     */
    constructor (hashTableSize = defaultHashTableSize) {
        // creating hash table with certain size and fill each bucket with empty linked list.
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList());
        // just keep track of all actual key for fast way
        this.keys = {};
    }

    /**
     * converting key string into hash number
     * @param {string} key
     * @return {number} 
     */
    hash(key) {
        // create hash by adding the position of char and ASCII value of char.
        const hash = Array.from(key).reduce((hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)), 0);
        // Reduce hash number so it fit the hash table size.
        return hash % this.buckets.length;
    }

    /**
     * setting a value at a given key
     * @param {string} key 
     * @param {*} value 
     */
    set(key, value) {
        const keyHash = this.hash(key);
        this.keys[key] = keyHash;
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key});
        if (!node) {
            // Insert new node
            bucketLinkedList.append({key, value});
        } else {
            // Update value of existing node
            node.value.value = value;
        }
    }

    /**
     * delete key value pair from hash table
     * @param {string} key 
     * @return {*}
     */
    delete(key) {
        const keyHash = this.hash(key);
        delete this.keys(key);
        const bucketLinkedList = this.buckets[keyHash];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });
        if (node) {
            return this.bucketLinkedList.delete(node.value);
        }

        return null;
    }

    /**
     * @param {string} keys 
     * @return {*}
     */
    get(key) {
        const bucketLinkedList = this.buckets[this.hash(key)];
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key });
        return node ? node.value.value : undefined;
    }

    /**
     * @param {string} key
     * @return {boolean} 
     */
    has(key) {
        return Object.hasOwnProperty.call(this.keys, key);
    }

    /**
     * @return {string[]}
     */
    getKeys() {
        return Object.keys(this.keys);
    }
}

module.exports = HashTable;