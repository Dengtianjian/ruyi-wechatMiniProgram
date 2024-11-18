import { TStorageHeaders, TStorageQuery } from "./MPStorageTypes"

export type TCosProgressParam = {
  progressData: {
    loaded: number,
    total: number,
    speed: number,
    percent: number
  }
}

export type TCosGetAuthorizationOptions = {
  Bucket: string,
  ForceSignHost: boolean,
  Headers: TStorageHeaders,
  Key: string,
  Method: string,
  Pathname: string
  Query: TStorageQuery,
  Region: string,
  Scope: Array<{
    action: string,
    bucket: string,
    prefix: string,
    region: string
  }>,
  SystemClockOffset: number
}
export type TCosGetAuthorizationCallback = (auth: {
  Authorization: string,
} | {
  TmpSecretId: string,
  TmpSecretKey: string,
  SecurityToken: string,
  StartTime: number,
  ExpiredTime: number,
  ScopeLimit?: boolean
} | string) => void;

export type TCosFinishedData = {
  ETag: string,
  Location: string,
  RequestId: string,
  headers: {
    connection: string,
    'content-length': string,
    date: string,
    etag: string,
    server: string,
    'x-cos-hash-crc64ecma': string,
    'x-cos-request-id': string,
    'x-cos-storage-class': string
  },
  statusCode: number
}

export type TCosACL = "default" | "private" | "public-read" | "public-read-write" | "authenticated-read" | "bucket-owner-read" | "bucket-owner-full-control";

type TFunctionCallback<DATA> = (err: {
  error: string
}, data: DATA) => void;

export interface ICOS {
  uploadFile: (option: {
    Bucket: string,
    Region: string,
    Key: string,
    FilePath: string,
    FileSize: number,
    SliceSize?: number,
    onTaskReady?: (taskId: string) => void,
    onProgress?: (progressData: TCosProgressParam) => void,
    onFileFinish?: (err: {
      error: string
    }, data: TCosFinishedData, options: Pick<TCosGetAuthorizationOptions, "Bucket" | "Region" | "Key"> & {
      FilePath: string,
      FileSize: number,
      TaskId: string,
      tracker: unknown
    }) => void,
    Headers?: TStorageHeaders
  }, callback: TFunctionCallback<TCosFinishedData>) => void,
  getObjectUrl: (option: {
    Bucket: string,
    Region: string,
    Key: string,
    Sign?: boolean,
    Protocal?: string,
    Domain?: string,
    Method?: string,
    Query?: TStorageQuery,
    Headers?: TStorageHeaders,
    Expires?: number
  }, callback: TFunctionCallback<{
    Url: string
  }>) => void
}