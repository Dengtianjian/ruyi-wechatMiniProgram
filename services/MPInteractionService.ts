let loadings: boolean = false;
export default {
  toast(title: string, icon: 'success' | 'error' | 'loading' | 'none' = "none", duration: number = 1500) {
    loadings = false;
    return wx.showToast({
      title,
      icon,
      duration
    });
  },
  loading(title: string, mask: boolean = true) {
    loadings = true;
    return wx.showLoading({
      title,
      mask
    });
  },
  hideLoading(noConflict: boolean = false) {
    if (loadings) {
      loadings = false;
      return wx.hideLoading({
        noConflict
      });
    }
    return Promise.resolve(true);
  }
}