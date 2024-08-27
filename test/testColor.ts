import test from 'node:test';
import { Color } from 'src/color';
import { _p } from 'src/print';

test.skip('测试打印颜色', () => {
  _p(Color.random(`随机数出${Color.random('一个')}颜色值`));
});
