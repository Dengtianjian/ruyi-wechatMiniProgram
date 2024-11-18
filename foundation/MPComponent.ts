import MPStore from "./MPStore";

export type TMPComponentData = {
  _StaticURL?: string
  _PageScrollTop?: number
  _RuyiPageId?: string
};
export type TMPComponentOptions = {
  useStore?: (store: MPStore<any>, pageDataKey: string, storeKey?: string) => void
};
export type TMPPageCustom = {
  useStore?: (store: MPStore<any>, pageDataKey: string, storeKey?: string) => void
}

export default function <
  TData extends WechatMiniprogram.Component.DataOption & TMPComponentData,
  TProperty extends WechatMiniprogram.Component.PropertyOption,
  TMethod extends WechatMiniprogram.Component.MethodOption,
  TCustomInstanceProperty extends WechatMiniprogram.IAnyObject = {},
  TIsPage extends boolean = false
>(options: TMPComponentOptions & WechatMiniprogram.Component.Options<
  TData,
  TProperty,
  TMethod,
  TCustomInstanceProperty,
  TIsPage
>) {
  const RuyiPageId = Date.now().toString();

  options.data._RuyiPageId = RuyiPageId;

  if (!options['data']['_StaticURL']) {
    options['data']['_StaticURL'] = "";
  }

  options.useStore = function (store, pageDataKey, storeKey) {
    store.link(pageDataKey, storeKey, RuyiPageId);
  }

  return Component<TData, TProperty, TMethod, TCustomInstanceProperty, TIsPage>(options);
}
