import { t } from './cursor';
import { getRandomInt } from 'a-js-tools';

/**
 * 这是一个颜色的定义区 \
 *
 */
export class Color {
  value: string;

  valueOf(): string {
    return this.value;
  }

  constructor(t: string) {
    this.value = t;
  }

  concat(...strings: string[]): string {
    if (strings.length == 0) return '';
    let str = this.valueOf();
    strings.forEach((currentString: string) => {
      str += currentString;
    });
    return getRandomColor(str);
  }

  toString(): string {
    return getRandomColor(this.value);
  }

  /**
   * <span style="color:#565656;">暗黑</span>色
   *
   * 色值    <span style="color:#565656;">#565656</span>
   *
   * rgb    <span style="color:#565656;">rgb(86 ,86 ,86)</span>
   *
   *   */
  static darkBlack(str: string): string {
    return simpleColor(0, str);
  }

  /**
   * <span style="color:#b5281d;">暗红</span>色
   *
   * 色值    <span style="color:#b5281d;">#b5281d</span>
   *
   * rgb    <span style="color:#b5281d;">rgb(181 ,40 ,29)</span>
   *
   *   */
  static darkRed(str: string) {
    return simpleColor(1, str);
  }

  /**
   * <span style="color:#32b520;">暗绿</span>色
   *
   * 色值    <span style="color:#32b520;">#32b520</span>
   *
   * rgb    <span style="color:#32b520;">rgb(50 ,181 ,32)</span>
   *
   *   */
  static darkGreen(str: string): string {
    return simpleColor(2, str);
  }

  /**
   * <span style="color:#a0a01d;">暗黄</span>色
   *
   * 色值    <span style="color:#a0a01d;">#a0a01d</span>
   *
   * rgb    <span style="color:#a0a01d;">rgb(160 ,160 ,29)</span>
   *
   *   */
  static darkYellow(str: string): string {
    return simpleColor(3, str);
  }

  /**
   * <span style="color:#400ad9;">暗蓝</span>色
   *
   * 色值    <span style="color:#400ad9;">#400ad9</span>
   *
   * rgb    <span style="color:#400ad9;">rgb(160 ,160 ,29)</span>
   *
   *   */
  static darkBlue(str: string): string {
    return simpleColor(4, str);
  }

  /**
   * <span style="color:#c918c9;">暗杨红</span>色
   *
   * 色值  <span style="color:#c918c9;">#c918c9</span>
   *
   * rgb  <span style="color:#c918c9;">rgb(201 ,24 ,201)</span>
   *
   *   */
  static darkMagenta(str: string): string {
    return simpleColor(5, str);
  }

  /**
   * <span style="color:#2daebb;">暗青</span>色
   *
   * 色值  <span style="color:#2daebb;">#2daebb</span>
   *
   * rgb  <span style="color:#2daebb;">rgb(45 ,174 ,187)</span>
   *
   *   */
  static darkCyan(str: string): string {
    return simpleColor(6, str);
  }

  /**
   * <span style="color:#c1c1c1;">暗白</span>色
   *
   * 色值  <span style="color:#c1c1c1;">#c1c1c1</span>
   *
   * rgb  <span style="color:#c1c1c1;">rgb(193 ,193 ,193)</span>
   *
   *   */
  static darkWhite(str: string): string {
    return simpleColor(7, str);
  }

  /**
   * <span style="color:#6f6f6f;">亮黑</span>色
   *
   * 色值  <span style="color:#6f6f6f;">#6f6f6f</span>
   *
   * rgb  <span style="color:#6f6f6f;">rgb(111 ,111 ,111)</span>
   *
   *   */
  static lightBlack(str: string): string {
    return simpleColor(8, str);
  }

  /**
   * <span style="color:#fc2119;">红</span>色
   *
   * 色值  <span style="color:#fc2119;">#fc2119</span>
   *
   * rgb  <span style="color:#fc2119;">rgb(252 ,33 ,25)</span>
   *
   *   */
  static red(str: string): string {
    return simpleColor(9, str);
  }

  /**
   * <span style="color:#2fe81a;">绿</span>色
   *
   * 色值  <span style="color:#2fe81a;">#2fe81a</span>
   *
   * rgb  <span style="color:#2fe81a;">rgb(47 ,232 ,26)</span>
   *
   *   */
  static green(str: string): string {
    return simpleColor(10, str);
  }

  /**
   * <span style="color:#e8ec14;">黄</span>色
   *
   * 色值  <span style="color:#e8ec14;">#e8ec14</span>
   *
   * rgb  <span style="color:#e8ec14;">rgb(232 ,236 ,20)</span>
   *
   *   */
  static yellow(str: string): string {
    return simpleColor(11, str);
  }

  /**
   * <span style="color:#4a03fe;">蓝</span>色
   *
   * 色值  <span style="color:#4a03fe;">#4a03fe</span>
   *
   * rgb  <span style="color:#4a03fe;">rgb(74 ,3 ,254)</span>
   *
   *   */
  static blue(str: string): string {
    return simpleColor(12, str);
  }

  /**
   * <span style="color:#fb00fa;">杨红</span>色
   *
   * 色值  <span style="color:#fb00fa;">#fb00fa</span>
   *
   * rgb  <span style="color:#fb00fa;">rgb(251 ,0 ,253)</span>
   *
   *   */
  static magenta(str: string): string {
    return simpleColor(13, str);
  }

  /**
   * <span style="color:#2ceeec;">青</span>色
   *
   * 色值  <span style="color:#2ceeec;">#2ceeec</span>
   *
   * rgb  <span style="color:#2ceeec;">rgb(44 ,238 ,236)</span>
   *
   *   */
  static cyan(str: string): string {
    return simpleColor(14, str);
  }

  /**
   * <span style="color:#ffffff;">白</span>色
   *
   * 色值  <span style="color:#ffffff;">#ffffff</span>
   *
   * rgb  <span style="color:#ffffff;">rgb(255 ,255 ,255)</span>
   *
   *   */
  static white(str: string): string {
    return simpleColor(15, str);
  }

  /** 随机色 */
  static random(str: string) {
    return getRandomColor(str);
  }

  /** 从 rgb 获取颜色 */
  static fromRgb(str: string, rgb?: string): string {
    if (!rgb) return this.random(str);
    return simpleColor(computedTerminalColor(rgb), str);
  }

  /** 从十六进制获取颜色值 */
  static fromHexadecimal(str: string, hexadecimal: string) {
    return this.fromRgb(str, hexadecimal);
  }
}

/**  简单颜色 */
function simpleColor(count: number, str: string): string {
  str = str.toString();
  const hasColorStart = str.indexOf('\x1b[38;');
  const hasColorEnd = str.indexOf('\x1b[m');
  if (hasColorStart > -1 && hasColorEnd > -1) {
    return simpleColor(count, str.substring(0, hasColorStart))
      .concat(str.substring(hasColorStart, hasColorEnd + 3))
      .concat(simpleColor(count, str.substring(hasColorEnd + 3)));
  }
  return `${t}38;5;${count}m${str}${t}m`;
}

/** 获取随机色 */
function getRandomColor(str: string): string {
  return simpleColor(getRandomInt(255), str);
}

/** 计算 256 位颜色值 */
function computedTerminalColor(color: string): number {
  let r = 0,
    g = 0,
    b = 0;
  /** 获取一个颜色值 */
  const getColor = (co: number) => {
    const result = Math.floor((co * 6) / 256);
    return result > 6 ? 6 : result < 0 ? 0 : result;
  };

  if (color.startsWith('#')) {
    color = color.slice(1);
    if (color.length == 6) {
      r = getColor(parseInt(color.slice(0, 2), 16));
      g = getColor(parseInt(color.slice(2, 4), 16));
      b = getColor(parseInt(color.slice(4, 6), 16));
    } else if (color.length == 3) {
      r = getColor(parseInt(color.slice(0, 1).repeat(2), 16));
      g = getColor(parseInt(color.slice(1, 2).repeat(2), 16));
      b = getColor(parseInt(color.slice(2, 3).repeat(2), 16));
    } else return getRandomInt(255);
  } else if (color.startsWith('rgb')) {
    const colorArr = color.replace(/.*\((.*)\).*/, '$1').split(',');
    r = getColor(Number(colorArr[0]));
    g = getColor(Number(colorArr[1]));
    b = getColor(Number(colorArr[2]));
  } else return getRandomInt(255);

  return 16 + 36 * r + 6 * g + b;
}
