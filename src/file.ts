import { readFile } from 'node:fs/promises';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
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
function fileExist(fileDir: string) {
  return statSync(fileDir, { throwIfNoEntry: false });
}

export { readFileToJson, readFileToJsonSync, fileExist, writeJsonFile };
