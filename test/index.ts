import { test, mock, describe, it } from "node:test";
import {
  Color,
  fileExist,
  get,
  getCallerFilename,
  getNpmPkgInfo,
  initializeFile,
  isWindows,
  pathJoin,
  runOtherCode,
  testNpmPackageExist,
} from "../index";
import assert from "node:assert";
import testReadInput from "./testReadInput";
import testColor from './testColor';
import testCursor from './testCursor';
import testPath from './testPath';
import testNode from "./testNode";

// 测试 node 相关
testNode();
// 测试文件路径
testPath();
// 测试 Color 部分
testColor();
// 测试 read input 部分 
testReadInput();
// 测试 cursor 光标部分
testCursor();


/** 测试  get  */
test.skip("test", async (t) => {
  const result = await get("132");
  assert.strictEqual(result, true);
});

