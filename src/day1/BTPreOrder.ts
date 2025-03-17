function walk(node: BinaryNode<number> | null, values: number[]): number[] {
    if (!node) {
        return values;
    }

    values.push(node.value);
    walk(node.left, values);
    walk(node.right, values);

    return values;
}

export default function pre_order_search(head: BinaryNode<number>): number[] {
    return walk(head, []);
}
