// components/base/TCells/TCell/TCell.ts
Component<{}, {
  title: {
    type: StringConstructor,
    value: string
  },
  label: {
    type: StringConstructor,
    value: string
  },
  content: {
    type: StringConstructor,
    value: string
  },
  description: {
    type: StringConstructor,
    value: string
  },
  link: {
    type: BooleanConstructor,
    value: boolean
  },
  url: {
    type: StringConstructor,
    value: string
  }
  clickable: {
    type: BooleanConstructor,
    value: boolean
  }
  useLableSlot: {
    type: BooleanConstructor,
    value: boolean
  }
  useDescriptionSlot: {
    type: BooleanConstructor,
    value: boolean
  }
  disabled: {
    type: BooleanConstructor,
    value: boolean
  }
}, {
  tapHeader: () => void,
  tapTitle: () => void,
  tapLabel: () => void,
  tapContent: () => void,
  tapDescription: () => void,
}>({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ""
    },
    label: {
      type: String,
      value: ""
    },
    content: {
      type: String,
      value: ""
    },
    description: {
      type: String,
      value: ""
    },
    link: {
      type: Boolean,
      value: false
    },
    url: {
      type: String,
      value: null
    },
    clickable: {
      type: Boolean,
      value: false
    },
    useLableSlot: {
      type: Boolean,
      value: false
    },
    useDescriptionSlot: {
      type: Boolean,
      value: false
    },
    disabled: {
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
    tapHeader() {
      if (this.properties.url) {
        wx.navigateTo({
          url: this.properties.url
        });
      }
      this.triggerEvent("header");
    },
    tapTitle() {
      this.triggerEvent("content");
    },
    tapLabel() {
      this.triggerEvent("label");
    },
    tapContent() {
      this.triggerEvent("content");
    },
    tapDescription() {
      this.triggerEvent("description");
    },
  },
  relations: {
    "../TCells/TCells": {
      type: "parent",
      linked(target) {
        // console.log(target);

      },
    }
  }
})
