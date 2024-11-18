// components/base/TAlert/TAlert.ts

const TypeIcon: Record<string, string> = {
  default: "antd antd-alert-fill",
  info: "antd antd-info-circle-fill",
  success: "antd antd-check-circle-fill",
  warning: "antd antd-warning-circle-fill",
  error: "antd antd-error-fill",
}

Component<{}, {
  bordered: {
    type: BooleanConstructor,
    value: boolean
  }
  closable: {
    type: BooleanConstructor,
    value: boolean
  }
  showIcon: {
    type: BooleanConstructor,
    value: boolean
  }
  useIconSlot: {
    type: BooleanConstructor,
    value: boolean
  }
  iconClassName: {
    type: StringConstructor,
    value: string
  }
  useTitleSlot: {
    type: BooleanConstructor,
    value: boolean
  }
  title: {
    type: StringConstructor,
    value: string
  }
  type: {
    type: StringConstructor,
    value: 'default' | 'info' | 'success' | 'warning' | 'error'
  },
  size: {
    type: StringConstructor,
    value: 'medium' | 'small' | 'mini'
  }
}, {
  computeIcon: () => void,
  closeAlert: () => void
}>({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bordered: {
      type: Boolean,
      value: true
    },
    closable: {
      type: Boolean,
      value: false
    },
    showIcon: {
      type: Boolean,
      value: true
    },
    useIconSlot: {
      type: Boolean,
      value: false
    },
    iconClassName: {
      type: String,
      value: null
    },
    useTitleSlot: {
      type: Boolean,
      value: false
    },
    title: {
      type: String,
      value: ""
    },
    type: {
      type: String,
      value: "default"
    },
    size: {
      type: String,
      value: 'medium'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    icon: "",
    show: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    computeIcon() {
      if (!this.properties.showIcon) return;

      let icon: string = "";
      if (this.properties.useIconSlot) {
        icon = "";
      } else {
        if (this.properties.iconClassName) {
          icon = this.properties.iconClassName;
        } else {
          icon = TypeIcon[this.properties.type];
        }
      }

      this.setData({
        icon
      })
    },
    closeAlert() {
      this.setData({
        show: false
      });
    }
  },
  lifetimes: {
    attached() {
      this.computeIcon();
    }
  }
})
