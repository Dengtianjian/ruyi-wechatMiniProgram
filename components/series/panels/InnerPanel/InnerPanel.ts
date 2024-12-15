// ruyi-wechatMiniProgram/components/series/panels/InnerPanel/InnerPanel.ts
Component<{
  listed: boolean,
  padding: string
}, {
  useHeaderSlot: {
    type: BooleanConstructor,
    value: boolean
  },
  title: {
    type: StringConstructor,
    value: string
  },
  useTitleSlot: {
    type: BooleanConstructor,
    value: boolean
  },
  headerExtra: {
    type: StringConstructor,
    value: string
  },
  useHeaderExtraSlot: {
    type: BooleanConstructor,
    value: boolean
  },
  footer: {
    type: StringConstructor,
    value: string
  },
  useFooterSlot: {
    type: BooleanConstructor,
    value: boolean
  },
  size: {
    type: StringConstructor,
    value: "small" | "medium" | "large"
  },
  storage: {
    type: BooleanConstructor,
    value: boolean
  },
  backgrounded: {
    type: BooleanConstructor,
    value: boolean
  }
}, {
  updateStyle: () => void
}>({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    useHeaderSlot: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ""
    },
    useTitleSlot: {
      type: Boolean,
      value: false
    },
    headerExtra: {
      type: String,
      value: ""
    },
    useHeaderExtraSlot: {
      type: Boolean,
      value: false
    },
    footer: {
      type: String,
      value: ""
    },
    useFooterSlot: {
      type: Boolean,
      value: false
    },
    size: {
      type: String,
      value: "medium"
    },
    storage: {
      type: Boolean,
      value: null
    },
    backgrounded: {
      type: Boolean,
      value: true
    }
  },

  relations: {
    "../PanelList/PanelList": {
      type: "parent"
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    listed: false,
    padding: "var(--container-margin-medium)"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateStyle() {
      const SetData: Record<string, string> = {};
      let padding: string = "var(--container-margin-medium)";
      if (!this.data.backgrounded) {
        padding = "0rpx";
      }

      SetData['padding'] = padding;

      this.setData(SetData);
    }
  }
})