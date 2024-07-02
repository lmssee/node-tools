import { createInterface } from 'node:readline';

const t = '\x1b[',
  { stdout, stdin } = process;
const _p = (r: string | number) => stdout.write(`${t}${r}`);
/** Cursor is hidden at the terminal
 *
 * 光标在终端进行隐藏
 */
const cursorHide = () => _p('?25l');
/** Cursor display
 *
 * 光标进行显示
 */
const cursorShow = () => _p('?25h');
/** get cursor position
 *
 * 获取光标的位置 */
const cursorGetPosition = () => {
  const rl = createInterface({
    input: stdin,
    output: stdout,
  });
  return new Promise((resolve, reject) => {
    _p('6n');
    const dataCall = (data: { toString: () => string }) => {
      // eslint-disable-next-line no-control-regex
      const match = data.toString().match(/^\x1b\[(\d+);(\d+)R$/i);
      if (match) {
        const [_, row, col] = match;
        _;
        stdin.removeListener('data', dataCall);
        rl.close();
        resolve([row, col]);
      }
      reject([0, 0]);
    };
    stdin.on('data', dataCall);
  });
};
/** set cursor position
 *
 * 设置光标位置
 */
// const cursorSetPosition = (cursorPosition: number[]) => _p(`${cursorPosition.join(';')}H`);
/** Move cursor position up
 *
 * 光标位置向上移动
 *
 * @param numberOfUpwardMoves  {@link Number}  type, number of cursor moves up
 *
 *        @code numberOfUpwardMoves   {@link Number}   类型，光标上移的数量
 */
const cursorMoveUp = (numberOfUpwardMoves: number = 1) =>
  _p(`${numberOfUpwardMoves}A`);
/**   Move cursor position down
 *
 * 光标位置向下移动
 *
 * @param numberOfMovesDown  {@link Number}    number of cursor moves down
 *
 *        numberOfMovesDown     {@link Number}      类型，光标下移的数量
 */
const cursorMoveDown = (numberOfMovesDown: number = 1) =>
  _p(`${numberOfMovesDown}B`);
/** Move cursor position left
 *
 * 光标位置向左移动
 *
 * @param numberOfLeftShifts  {@link Number} Number of left shifts
 *
 *        numberOfLeftShifts {@link Number}  光标左移的数量
 */
const cursorMoveLeft = (numberOfLeftShifts: number = 1) =>
  _p(`${numberOfLeftShifts}D`);
/** Number of right shifts
 *
 *
 *  光标向右移动
 * @param numberOfRightShifts  {@link Number} of right shifts
 *
 *       numberOfRightShifts  {@link Number} 类型，光标右移的数量
 */
const cursorMoveRight = (numberOfRightShifts: number = 1) =>
  _p(`${numberOfRightShifts}C`);

export {
  t,
  cursorHide,
  cursorShow,
  cursorGetPosition,
  cursorMoveUp,
  cursorMoveDown,
  cursorMoveLeft,
  cursorMoveRight,
};
