import HTTP, { TMethods } from "./HTTP";

export default class extends HTTP {
  /**
   * 处理鉴权Token
   * @param headers 响应头
   */
  #tokenHandle(headers: Record<string, string>): void {
    if (headers['Authorization']) {
      const token: string = headers['Authorization'];
      if (token) {
        const tokenValue: string = token.slice(0, token.lastIndexOf("/"));
        const tokenExpiration: string = (Number(token.slice(token.lastIndexOf("/") + 1)) * 1000).toString();

        if (!wx.getStorageSync("Ruyi_Token") || wx.getStorageSync("Ruyi_Token") !== tokenValue) {
          wx.setStorageSync("Ruyi_Token", tokenValue);
        }
        wx.setStorageSync("Ruyi_TokenExpiration", tokenExpiration);
      } else {
        wx.removeStorageSync("Ruyi_Token");
        wx.removeStorageSync("Ruyi_TokenExpiration");
      }
    }
  }
  /**
   * 发送请求
   * @param uri URI
   * @param method 请求方法
   * @returns Promise
   */
  send<ResponseData>(uri: string | number | (string | number)[] = null, method: TMethods = null): Promise<ResponseData> {
    this.header("X-Ajax", "1");
    if (wx.getStorageSync("Ruyi_Token")) {
      this.header("Authorization", `Bearer ${wx.getStorageSync("Ruyi_Token")}`);
    }

    return super.send<ResponseData>(uri, method).then(res => {
      this.#tokenHandle(res.header);
      return res.data;
    }).finally(() => {
      this.removeHeader("Authorization");
    });
  }
  /**
   * 上传文件
   * @param uri URI
   * @param tempFilePath 上传的文件路径
   * @param fileName FormData的键名
   * @param body 请求体，会添加到FormData里
   * @param task 上传任务，可以用于监听上传进度等
   * @param timeout 请求超时
   * @returns Promise
   */
  upload<ResponseData>(uri: string | number | (string | number)[] = null, tempFilePath: string, fileName: string = "file", body: Record<string, number | string> = {}, task: (task: WechatMiniprogram.UploadTask) => void = null, timeout: number = null): Promise<ResponseData> {
    this.header("X-Ajax", "1");
    if (wx.getStorageSync("Ruyi_Token")) {
      this.header("Authorization", `Bearer ${wx.getStorageSync("Ruyi_Token")}`);
    }

    return new Promise((resolve, reject) => {
      const options: WechatMiniprogram.UploadFileOption = {
        url: HTTP.genURL(super.getBaseURL, uri, this.getQuery),
        name: fileName,
        filePath: tempFilePath,
        formData: body,
        header: super.getHeaders,
        // @ts-ignore
        success: ({ cookies, data, errMsg, header, statusCode }) => {
          const requestBody = HTTP.handleResult<ResponseData>(JSON.parse(data), statusCode, header, cookies);
          if (statusCode > 299) {
            reject(requestBody);
          } else {
            resolve(requestBody.data);
          }
        },
        fail: reject
      };
      if (timeout !== null) {
        options['timeout'] = timeout;
      }

      const uploadTask = wx.uploadFile(options);
      if (task) {
        task(uploadTask);
      }
    });
  }
  /**
 * 轮询
 * @param request 请求方法
 * @param breakCallback 每次请求完后都会执行一次，如果返回 true 就会结束轮询。有两种情况会结束轮询，要么接口报错，要么该方法返回了 true
 * @param waitDuraion 每次轮询等待时长，秒级
 * @returns 响应结果
 */
  polling<ResponseData>(request: () => Promise<ResponseData>, breakCallback: (res: ResponseData) => boolean, waitDuraion: number = 2): Promise<ResponseData> {
    let breakWhile: boolean = false;
    return new Promise(async (resolve, reject) => {
      while (breakWhile === false) {
        await new Promise<ResponseData>((resolve, reject) => {
          setTimeout(async () => {
            await request().then(res => {
              //* 如果返回结果是 truly 说明结束轮询
              breakWhile = breakCallback(res) === true;
              resolve(res);
            }).catch((err) => {
              breakWhile = true;
              reject(err);
            });
          }, waitDuraion * 1000)
        }).then(res => {
          if (breakWhile) {
            resolve(res);
          }
        }).catch(reject);
      }
    });
  }
  /**
   * 分页参数设置
   * @param page 页数
   * @param perPage 每页数量
   * @returns Request
   */
  page(page: number = 1, perPage: number = 10) {
    this.query("page", page);
    this.query("perPage", perPage);
    return this;
  }
  /**
   * 设置排序参数
   * @param fieldName 字段名称
   * @param sort 排序方式
   * @returns Request
   */
  order(fieldName: string, sort: string = "ASC") {
    this.query("order", fieldName);
    this.query("orderBy", sort);
    return this;
  }
  /**
   * 设置多个排序规则
   * @param rules 排序规则，键是字段名称，值是排序方式
   * @returns Request
   */
  orders(rules: Record<string, string>) {
    const orders = [];
    for (const key in rules) {
      if (rules[key] !== "" && rules[key] !== "" && rules[key].trim() !== "") {
        orders.push(`${key}:${rules[key]}`);
      } else {
        orders.push(key);
      }
    }
    if (orders.length) {
      this.query("orders", orders.join(","));
    }

    return this;
  }
}