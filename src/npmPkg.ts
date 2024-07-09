import https from 'node:https';

/** 头像部分 */
type avatars = {
  small: string;
  medium: string;
  large: string;
};

type npmPkgInfoType = {
  canEditPackage: boolean;
  capsule: {
    name: string;
    description?: string;
    maintainers?: string[];
    'dist-tags': { latest: string; [key: string]: string };
    lastPublish: { maintainer: string; time: string };
    types: { typescript: { bundled: string; [key: string]: string } };
  };
  dependents: {
    dependentsCount: number;
    dependentsTruncated: string[];
  };
  downloads: { downloads: number; label: string }[];
  ghapi: string;
  isStarred: boolean;
  inkingAllowedForPackage: boolean;
  package: string;
  packageLinkingCallToActionHref: null | string;
  packageUrl: string;
  packageVersion: {
    author: {
      name: string;
      avatars: avatars;
    };
    description?: string;
    homepage?: string;
    repository?: string;
    keywords?: string[];
    dependencies?: {
      [key: string]: string;
    };
    devDependencies?: {
      [key: string]: string;
    };
    maintainers?: {
      name: string;
      avatars: avatars;
    }[];
    name: string;
    license?: string;
    version: string;
    versions: string[];
    deprecations?: string[];
    typings?: string;
  };
  packument: {
    author: {
      name: string;
      avatars: avatars;
    };
    description: string;
    homepage: string;
    repository: string;
    disTags: { latest: string; [key: string]: string };
    keywords: string[];
    maintainers?: { name: string; avatars: avatars }[];
    name: string;
    license: string;
    version: string;
    versions: {
      version: string;
      date: { ts: number; rel: string };
      dist: {
        shasum: string;
        tarball: string;
        fileCount: number;
        integrity: string;
        signatures: { keyid: string; sig: string }[];
        unpackedSize: number;
      };
    }[];
    deprecations: [];
  };
  private: boolean;
  isSecurityPlaceholder: boolean;
  provenance: {
    enabled: boolean;
    feedbackUrl: string;
  };
  starAction: string;
  versionsDownloads: { [a: string]: number };
  readme?: { data: string; ref: string };
  undefined: boolean;
  documentContext: {
    'readme.data': 'readme';
    [key: string]: string;
  };
  user: null;
  auditLogEnabled: boolean;
  userEmailVerified: null;
  csrftoken: string;
  notifications: [];
  name?: string;
  version?: string;
};

/**
 *
 * 获取给定 npm 包的内容的信息
 *
 * @param pkg 包的名字
 *
 * @returns 返回是一个对象
 */
async function getNpmPkgInfo(
  pkgName: string,
): Promise<Record<string, never> | npmPkgInfoType> {
  return new Promise(resolve => {
    (async () => {
      let result: string = '';
      const npmPackageIsExit = await testNpmPackageExist(pkgName);
      if (npmPackageIsExit == 404 || !npmPackageIsExit) return resolve({});
      const req = https.get(
        `https://www.npmjs.com/package/${pkgName || 'ismi-node-tools'}`,
        {
          headers: {
            'sec-fetch-dest': 'empty',
            // "X-Requested-With": "XMLHttpRequest",
            // "Sec-Fetch-Mode": "cors",
            // "Sec-Fetch-Site": "same-origin",
            // Accept: "*/*",
            // Referer: `https://www.npmjs.com/package/${pkgName}`,
            'X-Spiferack': 1,
          },
        },
        response => {
          response.on('data', data => (result += data.toString()));
          /// 请求结束后
          response.on('end', () => {
            if (response.statusCode == 200) {
              const pkgInfo: npmPkgInfoType = JSON.parse(result);
              const info = pkgInfo.packageVersion;
              pkgInfo.name = info.name;
              pkgInfo.version = info.version;
              resolve(pkgInfo || {});
            } else {
              resolve({});
            }
          });
        },
      );
      req.on('error', () => resolve({}));
      req.end();
    })();
  });
}
/**
 * 测试 npm  包是否存在
 *
 * 包存在则返回 true，不知存在则返回 false （刷的太快有意外，注意）
 */
async function testNpmPackageExist(pkgName: string): Promise<boolean | number> {
  return new Promise(resolve => {
    const req = https.get(
      `https://www.npmjs.com/package/${pkgName}`,
      response => (
        response.on('data', () => 0),
        response.on('end', () => resolve(response.statusCode == 200))
      ),
    );
    req.on('error', () => resolve(404));
    req.end();
  });
}

export { getNpmPkgInfo, testNpmPackageExist, npmPkgInfoType };
