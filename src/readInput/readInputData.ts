/**
 * 创建一个共享的数据中心，用于储存当前的输入的需要
 *
 *
 *
 * 由于在使用的时候，因没有及时处理 process.stdout 的监听事件
 *
 * 导致多次监听同事件而触发
 *
 * ```sh
 *  MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
 *   11 beforeExit listeners added to [process].
 *   Use emitter.setMaxListeners() to increase limit
 * (Use `node --trace-warnings ...` to show where the warning was created)
 * ```
 *
 *
 */
export default {
  /** 注册的列表项 */
  callList: [],
  /**
   *  添加二点监听项
   *
   * 通过判断当前 callList 的长度知晓当前是否正在执行
   *
   * 长度为 0 则触发回调开始执行
   */
  on(uniKey: symbol, callFn: (a: boolean) => void) {
    const list: ReadInputListItem[] = this.callList;
    // 若当前没有执行的
    list.length == 0 && Reflect.apply(callFn, undefined, [true]);
    (list as ReadInputListItem[]).push([uniKey, callFn]);
  },
  /**
   * 是否可以清理 readline
   *
   *
   *
   */
  get remove(): boolean {
    const list: ReadInputListItem[] = this.callList;
    list.shift();
    if (list.length > 0) {
      Reflect.apply(list[0][1], null, [true]);
      // 告诉程序未结束请不要处理 readline
      return false;
    }
    return true;
  },
};

/** 导出这个子项的类型声明 */
export type ReadInputListItem = [symbol, (a: boolean) => void];
