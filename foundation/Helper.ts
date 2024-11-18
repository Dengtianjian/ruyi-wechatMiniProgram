function undefinedOrNull(value: any): boolean {
  return value !== undefined && value !== null;
}

function isNumber(value: any): boolean {
  return undefinedOrNull(value) && typeof value === 'number';
}

function type(target: any): string {
  return Object.prototype.toString.call(target).split(" ")[1].slice(0, -1).toLowerCase();
}

const ThrottleTimers: Map<string, number> = new Map();
function throttle(uniqueId: string, callback: () => void, delay: number = 100) {
  let timer: number = null;
  if (ThrottleTimers.has(uniqueId)) {
    timer = ThrottleTimers.get(uniqueId);
  }
  return () => {
    if (timer) return;
    timer = setTimeout(() => {
      // @ts-ignore
      callback.apply(this, arguments);
      timer = null;
      ThrottleTimers.delete(uniqueId);
    }, delay);
    ThrottleTimers.set(uniqueId, timer);
  }
}

export default {
  undefinedOrNull,
  isNumber,
  type,
  throttle
}