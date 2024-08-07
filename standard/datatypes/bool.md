# Boolean module

The Plume boolean module defines a set of functions and types that are used to manipulate lists.

Boolean provides extensions for:

- [`boolean_algebra` interface](../classes.md#boolean_algebra-interface)
- [`show` interface](../classes.md#show-interface)

## Some implemented functions

> Logical *not equal* operation
```plume
fn (!=)<A extends equality>(a: A, b: A): bool
```