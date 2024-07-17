import assert from 'node:assert';
import { test } from 'node:test';
import {
  getNpmPkgInfo,
  npmPkgInfoType,
  runOtherCode,
  testNpmPackageExist,
} from '../index';

test.skip('test npm pkg exist', async () => {
  const result = await testNpmPackageExist('ismi-node-tools');
  assert.equal(result, true);
});

/** 测试从 npm 管理后台获取包信息 */
test.skip('test get npm pkg info', async () => {
  const name = 'aaa';
  const result = (await getNpmPkgInfo(name)) as npmPkgInfoType;
  console.log(result);
  console.log(result.packument.versions[0].dist.signatures);

  assert.deepStrictEqual(result.name, name);
});

/** 测试运行其他代码 */
test.skip('test run other code', async () => {
  const result = await runOtherCode({
    code: 'npx ixxx cls &&  npm install',
    cwd: './',
  });
  console.log(result);

  assert.notEqual(result.success, false);
});
