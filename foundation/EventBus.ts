//* 事件总线、任务巴士

type TSubscribers = Map<string, (...params: any[]) => void>;

const List: Map<string, TSubscribers> = new Map();

export default {
  patch(name: string, ...params: unknown[]) {
    if (!List.has(name)) {
      return;
    }

    List.get(name).forEach((item) => {
      item(...params);
    });
  },
  distribute(name: string): {
    complete: (...params: unknown[]) => void
  } {
    if (!List.has(name)) {
      List.set(name, new Map());
    }

    return {
      complete: (...params) => {
        this.patch(name, ...params);
      }
    };
  },
  subscribe(name: string, callback: (...params: any[]) => void): {
    cancel: () => void
  } {
    if (!List.has(name)) {
      List.set(name, new Map());
    }
    const list = List.get(name);
    const id = `${Date.now()}-${list.size}`;
    list.set(id, callback);

    return {
      cancel() {
        list.delete(id);
      }
    }
  },
  once(name: string, callback: (...params: any[]) => void): void {
    if (!List.has(name)) {
      List.set(name, new Map());
    }

    const list = List.get(name);
    const id = `${Date.now()}-${list.size}`;
    list.set(id, (...params) => {
      callback(...params);
      list.delete(id);
    });
  }
}