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

    /**
     * @description find all item from a heap
     * @param {*} item 
     * @return {Number[]}
     */

    find(item) {
        const foundItemIndices = [];

        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (item === this.heapContainer[itemIndex]) {
                foundItemIndices.push(itemIndex);
            }
        }

        return foundItemIndices;
    }

    /**
     * @param {*} item 
     * @return {Heap}
     */

    remove(item) {
        // Find number of items to remove.
        const numberOfItems = this.find(item).length;

        for (let iteration = 0; iteration < numberOfItems; iteration += 1) {
            // we need to find item index to remove each time after removal
            // since indices are being changed each heapify process
            const indexToRemove = this.find(item).pop();

            // if item is the last child of heap remove the child
            // there is no need to heapify afterward.
            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop();
            } else {
                // move the last item in head to the vacant (removed) position
                this.heapContainer[indexToRemove] = this.heapContainer.pop();
                // Get the parent
                const parentItem = this.parent(indexToRemove);

                // If there is no parent or parent is in correct order with the node
                // we're going to delete then heapify down. Otherwise heapify up.
                if (this.hasLeftChild(indexToRemove) && (!parentItem || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove]))) {
                    this.heapifyDown(indexToRemove);
                } else {
                    this.heapifyUp(indexToRemove);
                }
            }
        }

        return this;
    }

    /**
     * 
     * @param {number} customStartIndex 
     */
    heapifyUp(customStartIndex) {
        // Take the last element (last in array or the bottom left in a tree)
        // in the heap container and lift it up until it is in the correct
        // order with respect to its parent element.
        let currentIndex = customStartIndex || this.heapContainer.length - 1;
        while(this.hasParent(currentIndex) && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
            this.swap(currentIndex, this.getParentIndex(currentIndex));
            currentIndex = this.getParentIndex(currentIndex);
        }
    }

    /**
     * @param {number} [customStartIndex]
     */

    heapifyDown(customStartIndex = 0) {
        // Compare the parent element to its children and swap parent with the appropriate
        // child (smallest child for MinHeap, largest child for MaxHeap).
        // Do the same for next children after swap.
        let currentIndex = customStartIndex;
        let nextIndex = null;

        while (this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex) && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
                nextIndex = this.getRightChildIndex(currentIndex);
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex);
            }

            if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
                break;
            }

            this.swap(currentIndex, nextIndex);
            currentIndex = nextIndex;
        }
    }

    /**
     * Checks if pair of heap elements is in correct order.
     * For MinHeap the first element must be always smaller or equal.
     * For MaxHeap the first element must be always bigger or equal.
     *
     * @param {*} firstElement
     * @param {*} secondElement
     * @return {boolean}
     */
    
    pairIsInCorrectOrder(firstElement, secondElement) {
        throw new Error(`You have to implement heap pair comparision method for ${firstElement} and ${secondElement} values.`);
    }
}