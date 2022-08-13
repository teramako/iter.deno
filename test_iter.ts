import { iter } from "./mod.ts";
import {
    assert,
    assertEquals,
} from "https://deno.land/std@0.152.0/testing/asserts.ts";

function* range(start: number, end: number, step = 1) {
    for (let i = start; i <= end; i += step) {
        yield i;
    }
}

Deno.test("filter test", () => {
    const filtered = iter(range(0, 10)).filter((n) => n % 2 === 1);
    assertEquals([...filtered], [1, 3, 5, 7, 9]);
});
Deno.test("map test", () => {
    const mapped = iter(range(1, 3)).map((n) => n * n);
    assertEquals([...mapped], [1, 4, 9]);
});
Deno.test("uniq test", () => {
    const uniqList = [...iter([1, 2, 3, 1, 2]).uniq()];
    assert(uniqList.length === 3);
    assertEquals(uniqList, [1, 2, 3]);
});
Deno.test("flat test", () => {
    const list = [...iter([[1, 2], [3, [4, 5]], [6, 7, 8]]).flat()];
    assertEquals(list, [1, 2, 3, [4, 5], 6, 7, 8]);
});
