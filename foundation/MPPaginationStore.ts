import { IPagination } from "../types/MPHTTPTypes";
import MPStore from "./MPStore";

export default class MPPaginationStore<T> {
  #pageThis: WechatMiniprogram.Page.Instance<any, any> = null;
  #attributeName: string = null;
  #perPage: number = 1;
  #store: MPStore<{ loading: false; finished: false; page: number; perPage: number; total: number; items: number }> = null;
  constructor(attributeName: string, perPage: number = 1) {
    this.#attributeName = attributeName;
    this.#perPage = perPage;
  }
  page(newPage: number = null) {
    if (newPage !== null) {
      this.#store.set("page", newPage);

      this.#pageThis.setData({
        [`${this.#attributeName}_page`]: newPage,
      });
    }
    return this.#store.get("page");
  }
  perPage(newPerPage: number = null) {
    if (newPerPage !== null) {
      this.#perPage = newPerPage;
      this.#store.set("perPage", newPerPage);

      this.#pageThis.setData({
        [`${this.#attributeName}_perPage`]: newPerPage,
      });
    }
    return this.#perPage;
  }
  total(newTotal: number = null) {
    if (newTotal !== null) {
      this.#store.set("total", newTotal);

      this.#pageThis.setData({
        [`${this.#attributeName}_total`]: newTotal,
      });
    }
    return this.#store.get("total");
  }
  items(newItems: number = null) {
    if (newItems !== null) {
      this.#store.set("items", newItems);

      this.#pageThis.setData({
        [`${this.#attributeName}_items`]: newItems,
      });
    }
    return this.#store.get("items");
  }
  finished(flag: boolean = null) {
    if (flag !== null) {
      this.#store.set("finished", flag);

      this.#pageThis.setData({
        [`${this.#attributeName}_finished`]: flag,
      });
    }
    return this.#store.get("finished");
  }
  loading(flag: boolean = null) {
    if (flag !== null) {
      this.#store.set("loading", flag);

      this.#pageThis.setData({
        [`${this.#attributeName}_loading`]: flag,
      });
    }
    return this.#store.get("loading");
  }
  bindPage(pageThis: any) {
    return this.bind(pageThis);
  }
  bind(pageThis: any) {
    this.#pageThis = pageThis;
    pageThis.setData({
      [`${this.#attributeName}_loading`]: false,
      [`${this.#attributeName}_finished`]: false,
      [`${this.#attributeName}_page`]: 1,
      [`${this.#attributeName}_perPage`]: this.#perPage,
      [`${this.#attributeName}_total`]: 0,
    });

    this.#store = new MPStore({
      loading: false,
      finished: false,
      page: 1,
      perPage: 1,
      total: 0,
      items: 0
    });

    this.#store.link(`${this.#attributeName}_loading`, "loading", pageThis.data._RuyiPageId);
    this.#store.link(`${this.#attributeName}_finished`, "finished", pageThis.data._RuyiPageId);
    this.#store.link(`${this.#attributeName}_page`, "page", pageThis.data._RuyiPageId);
    this.#store.link(`${this.#attributeName}_perPage`, "perPage", pageThis.data._RuyiPageId);
    this.#store.link(`${this.#attributeName}_total`, "total", pageThis.data._RuyiPageId);
    this.#store.link(`${this.#attributeName}_items`, "items", pageThis.data._RuyiPageId);

    return this;
  }
  refresh(): this {
    if (this.loading()) return this;

    this.finished(false);
    this.loading(false);
    this.page(1);
    this.total(0);
    this.items(0);
    this.#pageThis.setData({
      [this.#attributeName]: []
    });
    return this;
  }
  #loadPromise: Promise<IPagination<T>> = null;
  load(request: Promise<IPagination<T> | any>) {
    if (this.finished()) return this.#loadPromise;

    this.#loadPromise = request.then(data => {
      this.#pageThis.setData({
        [`${this.#attributeName}.${this.page().toString()}`]: data.list
      });
      this.#refreshItems();
      this.total(data.pagination.total);
      if (data.pagination.items < this.#perPage) {
        this.finished(true);
      }

      this.page(this.page() + 1);

      return data;
    });

    return this.#loadPromise;
  }
  #refreshItems() {
    let items: number = 0;
    for (const Page in this.#pageThis.data[this.#attributeName]) {
      items += this.#pageThis.data[this.#attributeName][Page].length;
    }
    this.items(items);
  }
  push(page: string, data: T) {
    const list = this.#pageThis.data[this.#attributeName][page];

    this.#pageThis.setData({
      [`${this.#attributeName}.${page}[${list.length}]`]: data
    });

    this.total(this.total() + 1);
    this.#refreshItems();
  }
  unshift(page: string, data: any) {
    const list = this.#pageThis.data[this.#attributeName][page];
    list.unshift(data);

    this.#pageThis.setData({
      [`${this.#attributeName}.${page}`]: list
    });
    this.total(this.total() + 1);
    this.#refreshItems();
  }
  splice(page: string, index: number) {
    const list = this.#pageThis.data[this.#attributeName][page];
    list.splice(index, 1);
    this.total(this.total() - 1);

    this.#pageThis.setData({
      [`${this.#attributeName}.${page}`]: list
    });
    this.#refreshItems();
  }
}