// Ruyi/MiniProgram/components/REmpty/REmpty.ts
Component<{

}, {
  icon: {
    type: StringConstructor,
    value: string
  },
  useIconSlot: {
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
  description: {
    type: StringConstructor,
    value: string
  },
  useDescriptionSlot: {
    type: BooleanConstructor,
    value: boolean
  },
  show: {
    type: BooleanConstructor,
    value: boolean
  },
  loading: {
    type: BooleanConstructor,
    value: boolean
  }
}, {

  }>({
    options: {
      multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    properties: {
      icon: {
        type: String,
        value: null
      },
      useIconSlot: {
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
      description: {
        type: String,
        value: ""
      },
      useDescriptionSlot: {
        type: Boolean,
        value: false
      },
      show: {
        type: Boolean,
        value: true
      },
      loading: {
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

    }
  })
