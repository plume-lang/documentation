# Number module

The Plume number module defines a set of functions and types that are used to manipulate numbers.

`int` provides extensions for:

- [`numeric`, and `product` interfaces](../classes.md#numeric-and-product-interfaces)
- [`show` interface](../classes.md#show-interface)
- [`ordering` interface](../classes.md#ordering-interface)
- [`equality` interface](../classes.md#equality-interface)
- [`convertible` interface](../classes.md#convertible-interface)

`float` provides extensions for:

- [`numeric`, and `product` interfaces](../classes.md#numeric-and-product-interfaces)
- [`show` interface](../classes.md#show-interface)
- [`ordering` interface](../classes.md#ordering-interface)
- [`equality` interface](../classes.md#equality-interface)
- [`convertible` interface](../classes.md#convertible-interface)

## Some implemented functions

```plume
macro e = 2.718282
```

```plume
fn expf(x: float): float
fn exp(x: int): float
```

```plume
fn to_int(x: float): int
fn to_float(x: int): float
```