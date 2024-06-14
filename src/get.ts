import * as http from "node:http";
import * as https from "node:https";
import * as http2 from "node:http2";
// const req = https.get(
//   `https://www.npmjs.com/package/${pkgName || "ismi-node-tools"}`,
//   {
//     headers: {
//       "sec-fetch-dest": "empty",
//       // "X-Requested-With": "XMLHttpRequest",
//       // "Sec-Fetch-Mode": "cors",
//       // "Sec-Fetch-Site": "same-origin",
//       // Accept: "*/*",
//       // Referer: `https://www.npmjs.com/package/${pkgName}`,
//       "X-Spiferack": 1,
//     },
//   },
//   (response) => {
//     response.on("data", (data) => (result += data.toString()));
//     /// 请求结束后
//     response.on("end", () => {
//       const pkgInfo = JSON.parse(result);
//       resolve(JSON.parse(result));
//     });
//   }
// );
type GetType = {
  url: string;
  method: "get" | "post";

  data: {};
};
/** 一个在 node 环境下的请求方法  */
export default async function get(params: GetType): Promise<any> {
  return new Promise(() => 1);
}
