

export default class MPStore<T extends Record<string | number, any>> {
  #data: any = {};
  #links: Map<keyof T, Map<string, string[]>> = new Map();
  #linkPageIds: Set<string> = new Set();
  constructor(data: T) {
    this.#data = data;
  }
  get(key: keyof T): any {
    return this.#data[key.toString()];
  }
  #getPageId() {
    const Page = getCurrentPages()?.[0];
    if (!Page) return null;
    return Page.data._RuyiPageId.toString();
  }
  #updatePages(key: string, callback?: () => void, value: any = null) {
    key = key.toString();
    const Pages = getCurrentPages();
    if (this.#links.has(key)) {
      const links = this.#links.get(key);
      Pages.forEach(item => {
        if (item.data._RuyiPageId && links.has(item.data._RuyiPageId)) {
          links.get(item.data._RuyiPageId).forEach(AttributeName => {
            item.setData({
              [AttributeName.toString()]: value ?? this.#data[key]
            }, callback)
          });
        }
      });
    }
  }
  set(key: keyof T, value: any, callback?: () => void) {
    this.#data[key.toString()] = value;
    this.#updatePages(key.toString(), callback)
    return this;
  }
  setData(key: keyof T, value: any, callback?: () => void) {

    this.#updatePages(key.toString(), callback, value);
    return this;
  }
  link(key: string, storeKey: keyof T = null, pageId: string = null) {
    const PageId = pageId ?? this.#getPageId();
    if (storeKey === null) {
      storeKey = key.toString();
    }

    if (PageId) {
      if (storeKey) {
        if (!this.#links.has(storeKey)) {
          this.#links.set(storeKey, new Map());
          this.#links.get(storeKey).set(PageId, []);
        }
        if (!this.#links.get(storeKey).has(pageId)) {
          this.#links.get(storeKey).set(PageId, []);
        }

        this.#links.get(storeKey).get(PageId).push(key);
      }

      this.#updatePages(storeKey.toString());
    }

    return this;
  }
  pageLink(pageId: string) {
    this.#linkPageIds.add(pageId);
    return this;
  }
}