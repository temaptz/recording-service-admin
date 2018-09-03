import * as moment from 'moment';

// Является ли первая дата равной второй
export const isDateSame = (dateToCheck: Date, dateToCompare: Date): boolean => {
  return moment(dateToCheck).isSame(dateToCompare);
};

// Является ли первая дата более ранней чем вторая
export const isDateBefore = (dateToCheck: Date, dateToCompare: Date): boolean => {
  return moment(dateToCheck).isBefore(dateToCompare);
};

// Является ли первая дата более ранней или равной второй
export const isDateSameOrBefore = (dateToCheck: Date, dateToCompare: Date): boolean => {
  return moment(dateToCheck).isSameOrBefore(dateToCompare);
};

// Является ли первая дата более поздней чем вторая
export const isDateAfter = (dateToCheck: Date, dateToCompare: Date): boolean => {
  return moment(dateToCheck).isAfter(dateToCompare);
};

// Является ли первая дата более поздней или равной второй
export const isDateSameOrAfter = (dateToCheck: Date, dateToCompare: Date): boolean => {
  return moment(dateToCheck).isSameOrAfter(dateToCompare);
};
