import { Recording } from '../model';

const now = new Date();

export const RecordingsMock = [
  new Recording(
    0,
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 0, 0),
    'Подробная информация о записи'
  ),
  new Recording(
    1,
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 30, 0),
    'Дополнительная информация'
  ),
  new Recording(
    3,
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0, 0)
  ),
  new Recording(
    1,
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0)
  ),
  new Recording(
    0,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 3), 11, 10, 0),
    'Подробности'
  ),
  new Recording(
    1,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 5), 12, 30, 0),
    'Доп. инфо.'
  ),
  new Recording(
    3,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 7), 14, 0, 0)
  ),
  new Recording(
    1,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 4), 16, 50, 0)
  ),
  new Recording(
    0,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 8), 11, 10, 0),
    'Подробности'
  ),
  new Recording(
    1,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 1), 12, 30, 0),
    'Доп. инфо.'
  ),
  new Recording(
    3,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 6), 14, 0, 0)
  ),
  new Recording(
    1,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() + 3), 16, 50, 0)
  ),
  new Recording(
    0,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 3), 11, 10, 0),
    'Подробности'
  ),
  new Recording(
    1,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 5), 12, 30, 0),
    'Доп. инфо.'
  ),
  new Recording(
    3,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 7), 14, 0, 0)
  ),
  new Recording(
    1,
    new Date(now.getFullYear(), now.getMonth(), (now.getDate() - 4), 16, 50, 0)
  ),
];
