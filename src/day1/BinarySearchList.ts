export default function bs_list(haystack: number[], needle: number): boolean {
    let start = 0;
    let end = haystack.length;

    while (start < end) {
        const midpoint = Math.floor(start + (end - start) / 2);
        const value = haystack[midpoint];

        if (value === needle) {
            return true;
        } else if (value > needle) {
            end = midpoint;
        } else {
            start = midpoint + 1;
        }
    }

    return false;
}
