const HashTable = require("../HashTable/HashTable");

class TrieNode {
    constructor (character, isCompleteWord = false) {
        this.character = character;
        this.isCompleteWord = isCompleteWord;
        this.children = new HashTable();
    }

    /**
     * To get child
     * @param {String} character 
     * @return {TrieNode}
     */

    getChild(character) {
        return this.children.get(character);
    }

    /**
     * check if element exists or not
     * @param {string} character 
     * @return {boolean}
     */
    hasChild(character) {
        return this.children.has(character);
    }

    /**
     * Check whether current TrieNode has children or not.
     * @return {boolean}
     */
    hasChildren() {
        return this.children.getKeys().length !== 0;
    }

    /**
     * @return {string[]}
     */
    suggestChildren() {
        return [...this.children.getKeys()];
    }

    /**
     * To add a new children
     * @param {string} character 
     * @param {boolean} isCompleteWord 
     * @return {TrieNode}
     */
    addChild(character, isCompleteWord = false) {
        if (!this.hasChild(character)) {
            this.children.set(character, new TrieNode(character, isCompleteWord));
        }
        const childNode = this.children.get(character);
        // In cases similar to adding "car" after "carpet" we need to mark "r" character as complete.
        childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;
        return childNode;
    }

    /**
     * remove child
     * @param {string} character 
     * @return {TrieNode}
     */
    removeChild(character) {
        const childNode = this.getChild(character);
        // Delete childNode only if:
        // - childNode has NO children,
        // - childNode.isCompleteWord === false.
        if (childNode && !childNode.isCompleteWord && !childNode.hasChildren()) {
            this.children.delete(character);
        }

        return this;
    }
}

module.exports = TrieNode;