function qs(arr: number[], lo: number, hi: number): void {
    if (lo >= hi || lo < 0) {
        return;
    }

    const pivot = partition(arr, lo, hi);

    qs(arr, lo, pivot - 1);
    qs(arr, pivot + 1, hi);
}

function partition(arr: number[], lo: number, hi: number): number {
    // Use last element as pivot
    const pivot = arr[hi];

    let i = lo;

    for (let j = lo; j < hi; ++j) {
        if (arr[j] <= pivot) {
            // Swap current element with next pivot
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            ++i;
        }
    }

    // Move pivot to end of list
    arr[hi] = arr[i];
    arr[i] = pivot;

    return i;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
