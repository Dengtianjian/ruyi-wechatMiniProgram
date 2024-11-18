import eventBus from "../../foundation/EventBus";

Component<{
  CustomNavbarHeight: number
}, {
  justify: {
    type: StringConstructor,
    value: "start" | "end" | "center" | "space-between" | "space-everly" | "space-around" | string
  },
  align: {
    type: StringConstructor,
    value: "start" | "end" | "center" | string
  },
  wrap: {
    type: StringConstructor,
    value: string
  },
  direction: {
    type: StringConstructor,
    value: string
  },
  //* 计算容器高度时需要减去的高度，带上单位，目前会获取页面自定义导航栏的高度，cala(100vh - 导航栏高度 - subtracive)
  subtracive: {
    type: StringConstructor,
    value: string
  }
}, {}>({
  /**
   * 组件的属性列表
   */
  properties: {
    justify: {
      type: String,
      value: "start"
    },
    align: {
      type: String,
      value: "start"
    },
    wrap: {
      type: String,
      value: "wrap"
    },
    direction: {
      type: String,
      value: "column"
    },
    subtracive: {
      type: String,
      value: "0px"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    CustomNavbarHeight: 44
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  lifetimes: {
    attached() {
      eventBus.subscribe("Ruyi_CustomNavbar", (params) => {
        this.setData({
          CustomNavbarHeight: params.height
        })
      });
    }
  }
})
