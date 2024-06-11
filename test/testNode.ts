import assert from "node:assert";
import { test } from "node:test";
import { getNpmPkgInfo, isWindows, runOtherCode, testNpmPackageExist } from "../index";

test.skip('test npm pkg exist', async (t) => {
    const result = await testNpmPackageExist('is-tools');
    assert.equal(result, true);
});

/** 测试从 npm 管理后台获取包信息 */
test.skip("test get npm pkg info", async (t) => {
    const name = "is-tools";
    const result: any = await getNpmPkgInfo(name);
    assert.deepStrictEqual(result[0].name, name);
});


/** 测试运行其他代码 */
test.skip("test run other code", async (t) => {
    const result = await runOtherCode({
        code: isWindows ? "dir" : "ls",
        cwd: "./",
    });
    assert.notEqual(result.success, false);
});

/** 测试 node 部分 */
export default () => 1;