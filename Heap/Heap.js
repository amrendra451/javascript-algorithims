export default class Heap {
    constructor() {
        this.heapContainer = [];
    }

    /**
     * @description get the index of the left child
     * @param {number} parentIndex
     * @return {number} 
     */

    getLeftChildIndex(parentIndex) {
        return (parentIndex * 2) + 1;
    }

    /**
     * @description get the index of the right child
     * @param {number} parentIndex 
     * @return {number}
     */

    getRightChildIndex(parentIndex) {
        return (parentIndex * 2) + 2;
    }

    /**
     * @description get the index of the parent
     * @param {number} childIndex 
     * @return {number}
     */

    getParentIndex(childIndex) {
        return Math.floor((childIndex - 1) / 2);
    }

    /**
     * @description check if element has parent or not
     * @param {number} childIndex 
     * @return {boolean}
     */

    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0;
    }

    /**
     * @description check if left child exists
     * @param {number} parentIndex 
     * @return {boolean}
     */

    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * @description check if right child exists
     * @param {number} parentIndex 
     * @return {boolean}
     */

    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    /**
     * @description get the left child
     * @param {number} parentIndex 
     * @return {*}
     */

    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)];
    }

    /**
     * @description get the right child
     * @param {number} parentIndex
     * @return {*}  
     */

    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)];
    }

    /**
     * @description get the parent
     * @param {number} childIndex 
     * @return {*}
     */

    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)];
    }

    /**
     * @description check if heap container is empty
     * @return {boolean} 
     */

    isEmpty() {
        return !this.heapContainer.length;
    }
 
    /**
     * @description Swapping two element
     * @param {number} indexOne 
     * @param {number} indexTwo 
     */

    swap(indexOne, indexTwo) {
        const temp = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = temp;
    }

    /**
     * @description find a maximum item of a max-heap, or a minimum item of a min-heap, respectively (a.k.a. peek)
     * @return {*}
     */

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.heapContainer[0];
    }

    /**
     * @description Retrieve and remove the root element of the heap. You may also see this referred to as pop.
     * @return {*}
     */

    poll() {
        if (this.isEmpty()) {
            return null;
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop();
        }

        const item = this.heapContainer[0];
        // Move the last element from the end to the head.
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown();
        return item;
    }

    /**
     * @description The value to be inserted into the Heap.
     * @param {*} item 
     * @return {Heap}
     */

    add(item) {
        this.heapContainer.push(item);
        this.heapifyUp();
        return this;
    }
}