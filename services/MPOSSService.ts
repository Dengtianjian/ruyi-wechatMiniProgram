import { MPOSS } from "../platform/MPOSS";
import { MPQCloudCos } from "../platform/MPQCloudCos";
import { TOSSQuery } from "../types/MPOSSTypes";

type TOSSPlatform = "QCloud_COS" | "AliYUN_OSS";

export class MPOSSService {
  protected OSSPlatform: TOSSPlatform = null;
  protected OSS: MPOSS = null;

  /**
   * 实例化OSS服务类
   * @param OSSPlatform string OSS所属平台
   * @param Region string 存储桶所在地域
   * @param Bucket string 存储桶名称
   */
  constructor(OSSPlatform: TOSSPlatform, Region: string, Bucket: string) {
    this.OSSPlatform = OSSPlatform;

    switch (OSSPlatform) {
      case "QCloud_COS":
        this.OSS = new MPQCloudCos(Region, Bucket);
        break;
      default:
        throw new Error("不支持的OSS平台");
    }
  }
  /**
 * 设置对象授权信息。每次对象操作时都需要用到不同的授权信息，例如上传对象、删除对象、获取对象等。
 * @param objectKey string 对象键名
 * @param auth string 操作对象的授权信息
 * @param disposable boolean 一次性的授权信息，操作完后废弃
 * @param httpMethod string 该授权信息适用于的请求方法
 * @returns this
 */
  auth(objectKey: string, auth: string, disposable: boolean = true, httpMethod: string = null) {
    this.OSS.objectAuthorization(objectKey, auth, disposable, httpMethod);
    return this;
  }
  /**
 * 上传文件
 * @param objectKey string 对象键名
 * @param UploadFilePath string 上传的文件所在路径
 * @param FileSize number 上传的文件尺寸
 * @param ACL string 对象访问控制
 * @returns Promise<string> 对象访问地址
 */
  upload(objectKey: string, UploadFilePath: string, FileSize: number, ACL: string = null) {
    return this.OSS.uploadFile(objectKey, UploadFilePath, FileSize, ACL);
  }
  /**
 * 获取对象访问 URL
 * @param Key string 对象键名
 * @param Query object 签名中要签入的请求参数，{key: 'val'} 的格式
 * @param Expires number Url中的签名几秒后失效，默认为 900 秒
 * @returns string 计算得到的 Url
 */
  getObjectURL(Key: string, Query: TOSSQuery = {}, Expires: number = null) {
    return this.OSS.getObjectURL(Key, Query, Expires);
  }
}