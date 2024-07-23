import { readFile } from 'node:fs/promises';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
/**
 *  读取 json 文件返回为 JSON 格式
 * @param fileDir  {@link String}  文件目录
 * @returns 返回是一个 {@link  Promise}
 */
function readFileToJson(fileDir: string) {
  return new Promise(
    (resolve, reject) =>
      (!/.json^/.test(fileDir) &&
        !statSync(fileDir, { throwIfNoEntry: false }) &&
        reject({})) ||
      readFile(fileDir, { encoding: 'utf-8' })
        .then(res => resolve(JSON.parse(res)))
        .catch(() => reject({})),
  );
}
/**
 *  同步 读取 json 文件并返回为 JSON
 *
 *  @param fileDir {@link String}  文件地址
 * @returns 返回的是一个 {@link JSON} 格式的数据
 */

function readFileToJsonSync(fileDir: string) {
  return (
    (!/.json^/.test(fileDir) &&
      !statSync(fileDir, { throwIfNoEntry: false }) &&
      {}) ||
    JSON.parse(readFileSync(fileDir, { encoding: 'utf-8' }) || '{}')
  );
}

/** 将一个 JSON 数据写入空白文件 */
function writeJsonFile(pathName: string, data: { [key: string]: string }) {
  writeFileSync(pathName, JSON.stringify(data, null, 2), {
    encoding: 'utf-8',
    flag: 'w',
  });
}

/**
 *  检验文件或文件接是否存在
 *
 * @param  fileDir  {@link String} 类型，为文件的路径（相对路径或绝对路径）
 * @returns Stats    Stats 或是 null
 */
function isExist(fileDir: string) {
  return statSync(fileDir, { throwIfNoEntry: false });
}

/**
 * 判断文件夹是否为空
 *
 *
 * @returns 返回值为简单的 `-1`、`0`、`1`
 *
 * - `-1` 当前给出的目录名在当前目录下不是目录或是打开失败时返回该值
 * - `0`   当前给出的目录名为目录，但是该目录为非空目录
 * - `1` 当前目录为空
 *
 */
function isEmpty(dirname: string): -1 | 0 | 1 {
  try {
    const fileInfo = isExist(dirname);
    if (fileInfo && fileInfo.isDirectory()) {
      return readdirSync(dirname, { withFileTypes: true }).length == 0 ? 1 : 0;
    }
  } catch (error) {
    return -1;
  }
  return -1;
}

export {
  readFileToJson,
  readFileToJsonSync,
  isExist as fileExist,
  isEmpty as dirEmpty,
  writeJsonFile,
};

export default {
  readFileToJson,
  readFileToJsonSync,
  isExist,
  isEmpty,
  writeJsonFile,
};
