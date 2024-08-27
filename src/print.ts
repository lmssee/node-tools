import { typeOf } from 'a-js-tools';
import { stdout } from 'node:process';

/** 打印文本内容\
 * 因为某些原因，默认打印完成后进行换行\
 * 若想打印在同一行，可设定第二参数为 false
 * @param [r='']           {@link String}   打印的文本信息
 * @param [lineFeed=true]  {@link Boolean}  是否答应换行符号
 */
export function _p(r: unknown = '', lineFeed: boolean = true): void {
  /** Type of data for printing information\
   *  将打印信息的数据类型 */
  const typeOfR = typeof r;
  /**  */
  if (
    typeOfR === 'string' ||
    typeOfR === 'number' ||
    typeOfR === 'bigint' ||
    typeOfR === 'boolean' ||
    typeOfR === 'undefined' ||
    typeOfR === 'function' ||
    typeOf(r) == 'null'
  ) {
    // 当为非 null 的基础类型数据
    stdout.write(`${r}`);
  } else {
    // 当为其他类型的数据使用  `JSON.stringify()` 进行转化
    stdout.write(
      JSON.stringify(
        r,
        (key: string, value: unknown) => {
          const value_type = typeOf(value);
          if (value_type == 'function') {
            return `${value}`;
          } else if (value == undefined) {
            return 'undefined';
          }
          return value;
        },
        2,
      ),
    );
  }
  lineFeed && stdout.write('\n');
}
