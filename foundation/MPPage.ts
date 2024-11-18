import MPStore from "./MPStore";

export type TMPPageData = {
  _StaticURL?: string
  _PageScrollTop?: number
  _RuyiPageId?: string
};
export type TMPPageOptions = {
  useStore?: (store: MPStore<any>, pageDataKey: string, storeKey?: string) => void
};
export type TMPPageCustom = {
  useStore?: (store: MPStore<any>, pageDataKey: string, storeKey?: string) => void
}

export default function <TData, TCustom>(options: TMPPageOptions & WechatMiniprogram.Page.Options<TData & TMPPageData, TCustom>) {
  const RuyiPageId = Date.now().toString();

  options.data._RuyiPageId = RuyiPageId;

  if (!options['data']['_StaticURL']) {
    options['data']['_StaticURL'] = "";
  }

  if (!options['onPageScroll']) {
    options['onPageScroll'] = function (options) {
      // @ts-ignore
      this.setData({
        _PageScrollTop: options.scrollTop
      });
    }
  }

  options.useStore = function (store, pageDataKey, storeKey) {
    store.link(pageDataKey, storeKey, RuyiPageId);
  }

  return Page<TData & TMPPageData, TMPPageCustom & TCustom>(options);
}
