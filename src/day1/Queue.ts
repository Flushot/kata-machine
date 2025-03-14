export class Node<T> {
    value: T;
    next?: Node<T>;

    constructor(value: T) {
        this.value = value;
    }
}

export default class Queue<T> {
    public length: number;

    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = new Node(item);
        if (this.tail) {
            this.tail.next = node;
        } else {
            this.head = node;
        }

        this.tail = node;
        ++this.length;
    }

    deque(): T | undefined {
        const node = this.head;

        if (!node) {
            return undefined;
        }

        if (node.next) {
            this.head = node.next;
            node.next = undefined;
        } else {
            // Queue is empty
            this.head = undefined;
            this.tail = undefined;
        }

        --this.length;
        return node.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }

    toArray(): T[] {
        const arr = [];
        let node = this.head;

        while (node !== undefined) {
            arr.push(node.value);
            node = node.next;
        }

        return arr;
    }
}
