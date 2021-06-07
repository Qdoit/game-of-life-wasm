# About
This is a simple implementation of Game Of Life in Rust, using WASM. 

Also comes with a text display mode.

# How to run?

## Requirements
To run this program you have to install:
- [The Rust Compiler](https://www.rust-lang.org/) (to compile the project)

If you want to run the WASM part:
- The [`wasm-pack` utility](https://rustwasm.github.io/wasm-pack/) (for compilation)
- [`npm`](https://www.npmjs.com/)  (for installing dependencies & running)

## Procedure
To run the CLI demo, use the command

    `cargo run`

in the root of the project

To run the (more advanced, but buggy) WASM version, go into the `www` folder, and run

    `npm run start`

It may first be required to run 

    `npm install`




