function toast(title: string, icon: 'success' | 'error' | 'loading' | 'none' = "none", duration: number = 1500) {
  return wx.showToast({
    title,
    icon,
    duration
  });
}

export default {
  toast
}