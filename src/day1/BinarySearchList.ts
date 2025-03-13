export default function bs_list(haystack: number[], needle: number): boolean {
    let lo = 0;
    let hi = haystack.length;

    do {
        const mid = Math.floor((lo + (hi - lo) / 2));
        const item = haystack[mid];

        if (item === needle) {
            return true;
        } else if (item < needle) {
            lo = mid + 1;
        } else {
            // item >= needle
            hi = mid;
        }
    } while (hi > lo);

    return false;
}
