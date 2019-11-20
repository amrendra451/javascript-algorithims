const LinkedList = require("../LinkedList/LinkedList");

class Stack {
    constructor () {
        this.linkedList = new LinkedList();
    }

    /**
     * check if stack is empty or not
     * @return {boolean} 
     */
    isEmpty() {
        return !this.linkedList.head;
    }

    /**
     * Get the value from top of the stack
     * @return {*}
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.head.value;
    }

    /**
     * add new element at the top of the stack (the head)
     * @param {*} value 
     */
    push(value) {
        this.linkedList.prepend(value);
    }

    /**
     * remove the element from the top of the stack (the head)
     * if top (the head) is empty return null.
     */
    pop() {
        const removeHead = this.linkedList.deleteHead();
        return removeHead ? removeHead.value : null;
    }
}

module.exports = Stack;