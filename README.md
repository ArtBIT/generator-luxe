# generator-luxe 
[![Build Status](https://travis-ci.org/ArtBIT/generator-luxe.svg)](https://travis-ci.org/ArtBIT/generator-luxe)

> [Yeoman](http://yeoman.io) generator for [snõwkit](http://snowkit.org/) [luxe](http://luxeengine.com/) game engine.


# Installation
```bash
$ npm install -g yo
$ npm install -g generator-luxe
```

# Usage
```bash
$ mkdir mygame && cd $_
$ yo luxe 
```
This will generate a new project

## Project structure
```bash
assets/
|  luxe_logo.png
src/
|  Main.hx
project.flow
```

## Generate a new component
```bash
$ yo luxe:component <name>
```
This will generate a new component in `src/components`

## Generate a new entity
```bash
$ yo luxe:entity <name>
```
This will generate a new entity in `src/entities`

## Generate a new state
```bash
$ yo luxe:state <name>
```
This will generate a new state in `src/states`

## Credit
Thanks to Juno Nguyen for the [state based luxe template](https://github.com/JunoNgx/luxeTpl)

## License

MIT
