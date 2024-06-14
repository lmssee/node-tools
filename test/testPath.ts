import test from 'node:test';
import { initializeFile, pathJoin } from '../index';
import assert from 'node:assert';
/** 测试地址拼接 */
test.skip('path-join', t => {
  const cwd = process.cwd();
  const result = pathJoin(cwd, '../');
  assert.notEqual(result, cwd);
});

/** 测试初始化 __filename */
test.skip('initializeFile', t => {
  const [__filename, __dirname] = initializeFile();
  console.log(__filename);
  console.log(__dirname);
});

/** 测试地址部分 */
export default () => 1;
