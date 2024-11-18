import DiscuzXRequest from "../../foundation/HTTP/DiscuzXRequest";

export type TMPDiscuzXAttachment = {
  id: number,
  attachId: string,
  extension: string,
  fileName: string,
  filePath: string,
  width: number,
  height: number,
  remote: boolean,
  sourceFileName: string,
  userId: number,
  url?: string,
  previewURL?: string,
  downloadURL?: string
};

export class DiscuzXAttachmentsApi extends DiscuzXRequest {
  /**
* 上传文件
  上传成功返回的是附件ID
* @param tempFilePath 上传的文件路径
* @param fileName FormData的键名
* @param body 请求体，会添加到FormData里
* @param task 上传任务，可以用于监听上传进度等
* @param timeout 请求超时
* @returns Promise<string>
*/
  uploadAttachment(tempFilePath: string, fileName?: string, body?: Record<string, string | number>, task?: (task: WechatMiniprogram.UploadTask) => void, timeout?: number): Promise<string> {
    return super.upload<string>("attachments", tempFilePath, fileName, body, task, timeout);
  }
  deleteAttachment(attachId: string) {
    return this.delete<number>(`attachments/${attachId}`);
  }
  getAttachment(attachId: string): Promise<string> {
    return this.get<string>(`attachments/${attachId}`);
  }
  genAttachmentPreviewURL(attachId: string, width: number = null, height: number = null, radio: number = null, key: string = null): string {
    const SizeQuerys = [];
    if (width) {
      SizeQuerys.push(`w=${width}`);
    }
    if (height) {
      SizeQuerys.push(`h=${height}`);
    }
    if (radio) {
      SizeQuerys.push(`r=${radio}`);
    }
    if (key) {
      SizeQuerys.push(`key=${key}`);
    }

    return `${this.getBaseURL}&uri=attachments/${attachId}/preview${SizeQuerys.length ? "&" + SizeQuerys.join("&") : ""}`;
  }
  genAttachmentDownloadURL(attachId: string, key: string = null): string {
    return `${this.getBaseURL}&uri=attachments/${attachId}/download&key=${key}`;
  }
}

export default new DiscuzXAttachmentsApi();