Component<{},
  {
    size: {
      type: StringConstructor,
      value: "default" | "mini"
    },
    type: {
      type: StringConstructor,
      value: "primary" | "default" | "warn"
    },
    plain: {
      type: BooleanConstructor,
      value: boolean
    }
    disabled: {
      type: BooleanConstructor,
      value: boolean
    }
    loading: {
      type: BooleanConstructor,
      value: boolean
    }
    formType: {
      type: StringConstructor,
      value: "submit" | "reset" | null
    }
    openType: {
      type: StringConstructor,
      value: "contact" | "share" | "getPhoneNumber" | "getUserInfo" | "launchApp" | "openSetting" | "feedback" | "chooseAvatar" | null
    }
    hoverClass: {
      type: StringConstructor,
      value: string
    }
    hoverStopPropagation: {
      type: BooleanConstructor,
      value: boolean
    }
    hoverStartTime: {
      type: NumberConstructor,
      value: number
    }
    hoverStayTime: {
      type: NumberConstructor,
      value: number
    },
    lang: {
      type: StringConstructor,
      value: "en" | "zh_CN" | "zh_TW" | null
    },
    sessionFrom: {
      type: StringConstructor,
      value: string
    }
    sendMessageTitle: {
      type: StringConstructor,
      value: string
    }
    sendMessagePath: {
      type: StringConstructor,
      value: string
    }
    sendMessageImg: {
      type: StringConstructor,
      value: string
    }
    appParameter: {
      type: StringConstructor,
      value: string
    }
    showMessageCard: {
      type: BooleanConstructor,
      value: boolean
    },
    block: {
      type: BooleanConstructor,
      value: boolean
    }
    radius: {
      type: NumberConstructor,
      value: number
    },
    storage: {
      type: BooleanConstructor,
      value: boolean
    }
  },
  {
    getUserInfo: (options: WechatMiniprogram.CustomEvent<
      WechatMiniprogram.GeneralCallbackResult & WechatMiniprogram.GetUserInfoSuccessCallbackResult
    >) => void
    contact: (options: WechatMiniprogram.CustomEvent<WechatMiniprogram.GeneralCallbackResult>) => void
    getPhoneNumber: (options: WechatMiniprogram.CustomEvent<
      WechatMiniprogram.GeneralCallbackResult & Partial<WechatMiniprogram.GetWeRunDataSuccessCallbackResult>
    >) => void
    error: (options: WechatMiniprogram.CustomEvent<WechatMiniprogram.GeneralCallbackResult>) => void
    openSetting: (options: WechatMiniprogram.CustomEvent<
      WechatMiniprogram.GeneralCallbackResult & WechatMiniprogram.OpenSettingSuccessCallbackResult
    >) => void
    launchApp: (options: WechatMiniprogram.CustomEvent<WechatMiniprogram.GeneralCallbackResult>) => void
    chooseAvatar: (options: WechatMiniprogram.CustomEvent<WechatMiniprogram.GeneralCallbackResult>) => void
  }>({
    behaviors: ["wx://form-field-button"],
    options: {
      addGlobalClass: true,
      virtualHost: true
    },
    properties: {
      size: {
        type: String,
        value: "default"
      },
      type: {
        type: String,
        value: "default"
      },
      plain: {
        type: Boolean,
        value: false
      },
      disabled: {
        type: Boolean,
        value: false,
      },
      loading: {
        type: Boolean,
        value: false,
      },
      formType: {
        type: String,
        value: null
      },
      openType: {
        type: String,
        value: null,
      },
      hoverClass: {
        type: String,
        value: "button-hover",
      },
      hoverStopPropagation: {
        type: Boolean,
        value: false,
      },
      hoverStartTime: {
        type: Number,
        value: 20,
      },
      hoverStayTime: {
        type: Number,
        value: 70,
      },
      lang: {
        type: String,
        value: null,
      },
      sessionFrom: {
        type: String,
        value: null,
      },
      sendMessageTitle: {
        type: String,
        value: "当前标题",
      },
      sendMessagePath: {
        type: String,
        value: "当前分享路径",
      },
      sendMessageImg: {
        type: String,
        value: "截图",
      },
      appParameter: {
        type: String,
        value: null,
      },
      showMessageCard: {
        type: Boolean,
        value: false,
      },

      block: {
        type: Boolean,
        value: false
      },
      radius: {
        type: Number,
        value: 0
      },
      storage: {
        type: Boolean,
        value: false
      }
    },
    methods: {
      getUserInfo(options) {
        this.triggerEvent("getUserInfo", options);
      },
      contact(options) {
        this.triggerEvent("contact", options);
      },
      error(options) {
        this.triggerEvent("error", options);
      },
      getPhoneNumber(options) {
        this.triggerEvent("getPhoneNumber", options);
      },
      openSetting(options) {
        this.triggerEvent("openSetting", options);
      },
      chooseAvatar(options) {
        this.triggerEvent("chooseAvatar", options);
      },
      launchApp(options) {
        this.triggerEvent("launchApp", options);
      }
    }
  });