import { test, mock, describe, it } from "node:test";
import {
  Color,
  fileExist,
  get,
  getCallerFilename,
  getNpmPkgInfo,
  initializeFile,
  isWindows,
  pathJoin,
  runOtherCode,
  testNpmPackageExist,
} from "../index";
import assert from "node:assert";
import testReadInput from "./testReadInput";
// 测试 read input 部分 
testReadInput;
/** 测试  get  */
test.skip("test", async (t) => {
  const result = await get("132");
  assert.strictEqual(result, true);
});

test('testNpmPkgExist', async (t) => {
  const result = await testNpmPackageExist('is-tools');
  assert.equal(result, true);
});

/** 测试从 npm 管理后台获取包信息 */
test("testGetNpmPkgInfo", async (t) => {
  const name = "is-tools";
  const result: any = await getNpmPkgInfo(name);
  assert.deepStrictEqual(result[0].name, name);
});

/** 测试地址拼接 */
test.skip("path-join", (t) => {
  const cwd = process.cwd();
  const result = pathJoin(cwd, "../");
  assert.notEqual(result, cwd);
});

/** 测试初始化 __filename */
test.skip("initializeFile", (t) => {
  const [__filename, __dirname] = initializeFile();
  console.log(__filename);
  console.log(__dirname);
});

/** 测试运行其他代码 */
test.skip("runOtherCOde", async (t) => {
  const result = await runOtherCode({
    code: isWindows ? "dir" : "ls",
    cwd: "./",
  });
  assert.notEqual(result.success, false);
});
