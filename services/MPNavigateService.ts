export default {
  dalayNavigateTo(url: string, delay: number = 1444, events: WechatMiniprogram.IAnyObject = {}, routeType: string = null) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.navigateTo({
          url,
          events,
          routeType
        }).then(resolve).catch(reject);
      }, delay);
    });
  },
  delaySwitchTab(url: string, delay: number = 1444) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.switchTab({
          url
        }).then(resolve).catch(reject);
      }, delay);
    });
  },
  delayNavigateBack(delta: number = 1, delay: number = 1444, redirectToURL: string = null, redirectType: "navigate" | "switchTab" = "navigate") {
    const Pages = getCurrentPages();
    if (Pages.length === 1 && redirectToURL) {
      if (redirectType === "navigate") {
        return this.delayRedirectTo(redirectToURL, delay);
      } else {
        return this.delaySwitchTab(redirectToURL, delay);
      }
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.navigateBack({
          delta
        }).then(resolve).catch(reject);
      }, delay);
    });
  },
  delayRedirectTo(url: string, delay: number = 1444) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.redirectTo({
          url
        }).then(resolve).catch(reject);
      }, delay);
    })
  }
}