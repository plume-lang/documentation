# List module

The Plume List module defines a set of functions and types that are used to manipulate lists.

List provides extensions for:

- [`indexable` interface](../classes.md#indexable-interface)
- [`traversable`, and `foldable` interfaces](../classes.md#traversable-and-foldable-interfaces)
- [`show` interface](../classes.md#show-interface)
- [`numeric` interface](../classes.md#numeric-and-product-interfaces)
- [`equality` interface](../classes.md#equality-interface)
- [`default` interface](../classes.md#default-and-monadic-interfaces)

## Some implemented functions

> Compute the length of a generic collection that implements `foldable`
```plume
fn len<T extends foldable, A>(x: T<A>): int
```

> Filter elements of a list according to a predicate

```plume
fn filter<A>(x: list<A>, f: fn(A): bool): list<A>
```

> Check if an element is present in a collection.
```plume
fn elem<T extends foldable, A extends equality>(x: T<A>, y: A): bool
```

> Removing the `start`nth elements of a list
```plume
fn slice<A>(xs: list<A>, start: int): list<A>
```

> Find an element in a collection that contains tuples (for instance dictionaries `type Dict<V> = list<(str, V)>`).
```plume
fn find<T extends foldable, A, B>(x: T<(A, B)>, f: fn(A): bool): Option<B>
```

> Cutting a list according to a predicate. It takes elements of the list while the predicate is satisfied.
```plume
fn span<A>(x: list<A>, f: fn(A): bool): (list<A>, list<A>)
```

> Split a list into sublists according to a predicate.
```plume
fn split_on<A extends equality>(x: list<A>, y: A): list<list<A>>
```

> Adding an element `y` between every item of the list `x`
```plume
fn join<A>(x: [A], y: A): [A]
```

> Reverse the list
```plume
fn reverse<A extends equality>(xs: list<A>): list<A>
```

> `nub` removes every duplicated elements of the array.
> `nub_maybe` removes any `None` value in the array.
```plume
fn nub<A extends equality>(x: [A]): [A]
fn nub_maybe<A extends equality>(xs: list<Option<A>>): list<A>
```

> Sort a list of elements that implement `ordering` and `equality` interfaces.
```plume
fn sort<A extends (equality, ordering)>(xs: list<A>): list<A>
```

> Sorting elements according to a predicate
```plume
fn sort_on<A extends (equality, ordering)>(
  xs: list<A>, 
  f: fn(A, A): bool
): list<A>
```

> `first` extract the first element of a list
> `tail` extract the rest of the list
```plume
fn first<A>(xs: list<A>): Option<A>
fn tail<A>(xs: list<A>): list<A>
```

> `last` extract the last element of a list
> `init` extract the list without the last element
```plume
fn last<A>(xs: list<A>): Option<A>
fn init<A>(xs: list<A>): list<A>
```

> `drop` removes the first `count` elements of a list
> `drop_while` removes elements of the list while the predicate is satisfied
> `take` keeps the first `count` elements of a list
> `take_while` keeps elements of the list while the predicate is satisfied
```plume
fn drop<A>(xs: list<A>, count: int): list<A>
fn drop_while<A>(x: list<A>, f: fn(A): bool): list<A>

fn take<A>(xs: list<A>, count: int): list<A>
fn take_while<A>(x: list<A>, f: fn(A): bool): list<A>
```

> `any` checks if a predicate condition applies on any element of a list
> `all` checks if a predicate condition applies over every element of a list
```plume
fn any<A>(f: fn(A): bool, xs: list<A>): bool
fn all<A>(f: fn(A): bool, xs: list<A>): bool
```