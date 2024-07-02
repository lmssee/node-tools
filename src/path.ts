import { fileURLToPath } from 'node:url';
import {
  win32,
  posix,
  dirname,
  join,
  normalize,
  // isAbsolute,
  // extname,
  // format,
  // sep,
} from 'node:path';
import { fileExist } from './file';

/**
 * 判断当前是否为 windows 环境
 *
 *  https://nodejs.org/docs/latest/api/path.html  */
const isWindows: boolean = process.platform == 'win32';

/** file name
 *
 * 获取文件名
 */
function pathBasename(filename: string) {
  return (isWindows ? win32 : posix).basename(filename);
}

/** Address concatenation
 *
 *
 * 路径拼接
 */
function pathJoin(..._path: string[]) {
  return normalize(join(..._path));
}

/** Get the directory name of the file
 *
 * 获取文件的目录名称
 */
function pathDirname(path: string) {
  return dirname(path);
}

/**  获取调用文件的信息
 *
 *
 *  @param fileName  传入调用该函数的文件路径（该路径需要搭配 {@link initializeFile} 获取）
 *
 * @returns { name:string, line:number,row:"" ,originArr:string[]}
 *
 */
function getCallerFileInfo(fileName: string): {
  name: string;
  line: number;
  row: number;
  originArr: string[];
} {
  /** 结果行 */
  const regexp = new RegExp(fileName);
  let errorInfo: Error;
  try {
    // 抛出异常好通过这里捕捉调用栈信息
    throw new Error();
  } catch (error: unknown) {
    errorInfo = error as Error;
  }
  const lines: string[] = (
    errorInfo.stack?.replace(/\\/gm, '/').split('\n') as string[]
  ).reverse();
  /** 查找结果 */
  const resultIndex: number = lines.findIndex(
    (currentEle: string, currentIndex: number, arr: string[]) =>
      !regexp.test(currentEle) && regexp.test(arr[currentIndex + 1]),
  );
  /** 如果没找到 */
  if (resultIndex == -1) return { name: '', line: 0, row: 0, originArr: lines };

  let result = lines[resultIndex];

  // 去除结果行中的 （） 外部分
  if (/\(.*\)/.test(result)) {
    result = result.replace(/^.*\((.*)\).*/, '$1');
  }
  /** 在 windows 环境去除 file：/// 前缀 */
  if (/file:\/*/.test(result)) {
    result = result.replace(/^.*file:\/*(.*)/, '$1');
  }
  // 非 windows 桌面添加 /
  !isWindows && !result.startsWith('/') && (result = '/' + result);
  return {
    name: result.replace(/^(.*):\d+:\d+$/, '$1'),
    line: Number(result.replace(/^.*:(\d+):\d+$/, '$')),
    row: Number(result.replace(/^.*:\d+:(\d+)$/, '$1')),
    originArr: lines,
  };
}

/**
 *
 * 获取调用文件的地址，该方法有一些局限性，请谨慎使用
 *
 * 建议搭配  `initializeFile` 使用
 *
 *  ```ts
 *  const [__filename,__dirname]  = initializeFile;
 *  const dir = getCallerFilename(__dirname);
 *
 * ```
 *
 *
 *  @param fileName 请调用时传入函数 __filename
 */
function getCallerFilename(fileName: string) {
  return getCallerFileInfo(fileName).name;
}

/**
 *
 * 初始化项目的 __filename 与  __dirname
 *
 * @return {*}  [__filename,__dirname]
 */
function initializeFile(): [string, string] {
  /** 文件地址  */
  let a;
  /** 文件躲在目录地址  */
  try {
    new Function('import("")');
    a = fileURLToPath(import.meta.url);
  } catch (error) {
    a = __filename;
  }
  if (isWindows) a = a.replace(/\\/gm, '/');
  a = getCallerFilename(a);
  const b = dirname(a);
  return [a, b];
}

/** 根据给定的文件或文件夹名称找到父级目录
 *
 * ```ts
 *
 * const result = getDirectoryBy('package.json');
 *
 * // 倘若 package.json 文件为兄弟目录
 *
 * console.log(result); // process.cwd();
 *
 * // 倘若当前文件链并不会存在 package.json 则
 *
 * console.log(result); // undefined
 *
 * ```
 * @param target  目标文件或文件夹
 * @param type 当前设定目标的类型：文件 `file` 或是文件夹 `directory`
 * @param [originalPath='']  查找的原始路径
 *
 * @returns 在捕获到目标后会返回目标，否则则返回 undefined
 */
function getDirectoryBy(
  target: string,
  type: 'file' | 'directory' = 'file',
  originalPath: string = '',
): string | undefined {
  // 当前工作目录
  let cwd: string = originalPath || process.cwd();
  // 查看当前工作目录是否存在
  const cwdIsExist = fileExist(cwd);
  // 倘若 cwd 不存在（只要针对于传入参数的情况）
  if (!cwdIsExist) return '';
  if (cwdIsExist.isFile()) cwd = pathDirname(cwd);
  else if (!cwdIsExist.isDirectory()) return '';
  do {
    // 目标文件
    const fileTest = fileExist(pathJoin(cwd, target));
    // 判断文件
    if (
      fileTest &&
      ((type == 'file' && fileTest.isFile()) ||
        (type == 'directory' && fileTest.isDirectory()))
    )
      return cwd;
    cwd = pathJoin(cwd, '..');
  } while (cwd !== pathJoin(cwd, '..'));
  return '';
}

export {
  isWindows,
  pathJoin,
  pathBasename,
  pathDirname,
  getCallerFileInfo,
  getCallerFilename,
  initializeFile,
  getDirectoryBy,
};

/**
 *
 * 地址的公共
 */
export default {
  isWindows: isWindows,
  /** Address concatenation
   *
   * 地址拼接
   */
  join: pathJoin,
  /** file name
   *
   * 文件名
   */
  basename: pathBasename,
  /** Get the directory name of the file
   *
   * 文件的目录
   */
  dirname: pathDirname,

  /** 初始化 __filename 和 __dirname  */
  initializeFile,
  /** 获取调用该函数的文件的信息 */
  getCallerFileInfo,
  /** 获取调用该函数文件  */
  getCallerFilename,
  /** 根据给定的目标查找存在该文件的目录 */
  getDirectoryBy,
};
