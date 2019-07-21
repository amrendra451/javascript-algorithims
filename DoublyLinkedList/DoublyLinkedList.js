const DoublyLinkedListNode = require("./DoublyLinkedListNode");

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value);
        // If head exists add newNode before the node
        if (this.head) {
            this.head.previous = newNode;
        }
        this.head = newNode;
        // if tail is not exists create one.
        if (!this.tail) {
            this.tail = newNode;
        }
        console.log(this);
        return this;
    }

    append(value) {
        const newNode = new DoublyLinkedListNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;
        console.log(this);
        return this;
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }

        let deleteHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
            this.head.previous = null;
        } else {
            this.head = null;
            this.tail = null;
        }
        console.log(deleteHead);
        return deleteHead;
    }

    deleteTail() {
        if (!this.head) {
            return null;
        }

        let deleteTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
            return deleteTail;
        }

        this.tail = this.tail.previous;
        this.tail.next = null;
        return deleteTail;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }

        let deleteNode = null;
        let currentNode = this.head;
        while (currentNode) {
            if (currentNode.value === value) {
                deleteNode = currentNode;
                if (deleteNode === this.head) {
                    this.head = currentNode.next;
                    if (this.head) {
                        this.head.previous = null;
                    }
                    if (deleteNode === this.tail) {
                        this.tail = null;
                    }
                } else if (deleteNode === this.tail) {
                    this.tail = currentNode.previous;
                    this.tail.next = null;
                } else {
                    const previousNode = currentNode.previous;
                    const nextNode = currentNode.next;
                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }
            currentNode = currentNode.next;
        }
        return deleteNode;
    }

    reverse() {
        let currNode = this.head;
        let nextNode = null;
        let previousNode = null;

        while (currNode) {
            nextNode = currNode.next;
            previousNode = currNode.previous;

            currNode.next = previousNode;
            currNode.previous = nextNode;

            // Move previousNode and currNode nodes one step forward.
            previousNode = currNode;
            currNode = nextNode;
        }

            // Reset head and tail.
            this.tail = this.head;
            this.head = previousNode;

            return this;

    }
}

const node = new DoublyLinkedList();
node.prepend(12);
node.append(10);
node.append(14);
console.log();
console.log();
console.log();
node.deleteHead();