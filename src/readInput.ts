import { typeOf } from "ismi-js-tools";
import { createInterface } from "node:readline";

const { stdin, stdout } = process;

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
  _callback: (keyValue: string | undefined, key: any) => Boolean,
  option: any = null
) {
  return new Promise((resolve: any, reject: any) => {
    const rl = createInterface({ input: stdin, output: stdout });

    stdin.on("keypress", pressCallFn);
    process.on("beforeExit", () =>
      process.removeListener("keypress", removeListenerCallFn)
    );

    /** Keyboard press callback
     *
     * 键盘按下回调 */
    function pressCallFn(keyValue: string | undefined, key: any) {
      (typeOf(_callback) == "function" &&
        (_callback.call(null, keyValue, key) &&
          rl.close() == undefined &&
          removeListenerCallFn() &&
          resolve(key),
          true)) ||
        (removeListenerCallFn() && resolve(key));
    }

    /** Remove listening
     *
     * 移除监听 */
    function removeListenerCallFn() {
      stdin.removeListener("keypress", pressCallFn), rl.close();
      return true;
    }
  });
}
