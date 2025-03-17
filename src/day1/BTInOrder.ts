function walk(node: BinaryNode<number> | null, values: number[]): number[] {
    if (!node) {
        return values;
    }

    walk(node.left, values);
    values.push(node.value);
    walk(node.right, values);

    return values;
}

export default function in_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
