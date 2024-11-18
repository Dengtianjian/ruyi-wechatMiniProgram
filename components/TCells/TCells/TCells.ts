// components/base/TCells/index/index.ts
Component<{}, {
  title: {
    type: StringConstructor,
    value: string
  }
}, {}>({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: null
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

  },
  relations: {
    "../TCell/TCell": {
      type: "child",
      linked(target) {
        // console.log(target);

      },
    }
  }
})
