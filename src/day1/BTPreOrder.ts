function search(head: BinaryNode<number> | null, values: number[]): number[] {
    if (!head) {
        return values;
    }

    values.push(head.value);
    search(head.left, values);
    search(head.right, values);

    return values;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return search(head, []);
}
