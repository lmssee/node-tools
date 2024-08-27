import { typeOf } from 'a-js-tools';
import { _p, readInput } from 'index';
import { test } from 'node:test';

/** 测试 userInput 的自动事件序列化  */
test.skip('测试用户输入仓库', () => {
  console.log('i am in 1, you should input  1 to end');
  readInput(value => {
    console.log('**** i am end of you input 1 ***');
    if (Number(value) == 1) return true;
    return false;
  });

  console.log('i am in 2, you should input  2 to end');
  readInput(value => {
    console.log('---- i am en of you input 2----');
    if (Number(value) == 2) return true;
    return false;
  });

  console.log('i am in 3, you should input 3 to end');
  readInput(value => {
    console.log('-----****** you  should input 3 to end **** ---');
    if (Number(value) == 3) return true;
    return false;
  });
});

/** 测试多次调用后监听超限
 *
 *
 */
test.skip('测试最大调用次数 MaxListenersExceededWarning error', async () => {
  async function _t() {
    const result = await readInput(
      (keyValue: string | undefined, key: unknown) => {
        keyValue;
        key;
        return true;
      },
    );

    _p(typeOf(result));

    _p(result);
  }

  await _t();
});
