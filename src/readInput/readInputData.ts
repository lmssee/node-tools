/** 
 * 创建一个共享的数据中心，用于储存当前的输入的需要
 * 
 * 
 */
export default {
  /** 注册的列表项 */
  callList: [],
  /// 添加二点监听项
  on(uniKey: symbol, callFn: (a: boolean) => void) {
    const list: any[] = this.callList;
    // 若当前没有执行的
    (list.length == 0) && Reflect.apply(callFn, undefined, [true]);
    (list as any).push([uniKey, callFn])
  },
  /** 
   * 是否可以清理 readline 
   * 
   * 
   * 
   */
  get remove(): boolean {
    const list: any[] = this.callList;
    list.shift();
    if (list.length > 0) {
      Reflect.apply(list[0][1], null, [true]);
      // 告诉程序未结束请不要处理 readline
      return false;
    }
    return true;
  },
}