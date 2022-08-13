# iter.deno
"iter.deno" is Deno module creating extended Generator that is method chainable.

## functions

- `iter(list: Itrable<T>) : ExGenerator<T>`

### methods

- `filter` : Like Array.prototype.filter
- `map` : Lile Array.prototype.map
- `uniq` : Creates Generator object of unique list
- `flat` : Like Array.prototype.flat (but only 1-level shallow)

## Example

```typescript
import {iter} from "./mod.ts";

console.log(
    [...iter([1,2,3,4,5,6,7,8,9])
        .filter(n => {
            console.log(`filter: ${n} % 2 == 1 ?`)
            return n % 2 == 1;
        })
        .map(n => {
            console.log(`map: ${n} + 10`)
            return n + 10;
        })
    ]
)
/*
filter: 1 % 2 == 1 ?
map: 1 + 10
filter: 2 % 2 == 1 ?
filter: 3 % 2 == 1 ?
map: 3 + 10
filter: 4 % 2 == 1 ?
filter: 5 % 2 == 1 ?
map: 5 + 10
filter: 6 % 2 == 1 ?
filter: 7 % 2 == 1 ?
map: 7 + 10
filter: 8 % 2 == 1 ?
filter: 9 % 2 == 1 ?
map: 9 + 10
[ 11, 13, 15, 17, 19 ]
*/
```