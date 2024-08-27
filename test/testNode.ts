import assert from 'node:assert';
import { test } from 'node:test';
import { getNpmPkgInfo, npmPkgInfoType, testNpmPackageExist } from '../index';

test.skip('测试 npm 包是否户存在', async () => {
  const result = await testNpmPackageExist('ismi-node-tools');
  assert.equal(result, true);
});

/** 测试从 npm 管理后台获取包信息 */
test.skip('测试获取 npm 包信息', async () => {
  const name = 'aaa';
  const result = (await getNpmPkgInfo(name)) as npmPkgInfoType;
  console.log(result);
  console.log(result.packument.versions[0].dist.signatures);

  assert.deepStrictEqual(result.name, name);
});
