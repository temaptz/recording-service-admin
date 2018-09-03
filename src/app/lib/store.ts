import * as store from 'store';

// Сохранение значения в локальное хранилище
const set = (key: string, value: any): any => {
  return store.set(key, value);
};

// Получение значения из локального хранилища
const get = (key: string): any => {
  return store.get(key);
};

// Удаление значения из локального хранилища
const remove = (key: string): any => {
  return store.remove(key);
};

// Очистка всего локального хранилища
const removeAll = (key: string): any => {
  return store.clearAll();
};

export const Store = {
  set: set,
  get: get,
  remove: remove,
  removeAll: removeAll,
};
