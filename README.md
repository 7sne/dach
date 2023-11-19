![Satori](.github/card.png)

**Dach**: Democratizing the creation of elegant banners for everyone's project.

> **Note**
> This project is currently in its early stages of development, and there may be instances where it is either not functioning as intended or experiencing issues. Your feedback, as well as any identified issues or contributions, would be greatly appreciated in shaping its future progress. I still consider myself a beginner in software development, so I would greatly appreciate your understanding. ♥️

## Installation

```bash
  npm i -g dach
```

## Overview

### Features

-   Generate banners using a wide variety of predefined themes.
-   Create and add new themes via the [web toolkit](https://www.dach.kukielka.xyz).
-   And much incoming!

### Description

Dach is a command-line tool that you will most likely use only once per project. Its strength lies in the ability to create themes for it using the [web toolkit](https://dach.kukielka.xyz). You can then apply these themes to your personal or organizational projects. Currently, customization options are somewhat limited and opinionated, but they will likely undergo slight changes in the future as the project evolves.

### Usage

To generate a default banner, simply run `dach generate` in your project's directory.

#### Banner using predefined theme and rounded corners:

```bash
dach generate  \
  --theme funk  \
  --title "Funk" \
  --description "Example description" \
  --rounded-corners \
  --output "."
```

#### Banner with custom output directory:

```bash
dach generate    \
  --theme elegant \
  --title "Output" \
  --description "Custom output directory" \
  --output "./my-dir"
```

#### Banner with custom dimensions:

```bash
dach generate \
  --theme funk \
  --title "Hello" \
  --description "Worlds" \
  --dimensions "1920x1200" \
  --output "."
```

## Commands

### Generate

`dach generate`,
Generates a banner using provided arguments.

<table>
    <tr>
        <th>Option</th>
        <th>Alias</th>
        <th>Description</th>
        <th>Default</th>
    </tr>
    <tr>
        <td><code>--output</code></td>
        <td><code>-o</code></td>
        <td>Path to output directory.</td>
        <td><code>CWD/.github</code></td>
    </tr>
    <tr>
        <td><code>--title</code></td>
        <td><code>-t</code></td>
        <td>Banner title.</td>
        <td><code>Untitled</code></td>
    </tr>
    <tr>
        <td><code>--description</code></td>
        <td><code>-d</code></td>
        <td>Banner description.</td>
        <td><code>Project description</code></td>
    </tr>
    <tr>
        <td><code>--rounded-corners</code></td>
        <td><code>-rc</code></td>
        <td>Rounded corners.</td>
        <td><code>false</code></td>
    </tr>
    <tr>
        <td><code>--theme</code></td>
        <td><code>-</code></td>
        <td>Theme of banner.</td>
        <td><code>elegant</code></td>
    </tr>
</table>

### Add

`dach add <name>`, Adds a new theme to the list of available themes.

<table>
    <tr>
        <th>Option</th>
        <th>Alias</th>
        <th>Description</th>
        <th>Default</th>
    </tr>
    <tr>
        <td><code>--colors</code></td>
        <td><code>-c</code></td>
        <td>Colors of theme.</td>
        <td><code>-</code></td>
    </tr>
    <tr>
        <td><code>--positions</code></td>
        <td><code>-p</code></td>
        <td>Position coordinates for each color.</td>
        <td><code>-</code></td>
    </tr>
    <tr>
        <td><code>--title-color</code></td>
        <td><code>-t</code></td>
        <td>Color of title.</td>
        <td><code>-</code></td>
    </tr>
    <tr>
        <td><code>--description-color</code></td>
        <td><code>-d</code></td>
        <td>Color of the description.</td>
        <td><code>-</code></td>
    </tr>
    <tr>
        <td><code>--dimensions</code></td>
        <td><code>-dim</code></td>
        <td>Dimensions of banner.</td>
        <td><code>3000x1685</code></td>
    </tr>
    <tr>
        <td><code>--ratio</code></td>
        <td><code>-r</code></td>
        <td>Width to height ratio of banner.</td>
        <td><code>16:9</code></td>
    </tr>
</table>

## Example banners

### Blaze

![Blaze](.github/example-banners/blaze.png)

### Pearl

![Pearl](.github/example-banners/pearl.png)

### Elegant

![Elegant](.github/example-banners/elegant.png)

### Peach

![Peach](.github/example-banners/peach.png)

### Flora

![Flora](.github/example-banners/flora.png)

### Lotus

![Lotus](.github/example-banners/lotus.png)

## Contributing

All contributions are much appreciated. Guidelines TBD.

## License

[Maciej Kukielka](https://twitter.com/KukielkaMaciej) | MIT License
