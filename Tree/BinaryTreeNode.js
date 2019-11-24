const HashTable = require("../HashTable/HashTable");

class BinaryTreeNode {
    /**
     * @param {*} value node value
     */
    constructor (value = null) {
        this.parent = null;
        this.left = null;
        this.right = null;
        this.value = value;

        // To store node relate information
        this.meta = new HashTable();
    }

    /**
     * @return {number}
     */
    get leftHeight() {
        if (!this.left) {
            return 0;
        }
        return this.left.height + 1;
    }

    /**
     * @return {number}
     */
    get rightHeight() {
        if (!this.right) {
            return 0;
        }
        return this.right.height + 1;
    }

    /**
     * @return {number}
     */
    get height() {
        return Math.max(this.left.height, this.right.height);
    }

    /**
     * @return {number}
     */
    get balanceFactor() {
        return this.leftHeight - this.rightHeight;
    }

    /**
     * Get the sibling of parent 
     * @retunr {BinaryTreeNode}
     */
    get uncle() {
        // check if currrent node has parent
        if (!this.parent) {
            return undefined;
        }

        // check if current node has grand-parent
        if (!this.parent.parent) {
            return undefined;
        }

        // check if grand-parent has two children
        if (!this.parent.parent.left || !this.parent.parent.right) {
            return undefined;
        }

        // now we know that the grand parent has two childern
        // if parent and the grand parent's left child is same then right is uncle or vice-versa
        if (this.parent === this.parent.parent.left) {
            return this.parent.parent.right;
        }

        return this.parent.parent.left;
    }

    /**
     * @param {*} value
     * @return {BinaryTreeNode}
     */
    set value(value) {
        this.value = value;
        return this;
    }

    /**
     * @param {BinaryTreeNode} node
     * @return {BinaryTreeNode}
     */
    set leftNode(node) {
        // Reset the parent for left node since its going to detached 
        if (this.left) {
            this.left.parent = null 
        }
        // Attach new node to the left
        this.left = node;

        // Make current node to be a parent for new left one.
        if (this.left) {
            this.left.parent = this;
        }
        return this;
    }

    /**
     * @param {BinaryTreeNode} node
     * @return {BinaryTreeNode}
     */
    set rightNode(node) {
        if (this.right) {
            this.right.parent = null;
        }
        this.right = node;
        if (this.right) {
            this.right.parent = node;
        }
        return this;
    }

    /**
     * @param {BinaryTreeNode} nodeToRemove
     * @return {boolean}
     */
    removeChild(nodeToRemove) {
        if (this.left && this.left === nodeToRemove) {
            this.left = null;
            return true;
        } else if (this.right && this.right === nodeToRemove) {
            this.right = null;
            return true
        } else {
            return false;
        }
    }

    /**
     * @param {*} nodeToReplace 
     * @param {*} replacementNode 
     * @return {boolean}
     */
    replaceChild(nodeToReplace, replacementNode) {
        if (this.left && this.left === nodeToReplace) {
            this.left = replacementNode;
            return true;
        } else if (this.right && this.right === nodeToReplace) {
            this.right = replacementNode;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param {BinaryTreeNode} sourceNode 
     * @param {BinaryTreeNode} targetNode 
     */
    static copyNode(sourceNode, targetNode) {
        targetNode.value(sourceNode.value);
        targetNode.rightNode(sourceNode.right);
        targetNode.leftNode(sourceNode.left)
    }
}