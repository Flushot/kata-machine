export default class ArrayList<T> {
    public length: number;
    public capacity: number;

    private arr: T[];

    constructor(capacity: number = 5) {
        if (capacity === 0) {
            throw new Error("capacity must be a positive integer");
        }

        this.length = 0;
        this.capacity = capacity;
        this.arr = new Array(capacity);
    }

    prepend(item: T): void {
        this.insertAt(item, 0);
    }

    insertAt(item: T, idx: number): void {
        if (this.length === 0 && idx === 0) {
            this.arr[0] = item;
            ++this.length;
            return;
        }

        this.shiftRight(idx);

        this.arr[idx] = item;
    }

    append(item: T): void {
        if (this.length === this.capacity) {
            this.realloc();
        }

        this.arr[this.length++] = item;
    }

    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; ++i) {
            if (this.arr[i] === item) {
                return this.removeAt(i);
            }
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        return this.arr[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            return undefined;
        }

        const val = this.arr[idx];

        this.shiftLeft(idx);

        return val;
    }

    toArray(): T[] {
        return this.arr.slice(0, this.length);
    }

    /**
     * Shift all elements to the left 1 spot
     *
     * @param idx Index to shift into
     * @private
     */
    private shiftLeft(idx: number): void {
        --this.length;

        // O(n)
        for (let i = idx; i < this.length; ++i) {
            this.arr[i] = this.arr[i + 1];
        }
    }

    /**
     * Shift all elements to the right 1 spot
     *
     * @param idx Index to shift from
     * @private
     */
    private shiftRight(idx: number): void {
        if ((idx + 1) >= this.capacity) {
            this.realloc(idx + 1);
        }

        // O(n)
        for (let i = this.length; i > idx; --i) {
            this.arr[i] = this.arr[i - 1];
        }

        ++this.length;
    }

    /**
     * Copy one array into another
     *
     * @param from Array to copy from
     * @param to Array to copy to
     * @private
     */
    private copy(from: T[], to: T[]): void {
        // O(n)
        for (let i = 0; i < this.length; ++i) {
            to[i] = from[i];
        }
    }

    /**
     * Reallocate the array
     *
     * @param newCapacity Capacity to grow to
     * @private
     */
    private realloc(newCapacity: number | null = null): void {
        if (newCapacity === null) {
            newCapacity = this.capacity * 2;
        }

        const oldArr = this.arr;
        this.arr = new Array(newCapacity);

        this.copy(oldArr, this.arr);
    }
}
