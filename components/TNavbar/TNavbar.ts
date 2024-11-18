// components/base/navbar/navbar.ts
Component<{
  pages: string[],
  isHomePage: boolean,
  height: number
}, {
  top: {
    type: NumberConstructor,
    value: number
  },
  threshold: {
    type: NumberConstructor,
    value: number,
  }
  backBackground: {
    type: StringConstructor,
    value: string,
  }
  frontBackground: {
    type: StringConstructor,
    value: string
  }
  defaultOpacity: {
    type: NumberConstructor,
    value: number
  }
  reachOpacity: {
    type: NumberConstructor,
    value: number
  }
  defaultColor: {
    type: StringConstructor,
    value: string
  }
  reachColor: {
    type: StringConstructor,
    value: string
  }
  fixed: {
    type: BooleanConstructor,
    value: boolean
  }
  zIndex: {
    type: NumberConstructor,
    value: number
  }
  homePageUrl: {
    type: StringConstructor,
    value: null
  }
  placeholder: {
    type: BooleanConstructor,
    value: boolean
  },
  customLeft: {
    type: BooleanConstructor,
    value: boolean
  }
}, {
  back: () => void
  home: () => void
  headerBarHeightUpdate: (event: {
    detail: number
  }) => void
  headerNavBarHeightUpdate: (event: {
    detail: number
  }) => void
}>({
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },
  lifetimes: {
    attached() {
      const Pages = getCurrentPages();
      const pages: string[] = [];
      Pages.forEach(item => {
        pages.push(item.route);
      });
      const HomePageRoute: string = pages[0];
      const CureentPageRoute: string = pages[pages.length - 1];

      this.setData({
        pages,
        isHomePage: HomePageRoute === CureentPageRoute
      });
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    top: {
      type: Number,
      value: 0
    },
    threshold: {
      type: Number,
      value: 0
    },
    backBackground: {
      type: String,
      value: "white"
    },
    frontBackground: {
      type: String,
      value: "white"
    },
    defaultOpacity: {
      type: Number,
      value: 0
    },
    reachOpacity: {
      type: Number,
      value: 1
    },
    defaultColor: {
      type: String,
      value: "black"
    },
    reachColor: {
      type: String,
      value: "white"
    },
    fixed: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    homePageUrl: {
      type: String,
      value: null
    },
    placeholder: {
      type: Boolean,
      value: true
    },
    customLeft: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHomePage: false,
    pages: [],
    height: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    back() {
      wx.navigateBack();
    },
    home() {
      wx.reLaunch({
        url: this.properties.homePageUrl ?? `/${this.data.pages[0]}`
      });
    },
    headerBarHeightUpdate(e) {
      this.setData({
        height: e.detail
      });
      this.triggerEvent("heightUpdate", e.detail);
    },
    headerNavBarHeightUpdate(e) {
      this.setData({
        navBarHeight: e.detail
      });
      this.triggerEvent("navBarHeightUpdate", e.detail);
    }
  }
})
