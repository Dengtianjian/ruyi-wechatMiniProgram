import { TOSSHeaders, TOSSQuery } from "../types/MPOSSTypes";
import { ICOS, TCosGetAuthorizationOptions, TCosGetAuthorizationCallback, TCosACL } from "../types/Storage/MPQCloudCosTypes";
import { MPOSS } from "./MPOSS";

const COS = require('cos-wx-sdk-v5');

export class MPQCloudCos extends MPOSS<ICOS> {

  constructor(Region: string, Bucket: string) {
    super(Region, Bucket);

    this.OSSClient = new COS({
      SimpleUploadMethod: "putObject",
      getAuthorization: (options: TCosGetAuthorizationOptions, callback: TCosGetAuthorizationCallback) => {
        const Method: string = options.Method.toString().toLowerCase();

        let objectKey: string = options.Key;
        if (!objectKey) {
          if (options.Query.prefix?.toString()) {
            objectKey = options.Query.prefix.toString();
          }
        }
        if (objectKey) {
          const HTTPMethodAuths = this.ObjectAuthorization.get(objectKey);
          if (typeof HTTPMethodAuths === 'string') {
            callback(HTTPMethodAuths);
          } else if (HTTPMethodAuths[Method]) {
            callback(HTTPMethodAuths[Method]);
          } else {
            console.error(HTTPMethodAuths);
            callback('');
          }
        } else {
          console.error(options);
          callback('');
        }
      }
    });
  }

  uploadFile(objectKey: string, UploadFilePath: string, FileSize: number, ACL: TCosACL = null): Promise<string> {
    return new Promise((resolve, reject) => {
      const Headers: TOSSHeaders = {};

      if (ACL) {
        Headers['x-cos-acl'] = ACL;
      }

      this.OSSClient.uploadFile({
        Bucket: this.Bucket,
        Region: this.Region,
        Key: objectKey,
        FilePath: UploadFilePath,
        FileSize,
        Headers
      }, (err, data) => {
        if (err) {
          reject(err.error);
        } else {
          resolve(data.Location);
        }
        if (this.RemoveAfterUsingObject.has(objectKey)) {
          this.RemoveAfterUsingObject.delete(objectKey);
          this.ObjectAuthorization.delete(objectKey);
        }
      });
    });
  }

  getObjectURL(Key: string, Query: TOSSQuery = {}, Expires: number = null): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.OSSClient.getObjectUrl({
        Bucket: this.Bucket,
        Region: this.Region,
        Key,
        Expires,
        Query
      }, (err, data) => {
        if (err) {
          reject(err);
        } {
          resolve(data.Url);
        }
      });
    });
  }
}