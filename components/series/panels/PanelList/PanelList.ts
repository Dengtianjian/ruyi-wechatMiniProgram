// ruyi-wechatMiniProgram/components/series/panels/PanelList/PanelList.ts
Component({
  relations: {
    "../Panel/Panel": {
      type: "child"
    },
    "../InnerPanel/InnerPanel": {
      type: "child"
    }
  },
  lifetimes: {
    ready() {
      const Panels = this.getRelationNodes('../Panel/Panel');
      const InnerPanels = this.getRelationNodes('../InnerPanel/InnerPanel');

      const PanelList = [...Panels, ...InnerPanels];

      if (PanelList.length) {
        const LastIndex = PanelList.length - 1 < 0 ? 0 : PanelList.length - 1;
        PanelList.forEach((item, index) => {
          let bordered: boolean = LastIndex === index ? false : this.data.bordered;
          item.setData({
            size: this.data.size,
            listed: true,
            bordered: item.data.bordered === null ? bordered : item.data.bordered,
            storage: item.properties.storage === null ? this.properties.storage : item.properties.storage
          });
          item.updateStyle();
        });
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bordered: {
      type: Boolean,
      value: true
    },
    size: {
      type: String,
      value: "medium"
    },
    storage: {
      type: Boolean,
      value: true
    },
    inner: {
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