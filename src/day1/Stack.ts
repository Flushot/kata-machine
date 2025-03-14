export class Node<T> {
    value: T;
    prev?: Node<T>;

    constructor(value: T) {
        this.value = value;
    }
}

export default class Stack<T> {
    public length: number;

    private head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        const node = new Node(item);
        if (this.head) {
            node.prev = this.head;
            this.head = node;
        } else {
            this.head = node;
        }

        ++this.length;
    }

    pop(): T | undefined {
        const node = this.head;

        if (node === undefined) {
            return undefined;
        }

        this.head = node.prev;
        node.prev = undefined;
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
            node = node.prev;
        }

        return arr;
    }
}
