import { spawn } from 'node:child_process';
import { t, typeOf } from 'ismi-js-tools';
import { isWindows, pathJoin } from './path';
import { _p, cursorAfterClear, cursorHide, cursorShow } from './cursor';
/** Parameter types for `runOtherCode`
 *
 * 执行其他代码的参数类型
 */
type RunOtherCodeParam =
  | {
      /** The code to be executed
       *
       * 将要执行的代码
       */
      code: string;
      /** Directory for executing code
       *
       * 执行代码的目录
       */
      cwd?: string | undefined;
      /** Whether to hide waiting
       *
       * 是否隐藏等待
       */
      hideWaiting?: boolean;
      /** The waiting prompt text defaults to "请稍等"
       *
       * 等待的提示文本，默认为 "请等待"
       */
      waitingMessage?: string;
      /** Callback function
       *
       * 回调函数
       */
      callBack?: () => 2;
    }
  | string;

/** Execute other commands
 *  执行其他的命令
 * The exec of `child_process` used here creates a child thread
 *  这里使用的  `child_process` 的 exec 创建子线程
 *   ```js
 *          import { runOtherCode } from  "ismi-node-tools";
 *          runOtherCode({
 *                  code:"ls",
 *                  pwd : "../",
 *                  hideWaiting: true,
 *                  waitingMessage:"请稍等",
 *          }).then((resolve)=>{
 *              console.log(resolve);
 *          });
 *
 *   ```
 * 或者
 *
 * ```ts
 *  const  result = await runOtherCoder('ls');
 *
 *  console.log(result.success); // 打印 true 或者 false
 *
 *  console.log(result.error); // 如果出现执行错误，这里会有值
 *
 *  console.log(result.data); // 如果 result.success == true ，这里会有你自行的代码的实际返回值
 *
 * ```
 *
 * @param param {@link RunOtherCodeParam}  { code:string , cwd: string, callback:()=> void}
 *            执行的 shell 代码
 * @returns     return a  Promise
 *              返回一个 {@link Promise}
 *
 *
 *  返回值包含执行的信息。
 *
 *  如果是串行执行，那么结果的话可能就是一个奇特的大字符串
 *
 *
 *
 */
function runOtherCode(param: RunOtherCodeParam): Promise<{
  error: undefined | string | unknown;
  success?: boolean;
  data?: undefined | string;
}> {
  /** 一个简单的轮询  */
  const aSettingRollup = {
    count: 0,
    timeStamp: setTimeout(() => 1),
  };
  typeof param == 'string' && (param = { code: param });
  const template = Object.assign(
    {
      cwd: '',
      hideWaiting: false,
      waitingMessage: '请稍等',
    },
    param,
  );
  const { code, callBack, hideWaiting, waitingMessage } = template;
  let { cwd } = template;
  /** 打印请稍等。。。 */
  if (!hideWaiting) {
    /// 隐藏光标
    cursorHide();
    /// 心跳打印 '请稍等'
    aSettingRollup.timeStamp = setInterval(() => {
      // 清理光标后内容
      cursorAfterClear();
      // 打印文本
      _p(
        `\n${waitingMessage}${'.'.repeat(++aSettingRollup.count % 6)}${t}20D${t}1A`,
      );
    }, 100);
  }
  /// 整理工作路径
  cwd = pathJoin(process.cwd(), cwd);
  /** 解析命令 */
  const commandLine = code
    .replace(/\s{2,}/, ' ')
    .trim()
    .split(' ');

  try {
    return new Promise(resolve => {
      let stdoutData = '',
        stderrData = '',
        success = true;
      /** 子命令  */
      const childProcess = spawn(commandLine[0], commandLine.slice(1), {
        cwd,
        shell: true,
      });
      /// 标准输出流
      childProcess.stdout.on('data', data => {
        let _data = data.toString();
        /// 尾部换行符
        !/\n$/.test(_data) && (_data = _data.concat(isWindows ? '\r\n' : '\n'));
        if (!/^\s*$/.test(_data)) {
          // 清理光标后内容
          cursorAfterClear();
          // 打印文本
          _p(_data);
          stdoutData += _data;
        }
      });
      /// 标准输出流输出错误
      childProcess.stderr.on('data', error => {
        let _data = error.toString();
        /// 尾部换行符
        !/\n$/.test(_data) && (_data = _data.concat(isWindows ? '\r\n' : '\n'));
        // 清理光标后内容
        cursorAfterClear();
        // 打印文本
        _p(_data);
        stderrData += _data;
      });
      /// 出现错误
      childProcess.on('error', error => {
        success = !1;
        let _data = error.toString();
        /// 尾部换行符
        !/\n$/.test(_data) && (_data = _data.concat(isWindows ? '\r\n' : '\n'));
        // 清理光标后内容
        cursorAfterClear();
        // 打印文本
        _p(_data);
      });
      /// 子进程关闭事件
      childProcess.on('close', () => {
        setTimeout(() => {
          if (callBack && typeOf(callBack) == 'function') {
            Reflect.apply(callBack, null, []);
          }
          clearInterval(aSettingRollup.timeStamp);
          cursorAfterClear();
          cursorShow();
          resolve({ success, data: stdoutData, error: stderrData });
        }, 100);
      });
    });
  } catch (error) {
    clearInterval(aSettingRollup.timeStamp);
    //  清理光标后的剩余屏幕部分
    cursorAfterClear();
    _p('catch error'.concat((error as string).toString()));
    return new Promise(resolve => {
      cursorShow();
      resolve({ error, data: undefined, success: false });
    });
  }
}

/**
 *  Initialize global data
 *
 * 初始化全局数据
 */
// function initLmssee(data?: any) {
//   if (!globalThis) return;
//   globalThis &&
//     !(globalThis as any).lmssee &&
//     Object.defineProperty(globalThis, 'lmssee', {
//       value: lmssee,
//       writable: true,
//       enumerable: true,
//       configurable: false,
//     });
//   data &&
//     typeOf(data) == 'object' &&
//     Object.keys(data).length == 1 &&
//     !(lmssee as any)(Object.keys(data)[0]) &&
//     Object.defineProperty(lmssee, Object.keys(data)[0], {
//       value: Object.values(data)[0],
//       writable: true,
//       enumerable: true,
//       configurable: false,
//     });
//   return lmssee;
// }

// async function get(url: string): Promise<any> {
//   return new Promise((response) => {
//     response(true);
//   });
// }

export { runOtherCode, RunOtherCodeParam };
