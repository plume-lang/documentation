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

## Variables and literals

Most basic constructs of a programming language could be seen with elements such as variables and literals. A variable is just a name over a value, a location to store value. A literal is a value itself.

We have four primitive values in Plume:

1. Integers: `-1`, `10`, ...
2. Floatings: `-1.24`, `1.33`, `1.0`, ...
3. Characters: `'c'`, `'\n'`, ...
4. Strings: `"Hello world"`, `"My name is Plume"`, ...

And we declare a variable like that:

```plume
my_variable = 5
my_string = "test"
my_number = 125 
```

We could improve our hello world program, to be more complex unnecessarily, by adding variables:

```plume
message = "Hello world"
println(message)
```

## Conditions

Now, let's discover one new function to leverage the complexity of our program: `input`. This function just asks the user an entry and returns it. We could use it to make a simple program that greets the user:

```plume
name = input("What's your name?")
println("Hello, " + name)
```

But what if the user doesn't want to give his name? We could add a condition to handle this case:

```plume
name = input("What's your name?")
if name == ""
  println("Hello, stranger!")
else
  println("Hello, " + name)
```

## Functions

To make our code more modular and reusable, we could define functions. A function is a block of code that could be called with parameters. Here's how you could define a function in Plume:

```plume
fn greet(name) =>
  if name == "" then
    "Hello, stranger!"
  else
    "Hello, " + name
```

And then use it like that:

```plume
name = input("What's your name?")
println(greet(name))
```

### Recursive functions

A side not on recursive functions, what if we want to write a function that computes the product of numbers from 1 to n? We could write some examples to understand the concept:

```plume
x1 = 1
x2 = 1 * 2
x3 = 1 * 2 * 3
x4 = 1 * 2 * 3 * 4
// ...
```

As you may have noticed, for each next number, we multiply the previous result by the next number. We could quantify this by a mathematical sequence:

```
u₀ = 1
uₙ = uₙ₋₁ * n
```

With Plume, we write it in that way:

```plume
fn rec_product(n: int) =>
  if n == 0 then
    1
  else
    rec_product(n - 1) * n
```

We call that function *factorial*, and we use it like that:

```plume
println(rec_product(5)) // 120
```