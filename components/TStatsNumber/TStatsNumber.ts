// components/base/TStatsNumber/TStatsNumber.ts
Component<{
  numberValue: string
}, {
  value: {
    type: StringConstructor,
    optionalTypes: [NumberConstructor, StringConstructor],
    observer: (newV: number | string) => void
  }
}, {
  update: () => void,
  formatNumber: (val: string | number) => string
}>({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      optionalTypes: [Number, String],
      observer() {
        this.update();
      }
    }
  },
  lifetimes: {
    ready() {
      this.update();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    numberValue: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatNumber(val: string | number) {
      if (typeof val === "number" && val <= 0) return val.toString();

      const Str: string = val.toString();
      const HasPoint: boolean = Str.includes(".");
      const Int: string = HasPoint ? Str.split(".")[0] : Str;
      if (Int.length < 5) {
        return HasPoint ? Number(val).toFixed(2) : Str;
      }
      let decimal: string = "";
      let unit: string = '万';
      let value: string = "";

      switch (Int.length) {
        case 5:
        case 6:
          value = Int.slice(0, -4);
          decimal = Int.slice(-4);
          if (decimal) {
            if (Number(decimal[0]) > 0) {
              decimal = `.${decimal[0]}`;
            } else {
              decimal = "";
            }
          }
          break;
        case 7:
          value = Int.slice(0, -6);
          decimal = Int.slice(-6);

          if (decimal) {
            if (Number(decimal[0]) > 0) {
              decimal = `.${decimal[0]}`;
            } else {
              decimal = "";
            }
          }
          unit = "百万";
          break;
        case 8:
          value = Int.slice(0, -7);
          decimal = Int.slice(-7);

          if (decimal) {
            if (Number(decimal[0]) > 0) {
              decimal = `.${decimal[0]}`;
            } else {
              decimal = "";
            }
          }
          unit = "千万";
          break;
        case 9:
        case 10:
        case 11:
          value = Int.slice(0, -8);
          decimal = Int.slice(-8);

          if (decimal) {
            if (Number(decimal[0]) > 0) {
              decimal = `.${decimal[0]}`;
            } else {
              decimal = "";
            }
          }
          unit = "亿";
          break;
        case 12:
          value = Int.slice(0, -11);
          decimal = Int.slice(-11);

          if (decimal) {
            if (Number(decimal[0]) > 0) {
              decimal = `.${decimal[0]}`;
            } else {
              decimal = "";
            }
          }
          unit = "千亿";
          break;
      }

      return `${value}${decimal}${unit}+`;
    },
    update() {
      this.setData({
        numberValue: this.formatNumber(this.properties.value)
      })
    }
  }
})
