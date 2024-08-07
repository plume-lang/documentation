# Your first Plume code

Once Plume is installed, you get lost in a new and vast world. To help you get started, we'll provide simple and clear examples to guide you through your first steps.

## Hello, world!

The most basic program we could write as a typical developer is the famous "Hello, world!" program. Here's how you can write it in Plume:

```plume
println("Hello world")
```

Quite simple, don't you think? To execute this program, we need to compile it:

```bash
plumec -e js your-program.plm
```

And then run it:

```bash
node your-program.js
```

## Basic syntax

Plume does not really differs from other programming languages syntactically speaking.

- **Conditions** are just `if <expr> <expr> else <expr>`, however, to avoid syntax ambiguites, you may use `if <expr> then <expr> else <expr>` syntax.
- **Functions** are `fn name(arg: type, ...): type => expr` or `fn name(arg: type, ...): type { <exprs> }`
- **Anonymous functions** are `fn(arg: type, ...): type => expr` or `fn(arg: type, ...): type { <exprs> }`
- **Pattern matching** is `switch <expr> { case <pattern> => <expr> ... }` (instead of `=> expr`, you could also use `{ <exprs> }`)

## ADTs (Algebraic Data Types)

An ADT is a way to encode complex data structures without loosing type safety. Here's an example of how you can define a simple ADT in Plume:

```plume
type Option<T> {
  Some(T),
  None
}
```

Then, `Some` can be used as a function and `None` as a variable. 

> Internally, Some and None are just functions and variables.
> The type of Some is `fn<A>(x: A): Option<A>` and the type of None is `Option<A>`

Some and None can be used as a pattern in switch-case expressions:

```plume
x = Some(42)

switch x {
  case Some(y) => println(y)
  case None => println("None")
}
```

## Extension system

The extension system in Plume allows you to define generalized behaviors for your types. Then you can extend these behaviors to your types. Here's an example of how you can define an extension in Plume:

```plume
interface<A> to_string<A> {
  fn to_string(self: A): str
}
```

Imagine you want to print an Option datatype, without having to define a custom function with a long name like `print_option`, and with some extra parameters to take the option format into account. You can define an extension for the `Option` type:

```plume
extend<A extends to_string> to_string<Option<A>> {
  fn to_string(self) => switch self {
    case Some(x) => "Some(" + x.to_string() + ")"
    case None => "None"
  }
}
```

Then, you can just use:

```plume
println(Some(42).to_string())
```

This system provides also a way to express functional dependencies. Functional dependencies are a way to tell the compiler a type is dependent on another type. For instance, we could have written a convertible interface:

```plume
interface<A, B> convertible<A, B> with B => A {
  fn convert(self: A): B
}
```

What this means is that if you have a type `A` and a type `B` and you can convert `A` to `B`, then  `A` must be determined by `B`. This greatly helps the compiler to infer types and resolve seamlessly interface resolution.

In generics, you can also specify what interfaces you want your generic to implement. For instance, defining a `println` could result in:

```plume
fn println<A extends to_string>(x: A) => ffi_println(x.to_string())
```

## Mutable operations

Mutable are a way to express type safely mutable operations. They're a complete type, meaning that `mut int` is not equivalent to `int`. Here's an example of how you can use mutable operations in Plume:

```plume
mut x = 42

println(x) // mut 42

x = 43

println(x) // mut 43
```

Some useful operations are implemented over mutable type, such as `+=`, `*=`, and so on.