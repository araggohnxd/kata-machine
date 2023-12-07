export default class ArrayList<T> {
    public length: number;
    private data: (T | undefined)[];

    constructor(private capacity: number = 0) {
        this.length = 0;
        this.data = Array.from({ length: capacity }, () => undefined);
    }

    prepend(item: T): void {
        if (this.length === this.capacity) {
            this.resize(this.length ? this.length * 2 : 1);
        }

        for (let i = this.length; i > 0; --i) {
            this.data[i] = this.data[i - 1];
        }

        this.data[0] = item;
        ++this.length;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx >= this.length) {
            throw new Error("Index out of bounds");
        }

        if (this.length === this.capacity) {
            this.resize(this.length ? this.length * 2 : 1);
        }

        for (let i = this.length; i > idx; --i) {
            this.data[i] = this.data[i - 1];
        }

        this.data[idx] = item;
        ++this.length;
    }

    append(item: T): void {
        if (this.length === this.capacity) {
            this.resize(this.length ? this.length * 2 : 1);
        }

        this.data[this.length] = item;
        ++this.length;
    }

    remove(item: T): T | undefined {
        for (let i = 0; i < this.length; ++i) {
            if (this.data[i] === item) {
                return this.removeAt(i);
            }
        }

        return undefined;
    }

    get(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        return this.data[idx];
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0 || idx >= this.length) {
            return undefined;
        }

        const value = this.data[idx];

        for (let i = idx; i < this.length - 1; ++i) {
            this.data[i] = this.data[i + 1];
        }

        --this.length;

        /* Apparently, this line makes pop-like operations (.removeAt(length-1))
         * extremely slow, so I'll keep it as a comment just for the sake of it,
         * since it is not necessary in TS anyway
         */
        // this.data[this.length] = undefined;

        return value;
    }

    private resize(size: number) {
        this.data = Array.from({ ...this.data, length: size });
        this.capacity = size;
    }
}
