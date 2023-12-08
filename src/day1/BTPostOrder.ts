function search(head: BinaryNode<number> | null, values: number[]): number[] {
    if (!head) {
        return values;
    }

    search(head.left, values);
    search(head.right, values);
    values.push(head.value);

    return values;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return search(head, []);
}
