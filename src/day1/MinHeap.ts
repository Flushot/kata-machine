export default class MinHeap {
    public length: number;

    private data: number[];

    constructor() {
        this.length = 0;
        this.data = [];
    }

    insert(value: number): void {
        this.data[this.length] = value;
        this.heapifyUp(this.length++);
    }

    delete(): number {
        if (this.length === 0) {
            throw new Error("heap is empty");
        }

        const result = this.data[0];
        --this.length;

        if (this.length === 0) {
            this.data = [];
            return result;
        }

        this.data[0] = this.data[this.length];
        this.heapifyDown(0);

        return result;
    }

    private heapifyUp(idx: number): void {
        if (idx === 0) {
            return;
        }

        const parent = this.parent(idx);
        const parentVal = this.data[parent];
        const val = this.data[idx];

        if (parentVal > val) {
            // Swap value with parent
            this.data[parent] = val;
            this.data[idx] = parentVal;

            this.heapifyUp(parent);
        }
    }

    private heapifyDown(idx: number): void {
        const leftIdx = this.leftChild(idx);
        const rightIdx = this.rightChild(idx);

        if (idx >= this.length || leftIdx >= this.length ) {
            return;
        }

        const leftVal = this.data[leftIdx];
        const rightVal = this.data[rightIdx]
        const val = this.data[idx];

        if (leftVal > rightVal && val > rightVal) {
            // left > val > right

            // Swap value with right
            this.data[idx] = rightVal;
            this.data[rightIdx] = val

            this.heapifyDown(rightIdx);
        } else if (rightVal > leftVal && val > leftVal) {
            // left < val < right

            // Swap value with left
            this.data[idx] = leftVal;
            this.data[leftIdx] = val;

            this.heapifyDown(leftIdx);
        }
    }

    private parent(idx: number): number {
        return Math.floor((idx - 1) / 2);
    }

    private leftChild(idx: number): number {
        return 2 * idx + 1;
    }

    private rightChild(idx: number): number {
        return 2 * idx + 2;
    }
}
