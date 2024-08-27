import test, { after, before, beforeEach } from 'node:test';
import { runOtherCode } from '../src/runOtherCode';
import { cursorAfterClear, cursorHide, cursorMoveUp } from 'src/cursor';
import assert from 'node:assert';
import { getRandomInt } from 'a-js-tools';
import { _p } from 'src/print';

/**
 * 当参数为字符串时
 */
test.skip('测试执行其他代码', async () => {
  before(() => _p('测试当前执行代码为正常的代码'));
  beforeEach(() => _p('开始执行子测试'));

  const result = await runOtherCode('ls');
  assert.strictEqual(result.success, true);
  after(() => _p('测试完毕'));
});

test('测试一个随时间变化的等待提示', () => {
  getRandomInt();
  // const pList: string[] = ['···', '⋱', '⋮', '⋰'];
  const pList: string[] = ['⋯', '⋱', '⋮', '⋰'];
  // const pList: string[] = ['⤯', '⤰', '⤮', '⤩', '⤪', '⤧', '⤨'];
  const pLength = pList.length;
  let i: number = 0;
  cursorHide();
  const k = setInterval(() => {
    if (i == 20) clearTimeout(k);
    cursorAfterClear();
    _p(pList[i++ % pLength]);
    cursorMoveUp(1);
  }, 80);
});

/** 测试运行其他代码 */
test.skip('test run other code', async () => {
  const result = await runOtherCode({
    code: 'npx ixxx cls &&  npm install',
    cwd: './',
  });

  assert.notEqual(result.success, false);
});
