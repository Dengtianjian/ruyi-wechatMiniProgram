// components/base/Form/TForm.ts
Component<{}, {
  itemStyle: {
    type: StringConstructor,
    value: "default" | "fill" | "border" | "plain" | null
  }
  labelPlacement: {
    type: StringConstructor,
    value: "left" | "top"
  }
  disabled: {
    type: BooleanConstructor,
    value: boolean
  }
}, {
  submitForm: (event: WechatMiniprogram.CustomEvent<WechatMiniprogram.GeneralCallbackResult>) => void,
  resetForm: (event: WechatMiniprogram.CustomEvent<WechatMiniprogram.GeneralCallbackResult>) => void
}>({
  options: {
    // virtualHost: true,
    multipleSlots: true,
  },
  // behaviors: ['wx://form-field-group'],
  /**
   * 组件的属性列表
   */
  properties: {
    itemStyle: {
      type: String,
      value: "plain"
    },
    labelPlacement: {
      type: String,
      value: "top"
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },

  relations: {
    "./TFormItem/TFormItem": {
      type: "child"
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
    submitForm(e) {
      this.triggerEvent("submit", e);
    },
    resetForm(e) {
      this.triggerEvent("reset", e);
    }
  }
})
