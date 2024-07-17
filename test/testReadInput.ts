import { typeOf } from 'a-js-tools';
import { _p, readInput } from 'index';
import { test } from 'node:test';

/** 测试 userInput 的自动事件序列化  */
test.skip('should user input data store', () => {
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

/** 测试多次调用后监听超限 */
test('test MaxListenersExceededWarning error', async () => {
  async function _t() {
    const result = await readInput(
      (keyValue: string | undefined, key: unknown) => {
        keyValue;
        key;
        return true;
      },
    );

    console.log(result);
    _p(typeOf(result));

    _p(result);
  }

  await _t();
});
