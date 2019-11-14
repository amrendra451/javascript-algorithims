import LinkedList from "../LinkedList/LinkedList";

export default class Queue {
    constructor() {
        this.linkedList = new LinkedList();
    }

    /**
     * @return {boolean}
     */
    isEmpty() {
        return !this.linkedList.head;
    }

    /**
     * Read the value from the front queue without removing it.
     * @return {*}
     */
    peek() {
        if (this.isEmpty()) {
            return null;
        }

        return this.linkedList.head.value;
    }

    /**
     * Add a new element at the end of the linklist (tail of linklist)
     * @param {*} value 
     */
    enqueue(value) {
        this.linkedList.append(value);
    }

    /**
     * remove the element at the front of the linklist (the head)
     * if head is empty return null
     */
    dequeue() {
        const removeHead = this.linkedList.deleteHead();
        return removeHead ? removeHead.value : null;
    }
}

const q = new Queue();
console.log(q.isEmpty());
q.enqueue(1);
console.log(q.peek());
q.enqueue(2);
q.enqueue(3);
console.log(q.peek());
q.dequeue();
console.log(q);
