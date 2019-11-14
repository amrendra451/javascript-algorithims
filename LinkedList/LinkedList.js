const LinkedListNode = require("./LinkedListNode");

export default class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    /**
     * @description add new node at the begining of the linked list 
     * @param {*} value 
     */
    prepend(value) {
        const newNode = new LinkedListNode(value, this.head);
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }
        console.log(this);
        return this;
    }

    /**
     * @description add new node at the end of the linked list
     * @param {*} value 
     */
    append(value) {
        const newNode = new LinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            console.log(this);
            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;
        console.log(this);
        return this;
    }

    /**
     * @description delete node of a given value
     * @param {*} value 
     */
    delete(value) {
        if (!this.head) {
            return null;
        }

        let deleteNode = null;
        while(this.head && this.head.value === value) {
            deleteNode = this.head;
            this.head = this.head.next;
        }

        let currentNode = this.head;
        if (currentNode !== null) {
            while(currentNode.next) {
                if (currentNode.next.value === value) {
                    deleteNode = currentNode.next;
                    currentNode.next = currentNode;
                } else {
                    currentNode = currentNode.next;
                }
            }
        }

        if (this.tail.value === value) {
            this.tail = currentNode;
        }

        console.log(deleteNode);
        console.log(this);
        return deleteNode;
    }

    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null;
        }

        let currentNode = this.head;
        while(currentNode) {
            if (callback && callback(currentNode.value)) {
                return currentNode;
            }

            if (value != undefined && currentNode.value === value) {
                return currentNode
            }

            currentNode = currentNode.next;
        }
        return null;
    }

    /**
     * Delete node from tail 
     */
    deleteTail() {
        // create a copoy of a tail.
        const deleteTail = this.tail;
        // There is only one node in linked list
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deleteTail;
        }

        /**
         * If there are many nodes in linked list 
         * Find the tail node and delete it
         */
        let currentNode = this.head;
        while(currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null;
            } else {
                currentNode = currentNode.next;
            }
        }

        this.tail = currentNode;
        console.log(deleteTail);
        return deleteTail;
    }

    /**
     * Delete node from head
     */
    deleteHead() {
        // check if nodes are in linked list or not
        if (!this.head) {
            return null;
        }
        // create a copy of a head
        const deleteHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }
        deleteHead.next = null;
        console.log(deleteHead);
        return deleteHead;
    }

    /**
     * @description Create linked list from array values
     * @param values Array of values 
     */
    fromArray(values) {
        values.forEach(value => {
            this.append(value);
        });
        console.log(this);
        return this;
    }

    /**
     * Convert linked list into array
     */
    toArray() {
        const nodes = [];
        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode.value);
            currentNode = currentNode.next;
        }
        console.log(nodes);
        return nodes;
    }

    /**
     * Reverse a linked list
     */
    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            nextNode = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;
            currNode = nextNode;
        }
        this.tail = this.head;
        this.head = prevNode;
        console.log(this);
        return this;
    }
}

const n1 = new LinkedList();
n1.fromArray([1, 2, 3, 4, 5]);
console.log("***************After changes******");
n1.reverse();
n1.toArray();
