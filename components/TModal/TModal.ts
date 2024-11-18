// components/base/TModal/TModal.ts
Component({
  options: {
    addGlobalClass: true,
    // virtualHost: true
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
    show: {
      type: Boolean,
      value: false,
      observer(newV) {
        if (newV === this.data.showModal) return;
        this.setData({
          showModal: newV
        });
      }
    },
    maskClose: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tapMask() {
      if (this.properties.maskClose) {
        this.setData({
          showModal: false
        }, () => {
          this.triggerEvent("close");
        });
      }
      this.triggerEvent("mask");
    }
  },
  observers: {
    showModal(newV) {
      this.triggerEvent("show");
      this.triggerEvent("update", newV);
    }
  }
})
