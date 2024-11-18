// components/base/Form/TFormItem/TFormItem.ts
Component<{}, {
  style: {
    type: StringConstructor,
    value: "default" | "fill" | "border" | "plain" | null
  }
  labelPlacement: {
    type: StringConstructor,
    value: "left" | "top"
  }
  required: {
    type: BooleanConstructor,
    value: boolean
  }
  disabled: {
    type: BooleanConstructor,
    value: boolean
  }
  label: {
    type: StringConstructor,
    value: string
  }
}, {}>({
  options: {
    virtualHost: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    style: {
      type: String,
      value: null,
    },
    labelPlacement: {
      type: String,
      value: null
    },
    required: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: null
    },
    label: {
      type: String,
      value: null
    }
  },

  relations: {
    "../TForm": {
      type: "parent",
      linked(target) {
        if (!this.properties.style) {
          this.setData({
            style: target.properties.itemStyle
          });
        }
        if (!this.properties.labelPlacement) {
          this.setData({
            labelPlacement: target.properties.labelPlacement
          });
        }
        if (this.properties.disabled === null) {
          this.setData({
            disabled: target.properties.disabled
          });
        }
      }
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

  }
})
