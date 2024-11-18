import { MPStorage } from "./MPStorage";

export class MPRemoteStorage<SDKClient> extends MPStorage {
  /**
   * SDK实例
   */
  protected SDKClient: SDKClient = null;

  /**
 * 存储桶名称
 */
  protected storageBucket: string = null;
  /**
   * 存储桶所在地域
   */
  protected storageRegion: string = null;

  /**
 * 实例化远程存储
 * @param Region 存储桶所在地域
 * @param Bucket 存储桶名称
 */
  constructor(Region: string = null, Bucket: string = null) {
    super();

    this.storageBucket = Bucket;
    this.storageRegion = Region;
  }

  public region(region?: string) {
    if (region !== undefined) this.storageRegion = region;

    return this.storageRegion;
  }
  public bucket(bucket?: string) {
    if (bucket !== undefined) this.storageBucket = bucket;

    return this.storageBucket;
  }
}