import { default as path } from './src/path';
export { path };

export {
  isWindows,
  pathJoin,
  pathBasename,
  pathDirname,
  getCallerFileInfo,
  getCallerFilename,
  initializeFile,
  getDirectoryBy,
} from './src/path';

export { readInput } from './src/readInput/readInput';
export { Color } from './src/color';
export { runOtherCode, RunOtherCodeParam } from './src/runOtherCode';

export {
  getNpmPkgInfo,
  testNpmPackageExist,
  npmPkgInfoType,
} from './src/npmPkg';

export {
  t,
  __p,
  cursorAfterClear,
  cursorHide,
  cursorShow,
  cursorGetPosition,
  cursorMoveUp,
  cursorMoveDown,
  cursorMoveLeft,
  cursorMoveRight,
} from './src/cursor.js';

export {
  readFileToJson,
  readFileToJsonSync,
  fileExist,
  writeJsonFile,
  dirEmpty,
} from './src/file';

export { _p } from './src/print';

import { default as file } from './src/file';
export { file };
