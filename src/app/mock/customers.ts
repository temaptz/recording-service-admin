import { Customer } from '../model';

export const CustomersMock = [
  new Customer(
    0,
    'Иван Петров',
    '91123453285',
    'ivan@petrov.ru',
    'Постоянный клиент',
  ),
  new Customer(
    1,
    'Ирина',
    '9217652348',
    null,
    'Два раза отменяла запись',
  ),
  new Customer(
    2,
    'Василий',
    '9097620867',
    'vasya@pupkin.com',
    'Не отвечает на звонки',
  ),
  new Customer(
    3,
    'Елена Иванова',
    '9358906527',
    'lena@gmail.com',
    '',
  ),
  new Customer(
    4,
    'Просто Мария',
    '9213459671',
    'm@marya.imfo',
    'Старый постоянный клиент',
  ),
];
