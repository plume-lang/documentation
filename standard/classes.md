# Global and general interfaces

Plume has a key feature that allows you to define a set of methods that shapes a type. We call this feature *interfacing*. 
- An interface is a set of methods that a type must implement to be considered as an instance of that interface. 
- What is implemented is a type extension, which is a way to add methods to a type.

## `to_string` function

This function is used to give the representation of any value. It is mainly used in some show implementations to prevent from implementing long and complex functions.

```plume
native "js" "std:native" to_string<A>(x: A): str
```

## `show` interface

Show interface is a way to give a string representation of a value. It should be used instead of `to_string`, which gives a Javascriptish representation of a value.

```plume
interface<A> show<A> {
  fn show_prec(a: A, prec: int): str
}
```

> `prec` means the depth of the value to show, used for styling purposes, especially in `str` extension.

We define a generic `show` function that just `show_prec` but with null `prec`.

```plume
fn show<A extends show>(a: A): str => a.show_prec(0)
```

## `boolean_algebra` interface

As the name may suppose, this interface is used to encode boolean operations, such as logical `and`, `or`.

```plume
interface<A> boolean_algebra<A> {
  fn and(x: A, y: A): A
  fn or(x: A, y: A): A
  fn not(b: A): A
}
```

## `equality` interface

This interface is used to encode equality operations, such as `==`, `!=`. It only defines a method `(==)` because `!=` is just the negation of `(==)`.

```plume
interface<A> equality<A> {
  fn (==)(a: A, b: A): bool
}
```

## `numeric`, and `product` interfaces

The `numeric` interface encodes additive and subtractive operations whereas the `product` interface encodes multiplicative and divisive operations (even power).

```plume
interface<A> numeric<A> {
  fn (+)(a: A, b: A): A
  fn (-)(a: A, b: A): A
}

infix 3 ^
interface<A> product<A> {
  fn (*)(a: A, b: A): A
  fn (/)(a: A, b: A): A
  fn (^)(a: A, b: int): A
}

fn negate<A extends (default, numeric)>(x: A): A
  => default() - x
```

`negate` permits negating values, it is used in some operations such as `(-)`.

## `ordering` interface

This interface is used to encode ordering operations, such as `<`, `>`, `<=`, `>=`. It only needs to define `(<)` because the others are just some combinations of `(<)`.

```plume
interface<A> ordering<A> {
  fn (<)(a: A, b: A): bool
}

fn (<=)<A extends (ordering, equality, boolean_algebra)>(a: A, b: A): bool => 
  (a < b) or (a == b)

fn (>=)<A extends (ordering, boolean_algebra)>(a: A, b: A): bool =>
  not (a < b)

fn (>)<A extends (ordering, boolean_algebra, equality)>(a: A, b: A): bool =>
  not (a <= b)
```

## `traversable`, and `foldable` interfaces

These interfaces are used to encode operations on collections. The `traversable` interface is used to encode operations that traverse a collection, i.e. `map`, whereas the `foldable` interface is used to encode operations that fold a collection, i.e. `foldl`

```plume
interface<T> traversable<T> {
  fn map<A, B>(self: T<A>, f: fn(A): B): T<B>
}

interface<T> foldable<T> {
  fn foldl<A, B>(self: T<A>, f: fn(B, A): B, init: B): B
}
```

## `indexable` interface

Indexable means getting index. This interface is used to encode the `get_index` operation on a collection.

```plume
interface<T, I> indexable<T, I> with T => I {
  fn get_index(self: T, i: int): Option<I>
}
```

You may notice that it uses a functional dependency `T => I` which means that `T` determines `I`. This is used to prevent from having to specify the type of the index when calling `get_index`, and this allows to express `get_index` for types that are not collections (for instance, `str`).

## `default`, and `monadic` interfaces

`default` interface lets us express the default value of a type:

```plume
interface<A> default<A> {
  fn default(): A
}
```

For instance, `default()` for `int` is `0`, and for `str` is `""`.

`monadic` interface is a bit more complicated, it encodes some monadic operations such as `bind`ing and `pure`:

- `bind` is commonly used to chain operations that return a monadic value.
- `pure` is used to wrap a value into a monadic value.
- a `monadic` value is just a wrapped value. For instance, `Option` is a monadic value, `list` is a monadic value.

```plume
interface<M> monadic<M> {
  fn bind<A, B>(self: M<A>, f: fn(A): M<B>): M<B>
  fn pure<A>(value: A): M<A>
}
```

Above all, we define some functions that are commonly used with monadic operations:

```plume
infixl 0 >>=
fn (>>=)<M extends monadic, A, B>(x: M<A>, f: fn(A): M<B>): M<B> => 
  x.bind(f)

fn and_then<M extends monadic, A, B>(x: M<A>, y: M<B>): M<B> => 
  x.bind(fn (_) => y)

infixl 1 >>
fn (>>)<M extends monadic, A, B>(x: M<A>, y: M<B>): M<B> => 
  x.and_then(y)

infixl 1 <<
fn (<<)<M extends monadic, A, B>(x: M<A>, y: M<B>): M<A> => 
  x.bind(fn (a) => y.bind(fn(_) => pure(a)))
```

- `>>=` is just an alias for `bind`
- `and_then` permits to chain two monadic values
- `>>` is an alias for `and_then`
- `<<` is an alias for `bind` but with a twist: it returns the first value of the first monadic value.

## Mutable operations

To achieve imperative programming easily, we define some functions that operate on mutable values:

```plume
infixr 0 +=
fn (+=)<A extends numeric>(var: mut A, x: A): A {
  var = *var + x
  return *var
}

infixr 0 -=
fn (-=)<A extends numeric>(var: mut A, x: A): A {
  var = *var - x
  return *var
}

infixr 0 *=
fn (*=)<A extends product>(var: mut A, x: A): A {
  var = *var * x
  return *var
}

infixr 0 /=
fn (/=)<A extends product>(var: mut A, x: A): A {
  var = *var / x
  return *var
}

infixr 0 ^=
```

## `convertible` interface

This interface uses functional dependencies to express explicit type conversion over a value. 

```plume
interface<A, B> convertible<A, B> with B => A {
  fn convert(x: A): Option<B>
}
```

Here the functional dependency is used to specify that the converted type is used to determine the original type. This is used to prevent from having to specify the original type when calling `convert`, and this allows to express `convert` for types that are not collections (for instance, `str`).