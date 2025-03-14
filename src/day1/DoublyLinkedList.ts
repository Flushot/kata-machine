export class Node<T> {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;

    constructor(value: T) {
        this.value = value;
    }
}

export default class DoublyLinkedList<T> {
    public length: number;

    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        const node = new Node(item);
        if (this.head) {
            const prevHead = this.head;
            this.head = node;
            node.next = prevHead;
            prevHead.prev = node;
        } else {
            this.head = node;
        }

        if (node.next === undefined) {
            this.tail = node;
        }

        ++this.length;
    }

    insertAt(item: T, idx: number): void {
        let nodeAtIdx = this.getNodeByIndex(idx);
        if (nodeAtIdx === undefined) {
            throw new Error(`Node not found at index ${idx}`);
        }

        const node = new Node(item);

        node.prev = nodeAtIdx.prev;
        node.next = nodeAtIdx;
        nodeAtIdx.prev = node;

        if (node.next === undefined) {
            this.tail = node;
        }

        ++this.length;
    }

    append(item: T): void {
        const node = new Node(item);
        if (!this.tail) {
            this.head = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
        }

        this.tail = node;

        ++this.length;
    }

    remove(item: T): T | undefined {
        const node = this.getNodeByValue(item);
        if (node === undefined) {
            return undefined;
        }

        this.removeNode(node);

        return node.value;
    }

    get(idx: number): T | undefined {
        return this.getNodeByIndex(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.getNodeByIndex(idx);
        if (node === undefined) {
            return undefined;
        }

        this.removeNode(node);

        return node.value;
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

    private getNodeByValue(item: T): Node<T> | undefined {
        if (!this.head) {
            return undefined;
        }

        let node: Node<T> | undefined = this.head;
        while (node !== undefined && node.value !== item) {
            node = node.next;
        }

        return node;
    }

    private getNodeByIndex(i: number): Node<T> | undefined {
        let node: Node<T> | undefined = this.head;
        let index = 0;

        while (node !== undefined) {
            if (index === i) {
                return node;
            }

            node = node.next;
            ++index;
        }

        return undefined;
    }

    private removeNode(node: Node<T>): void {
        const before = node.prev;
        const after = node.next;

        if (before) {
            before.next = after;
        } else {
            this.head = after;
        }

        if (after) {
            after.prev = before;
        } else {
            this.tail = before;
        }

        node.prev = undefined;
        node.next = undefined;

        --this.length;
    }
}
