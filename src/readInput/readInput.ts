import { getRandomInt, typeOf } from 'a-js-tools';
import { createInterface, Interface } from 'node:readline';
import readInputData from './readInputData';

/** Listen to user input
 *
 *
 * 监听用户输入
 *
 * @param _callback Callback function, required! Which can take two parameters, namely the user's key and the original value of the key
 *
 *        _callback   回调函数，必须，可接收两个参数，分别用户按键及键原始值
 */
export function readInput(
  _callback: (keyValue: string | undefined, key: unknown) => boolean,
  // option: null = null,
) {
  const { stdin, stdout } = process;
  // 获取一个随机字母
  const _n = () => getRandomInt(96, 122);
  /** 获取唯一的 key  */
  const uniKey = Symbol(String.fromCodePoint(_n(), _n(), _n()));
  return new Promise(resolve => {
    let rl: Interface;
    /**  注册事件
     *
     * 并在注册时指定当前是否开始或者是结束
     */
    readInputData.on(uniKey, (runMi: boolean) => {
      /** 如果事件触发为 false ，则停止流的推入。等待事件的返回 */
      if (runMi) {
        rl = createInterface({ input: stdin, output: stdout });
        stdin.on('keypress', pressCallFn);
      }
    });

    /// 意外退出（用于在 hot 中使用）
    process.on('beforeExit', () =>
      stdin.removeListener('keypress', removeListenerCallFn),
    );

    /** Keyboard press callback
     *
     * 键盘按下回调 */
    function pressCallFn(keyValue: string | undefined, key: unknown) {
      // 如果当前并非第一个注册的方法先返回等待上一个注册的方法结束先
      /// 这里为了给列表做一个
      if (typeOf(_callback) == 'function') {
        // 回调返回的是  true
        if (Reflect.apply(_callback, null, [keyValue, key])) {
          removeListenerCallFn();
          resolve(key);
        }
      } else {
        // 移除监听
        removeListenerCallFn();
        // 返回值
        resolve(key);
      }
    }

    /** Remove listening
     *
     * 移除监听 */
    function removeListenerCallFn() {
      // 调用移除将使用权交给先一个使用者或者结束 read input
      stdin.removeListener('keypress', pressCallFn);
      rl.close && rl.close();
      // 移除并调用下一个
      readInputData.remove;
      return true;
    }
  });
}
