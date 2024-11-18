import { TMethods } from "./HTTP";
import Request from "./Request";

export default class extends Request {
  send<ResponseData>(uri: string | number | (string | number)[] = null, method: TMethods = null): Promise<ResponseData> {
    uri = Array.isArray(uri) ? uri.join("/") : uri.toString();
    this.query("uri", uri);

    return super.send<ResponseData>(null, method);
  }
  upload<ResponseData>(uri: string | number | (string | number)[] = null, tempFilePath: string, fileName: string = "file", body: Record<string, number | string> = {}, task: (task: WechatMiniprogram.UploadTask) => void = null, timeout: number = null): Promise<ResponseData> {
    uri = Array.isArray(uri) ? uri.join("/") : uri.toString();
    this.query("uri", uri);

    return super.upload(null, tempFilePath, fileName, body, task, timeout);
  }
  /**
   * 发送GET请求
   * @param uri URI
   * @returns Promise
   */
  get<ResponseData>(uri: string | string[]): Promise<ResponseData> {
    return this.send<ResponseData>(uri, "GET");
  }
  /**
   * 发送POST请求
   * @param uri URI
   * @returns Promise
   */
  post<ResponseData>(uri: string | string[]) {
    return this.send<ResponseData>(uri, "POST");
  }
  /**
   * 发送PUT请求
   * @param uri URI
   * @returns Promise
   */
  put<ResponseData>(uri: string | string[]) {
    return this.send<ResponseData>(uri, "PUT");
  }
  /**
   * 发送delete请求
   * @param uri URI
   * @returns Promise
   */
  delele<ResponseData>(uri: string | string[]) {
    return this.send<ResponseData>(uri, "DELETE");
  }
}