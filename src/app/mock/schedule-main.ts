import { ScheduleMain, ScheduleMainDay } from '../model';

export const ScheduleMainMock = new ScheduleMain([
  new ScheduleMainDay(
    0,
    'mo',
    'Понедельник',
    false,
    9,
    0,
    20,
    0
  ),
  new ScheduleMainDay(
    1,
    'tu',
    'Вторник',
    false,
    11,
    0,
    20,
    0
  ),
  new ScheduleMainDay(
    2,
    'we',
    'Среда',
    false,
    10,
    0,
    20,
    0
  ),
  new ScheduleMainDay(
    3,
    'th',
    'Четверг',
    false,
    10,
    0,
    20,
    0
  ),
  new ScheduleMainDay(
    4,
    'fr',
    'Пятница',
    false,
    10,
    0,
    20,
    50
  ),
  new ScheduleMainDay(
    5,
    'sa',
    'Суббота',
    false,
    8,
    10,
    19,
    0
  ),
  new ScheduleMainDay(
    6,
    'su',
    'Воскресенье',
    false,
    10,
    0,
    18,
    30
  ),
]);
