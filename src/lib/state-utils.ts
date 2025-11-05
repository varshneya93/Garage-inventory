/**
 * State Management Utilities
 * Modern TypeScript implementation of immutable state helpers
 */

/**
 * Deep clone an object or array
 */
export function clone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.slice() as T;
  }

  if (value && typeof value === "object") {
    const cloned: any = {};
    const keys = Object.keys(value);
    
    for (const key of keys) {
      cloned[key] = (value as any)[key];
    }
    
    return cloned;
  }

  return value;
}

/**
 * Deep merge objects immutably
 */
export function merge<T extends Record<string, any>>(
  target: T,
  ...sources: Partial<T>[]
): T {
  if (!sources.length) return target;

  const result = clone(target);

  for (const source of sources) {
    if (!source) continue;

    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = result[key];

        if (
          sourceValue &&
          typeof sourceValue === "object" &&
          !Array.isArray(sourceValue) &&
          targetValue &&
          typeof targetValue === "object" &&
          !Array.isArray(targetValue)
        ) {
          result[key] = merge(targetValue, sourceValue);
        } else {
          result[key] = sourceValue as any;
        }
      }
    }
  }

  return result;
}

/**
 * Set a value at a path immutably
 */
export function setIn<T>(
  obj: T,
  path: (string | number)[],
  value: any
): T {
  if (path.length === 0) return value;

  const [key, ...restPath] = path;
  const current = obj as any;

  if (restPath.length === 0) {
    if (Array.isArray(current)) {
      const newArray = [...current];
      newArray[key as number] = value;
      return newArray as T;
    }

    return {
      ...current,
      [key]: value,
    };
  }

  const nextValue = current[key] ?? (typeof restPath[0] === "number" ? [] : {});

  if (Array.isArray(current)) {
    const newArray = [...current];
    newArray[key as number] = setIn(nextValue, restPath, value);
    return newArray as T;
  }

  return {
    ...current,
    [key]: setIn(nextValue, restPath, value),
  };
}

/**
 * Get a value at a path
 */
export function getIn<T = any>(
  obj: any,
  path: (string | number)[]
): T | undefined {
  let current = obj;

  for (const key of path) {
    if (current == null) return undefined;
    current = current[key];
  }

  return current;
}

/**
 * Update a value at a path immutably
 */
export function updateIn<T>(
  obj: T,
  path: (string | number)[],
  updater: (value: any) => any
): T {
  const currentValue = getIn(obj, path);
  const newValue = updater(currentValue);
  return setIn(obj, path, newValue);
}

/**
 * Omit keys from an object immutably
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result: any = {};
  const keysToOmit = new Set(keys);

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !keysToOmit.has(key as any)) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Pick keys from an object immutably
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result: any = {};

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key] = obj[key];
    }
  }

  return result;
}

/**
 * Array utilities
 */
export const arrayUtils = {
  /**
   * Add item to end of array
   */
  addLast<T>(array: T[], item: T | T[]): T[] {
    return Array.isArray(item) ? [...array, ...item] : [...array, item];
  },

  /**
   * Add item to start of array
   */
  addFirst<T>(array: T[], item: T | T[]): T[] {
    return Array.isArray(item) ? [...item, ...array] : [item, ...array];
  },

  /**
   * Remove last item from array
   */
  removeLast<T>(array: T[]): T[] {
    return array.length > 0 ? array.slice(0, -1) : array;
  },

  /**
   * Remove first item from array
   */
  removeFirst<T>(array: T[]): T[] {
    return array.length > 0 ? array.slice(1) : array;
  },

  /**
   * Insert item at index
   */
  insert<T>(array: T[], index: number, item: T | T[]): T[] {
    const items = Array.isArray(item) ? item : [item];
    return [...array.slice(0, index), ...items, ...array.slice(index)];
  },

  /**
   * Remove item at index
   */
  removeAt<T>(array: T[], index: number): T[] {
    if (index < 0 || index >= array.length) return array;
    return [...array.slice(0, index), ...array.slice(index + 1)];
  },

  /**
   * Replace item at index
   */
  replaceAt<T>(array: T[], index: number, item: T): T[] {
    if (array[index] === item) return array;
    const newArray = [...array];
    newArray[index] = item;
    return newArray;
  },

  /**
   * Move item from one index to another
   */
  move<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const item = array[fromIndex];
    const withoutItem = arrayUtils.removeAt(array, fromIndex);
    return arrayUtils.insert(withoutItem, toIndex, item);
  },

  /**
   * Toggle item in array (add if not present, remove if present)
   */
  toggle<T>(array: T[], item: T): T[] {
    const index = array.indexOf(item);
    return index === -1
      ? arrayUtils.addLast(array, item)
      : arrayUtils.removeAt(array, index);
  },
};

/**
 * Create a simple store (like Redux but simpler)
 */
export function createStore<T>(
  initialState: T,
  reducer: (state: T, action: any) => T
) {
  let state = initialState;
  const listeners = new Set<(state: T) => void>();

  return {
    getState: () => state,

    dispatch: (action: any) => {
      state = reducer(state, action);
      listeners.forEach((listener) => listener(state));
      return action;
    },

    subscribe: (listener: (state: T) => void) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

/**
 * Compose functions (right to left)
 */
export function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  if (fns.length === 0) return (arg) => arg;
  if (fns.length === 1) return fns[0];

  return fns.reduce(
    (a, b) => (arg) => a(b(arg))
  );
}

/**
 * Pipe functions (left to right)
 */
export function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return compose(...fns.reverse());
}

/**
 * Memoize a function
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = getKey ? getKey(...args) : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Create a selector with memoization
 */
export function createSelector<State, Result>(
  selector: (state: State) => Result,
  equalityFn: (a: Result, b: Result) => boolean = Object.is
): (state: State) => Result {
  let lastState: State | undefined;
  let lastResult: Result | undefined;

  return (state: State) => {
    if (lastState !== undefined && lastResult !== undefined) {
      const newResult = selector(state);
      if (equalityFn(lastResult, newResult)) {
        return lastResult;
      }
      lastResult = newResult;
    } else {
      lastResult = selector(state);
    }

    lastState = state;
    return lastResult;
  };
}

/**
 * Batch updates to prevent multiple re-renders
 */
export function batchUpdates<T>(
  updates: Array<() => void>
): void {
  // In React 18+, updates are automatically batched
  // This is a compatibility helper
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      updates.forEach((update) => update());
    });
  } else {
    updates.forEach((update) => update());
  }
}

/**
 * Deep equality check
 */
export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a == null || b == null) return a === b;

  if (typeof a !== "object" || typeof b !== "object") return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

/**
 * Shallow equality check
 */
export function shallowEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== "object" || typeof b !== "object") return false;
  if (a == null || b == null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (a[key] !== b[key]) return false;
  }

  return true;
}
