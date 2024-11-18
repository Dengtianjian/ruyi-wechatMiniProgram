import DiscuzXRequest from "../../foundation/HTTP/DiscuzXRequest";

export type TDiscuzXFile = {
  accessPath: string,
  extension: string,
  fileId: string,
  fullPath: string,
  height: number,
  width: number,
  path: string,
  relativePath: string,
  saveFileName: string,
  size: number,
  sourceFileName: string,
};

export class DiscuzXFilesApi extends DiscuzXRequest {
  /**
 * 上传文件
 * @param tempFilePath 上传的文件路径
 * @param fileName FormData的键名
 * @param body 请求体，会添加到FormData里
 * @param task 上传任务，可以用于监听上传进度等
 * @param timeout 请求超时
 * @returns Promise
 */
  uploadFile(tempFilePath: string, fileName?: string, body?: Record<string, string | number>, task?: (task: WechatMiniprogram.UploadTask) => void, timeout?: number): Promise<TDiscuzXFile> {
    return super.upload<TDiscuzXFile>("files", tempFilePath, fileName, body, task, timeout);
  }
}

export default new DiscuzXFilesApi();