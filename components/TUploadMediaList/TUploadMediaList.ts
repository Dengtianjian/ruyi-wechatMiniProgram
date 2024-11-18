// components/base/TUploadImageList/TUploadImageList.ts
Component<{}, {
  edit: {
    type: BooleanConstructor,
    value: boolean
  }
  count: {
    type: NumberConstructor,
    value: number
  },
  mediaType: {
    type: ArrayConstructor,
    value: Array<"mix" | "image" | "video">
  }
  sourceType: {
    type: ArrayConstructor,
    value: Array<"album" | "camera">
  },
  maxDuration: {
    type: NumberConstructor,
    value: number
  }
  sizeType: {
    type: ArrayConstructor,
    value: Array<"original" | "compressed">
  },
  camera: {
    type: StringConstructor,
    value: "back" | "front"
  }
  messageFile: {
    type: BooleanConstructor,
    value: boolean
  }
  messageFileType: {
    type: StringConstructor,
    value: "all" | "video" | "image" | "file"
  }
  messageFileExtension: {
    type: ArrayConstructor,
    value: Array<string>
  }
  fileList: {
    type: ArrayConstructor,
    value: Array<{
      key?: string,
      url: string,
      type: "image" | "video"
    }>
  },
  controlled: {
    type: BooleanConstructor,
    value: boolean
  }
}, {
  addMedia: () => void,
  previewMedia: (options: WechatMiniprogram.TouchEvent<
    {},
    {},
    {
      index: string
    }
  >) => void,
  removeMedia: (options: WechatMiniprogram.TouchEvent<
    {},
    {},
    {
      index: string
    }
  >) => void
}>({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    edit: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 9
    },
    mediaType: {
      type: Array,
      value: ["mix"]
    },
    sourceType: {
      type: Array,
      value: ["album", "camera"]
    },
    maxDuration: {
      type: Number,
      value: 10
    },
    sizeType: {
      type: Array,
      value: ["compressed", "original"]
    },
    camera: {
      type: String,
      value: "back"
    },
    messageFile: {
      type: Boolean,
      value: false
    },
    messageFileType: {
      type: String,
      value: "all"
    },
    messageFileExtension: {
      type: Array,
      value: []
    },
    fileList: {
      type: Array,
      value: []
    },
    controlled: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addMedia() {
      new Promise<{
        tempFiles: Array<{
          tempFilePath?: string,
          duration?: number,
          height?: number,
          width?: number,
          thumbTempFilePath?: string,
          fileType?: "image" | "video"

          path?: string,
          size?: number,
          name?: string,
          type?: "video" | "image" | "file",
          time?: number
        }>
      }>((resolve, reject) => {
        if (this.properties.messageFile) {
          wx.chooseMessageFile({
            count: this.properties.count - this.properties.fileList.length,
            // @ts-ignore
            type: this.properties.messageFileType,
            extension: this.properties.messageFileExtension
          }).then(resolve).catch(reject);
        } else {
          wx.chooseMedia({
            count: this.properties.count - this.properties.fileList.length,
            mediaType: this.properties.mediaType,
            sourceType: this.properties.sourceType,
            maxDuration: this.properties.maxDuration,
            sizeType: this.properties.sizeType,
            // @ts-ignore
            camera: this.properties.camera,
          }).then(resolve).catch(reject);
        }
      }).then(res => {
        const fileList: Array<{
          key?: string,
          url: string,
          coverURL?: string,
          type: "image" | "video"
        }> = [];

        res.tempFiles.forEach(item => {
          fileList.push({
            url: this.properties.messageFile ? item.path : item.tempFilePath,
            coverURL: item?.thumbTempFilePath ?? null,
            type: item.fileType
          });
        });

        if (this.data.controlled) {
          this.triggerEvent("update", res.tempFiles);
          this.triggerEvent("add", res.tempFiles);
        } else {
          this.setData({
            fileList
          }, () => {
            this.triggerEvent("update", this.data.fileList);
            this.triggerEvent("add", this.data.fileList);
          });
        }
      }).catch(err => {
        console.error(err);
      });
    },
    previewMedia(options) {
      wx.previewMedia({
        sources: this.properties.fileList,
        current: Number(options.currentTarget.dataset.index)
      });
    },
    removeMedia(options) {
      const fileList = this.properties.fileList;
      fileList.splice(Number(options.currentTarget.dataset.index), 1);

      if (this.data.controlled) {
        this.triggerEvent("remove", Number(options.currentTarget.dataset.index));
      } else {
        this.setData({
          fileList
        }, () => {
          this.triggerEvent("remove", this.data.fileList);
          this.triggerEvent("update", this.data.fileList);
        });
      }
    }
  }
})
