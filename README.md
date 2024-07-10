# is-mi-node-tools

A purely functional tool that includes

- `nodes` use

## language

<table><tr>
<td><a href="https://github.com/lmssee/node-tools/blob/main/README.md"  target="_self">English</a></td>
<td><a href="https://github.com/lmssee/node-tools/blob/main/自述文件.md"  target="_self">中文</a></td>
</tr></table>

## install

```sh
npm install   ismi-node-tools  --save
```

## `file`

- `readFileToJson` read `.json` file and return JSON or `null`
- `readFileToJsonSync` synchronous read `.json` file and return `JSON` or `null`
- `fileExist` Does the file exist
- `writeJsonFile` 把 `json` Write data to a blank file

## `runOtherCode` section

- `runOtherCode` Run other code
- `RunOtherCodeParam` Declaration of parameter types for running other code

## `npmPkg` section

- `npmPkgInfoType` type of `getNpmPkgInfo` returns
- `getNpmPkgInfo` get npm package info
- `testNpmPackageExist` test a npm package is exist

## `path` section

- `pathJoin` File address concatenation
- `pathBasename` Provide file path to obtain file name, without file type suffix
- `initializeFile` Initialize the paths `__filename` and `__dirname` , as they can only be used in the `cjs` file. They are initialized here and are compatible
- `getCallerFilename` Get the file that calls the function
- `isWindows` Is it currently in a Windows environment, used to address the differences caused by different time separators when using 'path'
- - `getDirectoryBy` Find the parent directory of the target based on its file or file name

### cursor section

You can use cursor to manipulate the cursor position:

|         Method          |          Schematic          |                      Parameters                       |
| :---------------------: | :-------------------------: | :---------------------------------------------------: |
|           `t`           |          `\u001B`           |                          --                           |
|          `_p`           | on `node` environment print | `r` print string; `lineFeed` line feed,default `true` |
|      `cursorHide`       |         cursor hide         |                          --                           |
|      `cursorShow`       |         cursor show         |                          --                           |
|  `cursorPositionSave`   |    Store cursor position    |                          --                           |
| `cursorPositionRestore` |  Restores cursor position   |                          --                           |
|     `cursorMoveUp`      |          cursor Up          |      `numberOfUpwardMoves` offset, default to 1       |
|    `cursorMoveDown`     |         cursor Down         |       `numberOfMovesDown` offset, default to 1        |
|    `cursorMoveLeft`     |         cursor Left         |       `numberOfLeftShifts` offset, default to 1       |
|    `cursorMoveRight`    |        cursor Right         |      `numberOfRightShifts` offset, default to 1       |
|   `cursorAfterClear`    |   clear all after cursor    |                          --                           |

### readInput section

## A function waiting for user input. Because it needs to wait, it is asynchronous, and when using it, `wait` should be used

```js
import { readInput } from "ismi-node-tools";

const callBackFunction = (keyValue: string | undefined, key: any) => {
  if (key.name && key.name == "return") return true;
  else
    return console.log(
      `Try a different key, this key (${keyValue}) do not execute exit`
    );
};
```

## Color section

The string color value of the terminal (meaning it cannot be used in a browser environment, (in fact, browsers have [a simpler implementation method](https://developer.mozilla.org/zh-CN/docs/Web/API/console)) :

### Color static method

|      method       |       rgb 色值       | ｜ Hexadecimal color value |
| :---------------: | :------------------: | :------------------------: |
| `fromHexadecimal` |         ---          |            ---             |
|     `fromRgb`     |         ---          |            ---             |
|     `random`      |         ---          |            ---             |
|    `darkBlack`    |  `rgb(86 ,86 ,86)`   |         `#565656`          |
|     `darkRed`     |  `rgb(181 ,40 ,29)`  |         `#b5281d`          |
|    `darkGreen`    |  `rgb(50 ,181 ,32)`  |         `#32b520`          |
|   `darkYellow`    | `rgb(160 ,160 ,29)`  |         `#a0a01d`          |
|    `darkBlue`     |  `rgb(64 ,10 ,217)`  |         `#400ad9`          |
|   `darkMagenta`   | `rgb(201 ,24 ,201)`  |         `#c918c9`          |
|    `darkCyan`     | `rgb(45 ,174 ,187)`  |         `#2daebb`          |
|    `darkWhite`    | `rgb(193 ,193 ,193)` |         `#c1c1c1`          |
|   `lightBlack`    | `rgb(111 ,111 ,111)` |         `#6f6f6f`          |
|       `red`       |  `rgb(252 ,33 ,25)`  |         `#fc2119`          |
|      `green`      |  `rgb(47 ,232 ,26)`  |         `#2fe81a`          |
|     `yellow`      | `rgb(232 ,236 ,20)`  |         `#e8ec14`          |
|      `blue`       |  `rgb(74 ,3 ,254)`   |         `#4a03fe`          |
|     `magenta`     |  `rgb(251 ,0 ,253)`  |         `#fb00fa`          |
|      `cyan`       | `rgb(255 ,255 ,255)` |         `#ffffff`          |

### use Color

```ts
import { Color, _p } from 'ismi-node-tools';

/** `_Color` does not necessarily have to ce used together with `_p` ，`_p` is just the encapsulation of `process.stdout.write` */

_p(
  `${Color.red(
    `Red start${Color.yellow('The middle is yellow')} and the red ending`,
  )}`,
);

_p(Color.random('Randomly print a string of color values'));
```

If you have any questions, you can directly [submit question](https://github.com/lmssee/node-tools/issues/new)
