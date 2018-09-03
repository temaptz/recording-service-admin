export { isDateSameOrBefore, isDateSameOrAfter } from './datetime';
export { Store } from './store';

// Сгенерировать id
export const generateId = (): number => {
  return new Date().getTime() + Math.round(Math.random() * 100000);
};


