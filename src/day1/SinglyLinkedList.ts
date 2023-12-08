type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;

        ++this.length;

        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length) {
            throw new Error("Out of bounds");
        } else if (idx === this.length) {
            return this.append(item);
        } else if (idx === 0) {
            return this.prepend(item);
        }

        ++this.length;

        const node = { value: item } as Node<T>;
        let curr = this.at(idx - 1) as Node<T>;

        node.next = curr.next;
        curr.next = node;
    }

    append(item: T): void {
        const node = { value: item } as Node<T>;

        ++this.length;

        if (!this.tail) {
            this.head = this.tail = node;
            return;
        }

        this.tail.next = node;
        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;

        if (curr?.value === item) {
            return this.removeHead();
        }

        for (let i = 0; i < this.length && curr?.next; ++i) {
            if (curr.next?.value === item) {
                break;
            }

            curr = curr.next;
        }

        if (!curr) {
            return undefined;
        }

        return this.removeNextNode(curr);
    }

    get(idx: number): T | undefined {
        return this.at(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx === 0) {
            return this.removeHead();
        }

        const node = this.at(idx - 1);

        if (!node) {
            return undefined;
        }

        return this.removeNextNode(node);
    }

    private at(idx: number): Node<T> | undefined {
        let curr = this.head;

        for (let i = 0; i < idx && curr; ++i) {
            curr = curr.next;
        }

        return curr;
    }

    private removeHead(): T | undefined {
        if (!this.head) {
            return undefined;
        }

        const value = this.head.value;

        this.head = this.head.next;
        if (this.length == 1) {
            this.tail = this.head;
        }

        --this.length;
        return value;
    }

    private removeNextNode(node: Node<T>): T | undefined {
        if (!node.next) {
            return undefined;
        }

        --this.length;

        const toDelete = node.next;

        node.next = node.next.next;
        if (toDelete === this.tail) {
            this.tail = node;
        }

        return toDelete.value;
    }
}
