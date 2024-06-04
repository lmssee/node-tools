# 更新日志

## 0.0.0 (6 月 4 日 2024 年)

- 整理并迁移了项目

## 0.0.15 （5 月 31 日 2024 年）

- 整理了 `runOtherCode` 的参数

## 0.0.12 （5 月 30 日 2024 年）

- 添加 `isWindows` 判断是否为 windows 环境
- 再次测试在 windows 上的行为

## 0.0.7 （5 月 14 日 2024 年）

- 添加 path 模块
- file 模块添加 `getCallerFilename` 方法以获取调用函数所在的文件

## 0.0.6 （5 月 11 日 2024 年）

- 添加了 jest 测试

## 0.0.1 （4 月 28 日 2024 年）

- 维护了 `readFileToJson` 和 `readFileToJsonSync` 两个读取 JSON 文件的方法，在读取文件前调用 `statSync` 判断文件是否存在
