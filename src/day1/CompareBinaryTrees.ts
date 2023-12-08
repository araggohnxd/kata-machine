export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    // 1. structural check
    if (!a && !b) {
        return true;
    }

    // 2. structural check
    if (!a || !b) {
        return false;
    }

    // 3. value check
    if (a.value !== b.value) {
        return false;
    }

    // 2. and 3. can be condensed in Typescript:
    // if (a?.value !== b?.value) {
    //     return false
    // }

    return compare(a.left, b.left) && compare(a.left, b.left);
}
