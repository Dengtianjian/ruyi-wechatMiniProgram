
let loadingAnimationTimer: number = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer(newV) {
        if (newV) {
          this.startLoadingAnimation();
        }
        if (newV === false && loadingAnimationTimer !== null) {
          clearInterval(loadingAnimationTimer);
        }
      }
    },
    iconColor: {
      type: String,
      value: "#999"
    },
    iconActiveColor: {
      type: String,
      value: "#333"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },
  lifetimes: {
    attached() {
      if (this.properties.show) {
        this.startLoadingAnimation();
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    startLoadingAnimation() {
      loadingAnimationTimer = setInterval(() => {
        this.setData({
          activeIndex: this.data.activeIndex === 2 ? 0 : this.data.activeIndex + 1
        });
      }, 200);
    }
  }
})
