import MinHeap from '../Heap/MinHeap';

// It is same as min heap except that when comparing two elements
// we take into account its priority instead of element's value
export default class PriorityQueue extends MinHeap {
    constructor () {
        // call min heap constructor
        super();

        // set priority map
        this.priorities = new Map();
    }

    /**
     * Add item into priority queue
     * @param {*} item Item we are going to add into the queue
     * @param {number} priority Item's priority
     * @return {PriorityQueue}
     */

    add(item, priority = 0) {
        this.priorities.set(item, priority);
        super.add(item);
        return this;
    }

    /**
     * Remove item from priority queue
     * @param {*} item Item to be remove from queue
     * @return {PriorityQueue}
     */

    remove(item) {
        super.remove(item);
        this.priorities.delete(item);
        return this;
    }

    /**
     * Change priority of an item
     * @param {*} item Item which priority you want to change
     * @param {number} priority Item's new priority
     * @return {PriorityQueue}
     */

    changePriority(item, priority) {
        this.remove(item);
        this.add(item, priority);
        return this;
    }

    /**
     * find item
     * @param {*} item 
     */
    find(item) {
        const foundItemIndices = [];

        for (let iteration = 0; iteration < this.priorities.length; iteration += 1) {
            if (item === this.priorities[0]) {
                foundItemIndices.push(iteration);
            }
        }

        return foundItemIndices;
    }

    /**
     * find item by its value
     * @param {*} item 
     * @return {Number[]}
     */

    findByValue(item) {
        return this.find(item);
    }

    /**
     * check if value exists 
     * @param {*} item 
     * @return {boolean}
     */
    hasValue(item) {
        return this.findByValue(item).length > 0;
    }

    /**
     * Compares priorities of two items.
     * @param {*} a
     * @param {*} b
     * @return {number}
     */
    comparePriority(a, b) {
        if (this.priorities.get(a) === this.priorities.get(b)) {
        return 0;
        }
        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    }

    /**
     * Compares values of two items.
     * @param {*} a
     * @param {*} b
     * @return {number}
     */
    compareValue(a, b) {
        if (a === b) {
        return 0;
        }
        return a < b ? -1 : 1;
    }
}