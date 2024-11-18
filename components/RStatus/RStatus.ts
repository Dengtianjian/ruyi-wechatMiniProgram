// Ruyi/MiniProgram/components/Rtatus/RStatus.ts
let loadingAnimationTimer: number = null;
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultText: {
      type: String,
      value: "下拉加载更多",
    },
    loading: {
      type: Boolean,
      value: false,
      observer(newV) {
        if (newV && this.data.loadingIcon) {
          this.startLoadingAnimation();
        }
        if (newV === false && loadingAnimationTimer !== null) {
          clearInterval(loadingAnimationTimer);
        }
      }
    },
    loadingText: {
      type: String,
      value: "加载中",
    },
    loadingIcon: {
      type: Boolean,
      value: true,
    },
    iconColor: {
      type: String,
      value: "#999"
    },
    iconActiveColor: {
      type: String,
      value: "#333"
    },
    fontSize: {
      type: String,
      value: "28rpx"
    },
    finished: {
      type: Boolean,
      value: false,
    },
    finishedText: {
      type: String,
      value: "没有更多了",
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
      this.startLoadingAnimation();
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
