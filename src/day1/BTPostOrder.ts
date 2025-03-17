function walk(node: BinaryNode<number> | null, values: number[]): number[] {
    if (!node) {
        return values;
    }

    walk(node.left, values);
    walk(node.right, values);
    values.push(node.value);

    return values;
}

export default function post_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
