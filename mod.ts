// deno-lint-ignore-file no-this-alias no-explicit-any
/**
 * Extended Generator is method chainable
 */
export interface ExGenerator<T> extends Generator<T> {
    /**
     * Like Array.prototype.map
     */
    map<T2>(func: { (item: T, i: number): T2 }, thisArg?: any): ExGenerator<T2>;
    /**
     * Like Array.prototype.filter
     */
    filter(
        func: { (item: T, i: number): boolean },
        thisArg?: any,
    ): ExGenerator<T>;

    /**
     * returns iterator of `[...new Set(...)]`
     */
    uniq<T>(this: ExGenerator<T>): ExGenerator<T>;

    /**
     * returns iterator of shallow flat list
     */
    flat<T>(this: ExGenerator<T>): Flat<T>;
}
type Flat<T> = T extends string ? ExGenerator<string>
    : T extends { [Symbol.iterator]: () => IterableIterator<infer U> } ? Flat<U>
    : ExGenerator<T>;

/**
 * Creaates Extended Generator object that is method chainable.
 */
export const iter = (function () {
    // Original Generator.prototype
    const GeneratorProto = ({ *g() {} }).g().constructor.prototype;
    /**
     * Extended Generator.prototype
     */
    const ExtendedGeneratorProto = Object.setPrototypeOf({
        map(func: { (item: any, i: number): any }, thisArg = null) {
            const iterable = this;
            return Object.setPrototypeOf(
                function* () {
                    let i = 0;
                    for (const item of iterable) {
                        yield func.call(thisArg, item, i);
                        ++i;
                    }
                }(),
                ExtendedGeneratorProto,
            );
        },
        filter(func: { (item: any, i: number): boolean }, thisArg = null) {
            const iterable = this;
            return Object.setPrototypeOf(
                function* () {
                    let i = 0;
                    for (const item of iterable) {
                        if (func.call(thisArg, item, i)) yield item;
                        ++i;
                    }
                }(),
                ExtendedGeneratorProto,
            );
        },
        uniq() {
            const iterable = this;
            return Object.setPrototypeOf(
                function* () {
                    const s = new Set();
                    for (const item of iterable) {
                        if (!s.has(item)) {
                            yield item;
                            s.add(item);
                        }
                    }
                }(),
                ExtendedGeneratorProto,
            );
        },
        flat<
            T extends { [Symbol.iterator]: () => IterableIterator<T> },
        >(): ExGenerator<T> {
            const iterable: Iterable<T> = this;
            return Object.setPrototypeOf(
                function* () {
                    for (const item of iterable) {
                        if (
                            item !== null && typeof item === "object" &&
                            Symbol.iterator in item
                        ) {
                            yield* item;
                        } else {
                            yield item;
                        }
                    }
                }(),
                ExtendedGeneratorProto,
            );
        },
    }, GeneratorProto);

    return <T>(iterable: Iterable<T>): ExGenerator<T> => {
        return Object.setPrototypeOf(
            function* () {
                yield* iterable;
            }(),
            ExtendedGeneratorProto,
        );
    };
}());
