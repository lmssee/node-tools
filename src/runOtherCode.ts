import { spawn } from 'node:child_process';
import { getRandomInt, t, typeOf } from 'a-js-tools';
import { isWindows, pathJoin } from './path';
import { cursorAfterClear, cursorHide, cursorShow } from './cursor';
import { _p } from './print';
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
      /** The waiting prompt text defaults to ""
       *
       * 等待的提示文本，默认为 ""
       */
      waitingMessage?: string;
      /** Whether to proactively print date information
       *
       * 是否主动打印日志信息
       */
      printLog?: boolean;
      /** Callback function
       *
       * 回调函数
       */
      callBack?: () => undefined;
    }
  | string;

/** Execute other commands\
 *  执行其他的命令\
 * The exec of `child_process` used here creates a child thread\
 *  这里使用的  `child_process` 的 exec 创建子线程
 *  - code            {@link String}  执行的具体代码。必须参数，缺省时执行设定工作目录下的
 *  - cwd             {@link String}  执行环境（执行的目录）。可选参数，缺省时为当前执行目录
 *  - hideWaiting     {@link Boolean} 隐藏等待提示。可选参数，缺省为 false
 *  - waitingMessage  {@link String}  等待提示文本。
 *  - printLog        {@link Boolean} 是否打印日志信息
 *
 *
 *   ```ts
 *          import { runOtherCode } from  "ismi-node-tools";
 *          runOtherCode({
 *                  code:"ls",
 *                  cwd : "../",
 *                  hideWaiting: true,
 *                  waitingMessage: 'please wait a moment',
 *                  printLog: true,
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
 * @returns     return a  {@link Promise} \
 *              返回一个 {@link Promise} \
 *  返回值包含执行的信息。\
 *  如果是串行执行，那么结果的话可能就是一个奇特的大字符串
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

  /// 倘若传入的实参是一个字符串，则默认仅传入
  if (typeof param == 'string') {
    param = { code: param };
  }

  /// 混合值，将实参进行整理
  const template = Object.assign(
    {
      cwd: '',
      hideWaiting: false,
      waitingMessage: '',
      printLog: true,
    },
    param,
  );
  const { code, callBack, hideWaiting, waitingMessage, printLog } = template;
  let { cwd } = template;
  /** 打印请稍等。。。 */
  if (!hideWaiting) {
    /** 随机出一个待渲染列队 */
    const pList: string[] = [
      ['.', '..', '...', '....', '...', '..'],
      ['···', '⋱', '⋮', '⋰'],
      ['⤯', '⤰', '⤮', '⤩', '⤪', '⤧', '⤨'],
    ][getRandomInt(2)];
    /** 随机出的等待标志符数组的长度 */
    const pLength: number = pList.length;
    /// 隐藏光标
    cursorHide();
    // 放置一个在进程结束时展示光标，即便在测试发现异步操作会阻塞该事件的触发
    process.on('exit', cursorShow);
    /// 心跳打印 '请稍等'
    aSettingRollup.timeStamp = setInterval(() => {
      // 清理光标后内容
      cursorAfterClear();
      // 打印文本
      _p(
        `\n${waitingMessage}${'.'.repeat(++aSettingRollup.count % pLength)}${t}20D${t}1A`,
        false,
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
        !/\n$/.test(_data) && (_data = _data.concat(isWindows ? '\r' : ''));
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
        !/\n$/.test(_data) && (_data = _data.concat(isWindows ? '\r' : ''));
        // 清理光标后内容
        cursorAfterClear();
        // 打印文本
        printLog && _p(_data);
        stderrData += _data;
      });
      /// 出现错误
      childProcess.on('error', error => {
        success = !1;
        let _data = error.toString();
        /// 尾部换行符
        !/\n$/.test(_data) && (_data = _data.concat(isWindows ? '\r' : ''));
        // 清理光标后内容
        cursorAfterClear();
        // 打印文本
        printLog && _p(_data);
      });
      /// 子进程关闭事件
      childProcess.on('close', () => {
        setTimeout(() => {
          if (callBack && typeOf(callBack) == 'function') {
            Reflect.apply(callBack, null, []);
          }
          /// 清理定时器
          clearInterval(aSettingRollup.timeStamp);
          /// 清理光标后的内容，避免出现打印残留
          cursorAfterClear();
          /// 返回之前将光标展示出来
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
      /// 在返回值之前展示光标
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
