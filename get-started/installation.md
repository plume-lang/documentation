# How to install Plume

To install Plume on your computer, you may want one of the following solutions:

- [Package manager installation](#package-manager-installation)
- [Manual installation](#manual-installation)
- [Manual build](#manual-build)


## Package manager installation

Installing using a package manager is the easiest solution to adopt to test Plume. Here are the steps to follow:

### Brew

1. With Homebrew, you need to *tap* the repository:
    ```bash
    brew tap plume-lang/plume
    ```

2. And then, just install Plume:
    ```bash
    brew install plume
    ```

3. You will be asked by the terminal to add the `PLUME_PATH` variable to your environment variables.

### Scoop

1. With Scoop, you need to add the *bucket*:

    ```bash
    scoop bucket add plume-lang https://github.com/plume-lang/plume-bucket
    ```

2. And then install Plume:

    ```bash
    scoop install plume-lang/plume
    ```

## Manual installation

1. If you want to install Plume manually, you can download the latest release from the [GitHub releases page](https://github.com/plume-lang/plume/releases).

2. After downloading the archive, you need to extract it and add the `plume` binary to your `PATH` environment variable.

3. Don't forget to linkt the `PLUME_PATH` to your standard library path (generally `path/to/plume/standard`).

## Manual build

You'll need the following tools to build Plume:

- GHC (Glasgow Haskell Compiler): `>= 9.8.1`
- Python: `>= 3.11`
- NodeJS: `>= 20`
- Cabal: `>= 3.0`

> Note that you can install GHC and Cabal using GHCup.

1. Clone the repository locally:
    ```bash
    git clone --recurse-submodules https://github.com/plume-lang/plume.git
    ```
2. Run the `build_project` script:
    ```bash
    python scripts/build_project.py
    ```
3. Don't forget to linkt the `PLUME_PATH` to your standard library path (generally `path/to/plume/standard`), and also the `bin` folder to your `PATH` environment variable.