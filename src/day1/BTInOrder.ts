function search(head: BinaryNode<number> | null, values: number[]): number[] {
    if (!head) {
        return values;
    }

    search(head.left, values);
    values.push(head.value);
    search(head.right, values);

    return values;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return search(head, []);
}
