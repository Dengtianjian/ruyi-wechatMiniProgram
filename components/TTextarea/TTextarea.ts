// components/base/TTextarea/TTextarea.ts
Component<{}, {
  // class: {
  //   type: StringConstructor,
  //   value: string
  // },
  value: {
    type: StringConstructor,
    value: string
  },
  placeholder: {
    type: StringConstructor,
    value: string
  },
  placeholderStyle: {
    type: StringConstructor,
    value: string
  },
  placeholderClass: {
    type: StringConstructor,
    value: string
  },
  disabled: {
    type: BooleanConstructor,
    value: boolean
  },
  maxLength: {
    type: NumberConstructor,
    value: number
  },
  autoFocus: {
    type: BooleanConstructor,
    value: boolean
  },
  focus: {
    type: BooleanConstructor,
    value: boolean
  },
  autoHeight: {
    type: BooleanConstructor,
    value: boolean
  },
  fixed: {
    type: BooleanConstructor,
    value: boolean
  },
  cursorSpacing: {
    type: NumberConstructor,
    value: number,
    observer?: (val: number) => void;
  },
  cursor: {
    type: NumberConstructor,
    value: number
  },
  showConfirmBar: {
    type: BooleanConstructor,
    value: boolean
  },
  selectionStart: {
    type: NumberConstructor,
    value: number
  },
  selectionEnd: {
    type: NumberConstructor,
    value: number
  },
  adjustPosition: {
    type: BooleanConstructor,
    value: boolean
  },
  holdKeyboard: {
    type: BooleanConstructor,
    value: boolean
  },
  disableDefaultPadding: {
    type: BooleanConstructor,
    value: boolean
  },
  confirmType: {
    type: StringConstructor,
    value: "send" | "search" | "next" | "go" | "done" | "return"
  },
  confirmHold: {
    type: BooleanConstructor,
    value: boolean
  }
}, {
  focus: (options: WechatMiniprogram.CustomEvent<
    WechatMiniprogram.GeneralCallbackResult & {
      value: string,
      height: number
    }
  >) => void,
  blur: (options: WechatMiniprogram.CustomEvent<
    WechatMiniprogram.GeneralCallbackResult & {
      value: string,
      cursor: number
    }
  >) => void,
  lineChange: (options: WechatMiniprogram.CustomEvent<
    WechatMiniprogram.GeneralCallbackResult & {
      height: number,
      heightRpx: number,
      lineCount: number
    }
  >) => void,
  input: (options: WechatMiniprogram.CustomEvent<
    WechatMiniprogram.GeneralCallbackResult & {
      value: string,
      cursor: number,
      keyCode: number
    }
  >) => void,
  confirm: (options: WechatMiniprogram.CustomEvent<
    WechatMiniprogram.GeneralCallbackResult & {
      value: string
    }
  >) => void,
  keyboardHeightChange: (options: WechatMiniprogram.CustomEvent<
    WechatMiniprogram.GeneralCallbackResult & {
      height: number,
      duration: number
    }
  >) => void
}>({
  options: {
    addGlobalClass: true,
    virtualHost: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: null
    },
    placeholder: {
      type: String,
      value: null
    },
    placeholderStyle: {
      type: String,
      value: null
    },
    placeholderClass: {
      type: String,
      value: "textarea-placeholder"
    },
    disabled: {
      type: Boolean,
      value: false
    },
    maxLength: {
      type: Number,
      value: 140
    },
    autoFocus: {
      type: Boolean,
      value: false
    },
    focus: {
      type: Boolean,
      value: false
    },
    autoHeight: {
      type: Boolean,
      value: false
    },
    fixed: {
      type: Boolean,
      value: false
    },
    cursorSpacing: {
      type: Number,
      value: -1,
      observer(val) {
        this.setData({
          autoCursorSpacing: val
        });
      }
    },
    cursor: {
      type: Number,
      value: -1
    },
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    selectionEnd: {
      type: Number,
      value: -1
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    holdKeyboard: {
      type: Boolean,
      value: false
    },
    disableDefaultPadding: {
      type: Boolean,
      value: false
    },
    confirmType: {
      type: String,
      value: "return"
    },
    confirmHold: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    autoCursorSpacing: 100
  },

  /**
   * 组件的方法列表
   */
  methods: {
    focus(options) {
      this.triggerEvent("focus", options);
    },
    blur(options) {
      this.triggerEvent("blur", options);
    },
    lineChange(options) {
      this.triggerEvent("lineChange", options);
    },
    input(options) {
      this.triggerEvent("input", options);
      this.setData({
        value: options.detail.value
      });
    },
    confirm(options) {
      this.triggerEvent("confirm", options);
    },
    keyboardHeightChange(options) {
      if (this.properties.cursorSpacing === -1) {
        this.setData({
          autoCursorSpacing: options.detail.height
        });
      }
      this.triggerEvent("keyboardHeightChange", options);
    }
  }
})
