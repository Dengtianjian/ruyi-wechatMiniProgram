// components/base/TModal/TModal.ts
Component({
  options: {
    addGlobalClass: true,
    // virtualHost: true,
    styleIsolation: "apply-shared",
    multipleSlots: true
  },
  externalClasses: ["mask-style"],
  /**
   * 组件的属性列表
   */
  properties: {
    inside: {
      type: Boolean,
      value: false
    },
    position: {
      type: String,
      value: "fixed"
    },
    width: {
      type: String,
      value: "100vw",
    },
    height: {
      type: String,
      value: "52vh",
      observer() {
        this.updateBodyHeight();
      }
    },
    show: {
      type: Boolean,
      value: false
    },
    closeButton: {
      type: Boolean,
      value: true
    },
    maskClose: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    title: {
      type: String,
      value: ""
    },
    subtitle: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bodyHeight: "100%"
  },

  lifetimes: {
    ready() {
      // this.updateBodyHeight();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    showDrawer() {
      this.triggerEvent("show");
      this.triggerEvent("update", this.data.show);
      this.updateBodyHeight();
    },
    closeDrawer() {
      if (this.properties.maskClose) {
        this.setData({
          show: false
        }, () => {
          this.triggerEvent("close");
          this.triggerEvent("update", this.data.show);
        });
      }

      this.triggerEvent("mask");
    },
    updateBodyHeight() {
      if (this.properties.height === "auto" || this.properties.height === "unset") return;

      this.createSelectorQuery().select(".r-drawer").boundingClientRect(Drawer => {
        this.createSelectorQuery().select(".r-drawer-header").boundingClientRect(Header => {
          this.setData({
            bodyHeight: `${Drawer.height - Header.height}px`
          });
        }).exec();
      }).exec();
    }
  }
})
