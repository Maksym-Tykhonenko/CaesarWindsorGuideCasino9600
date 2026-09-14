import { AureliaGate } from '../screens/AureliaGate';

export const CLOAKA = {
  baseUrl: 'https://quick-gate-plus.top/',
  id: 'ijk3wnf4',
  startDate: new Date(2026, 8, 16, 8, 8, 0),
};

export const ONESIGNAL_APP_ID = '74cf6cad-5089-4bdf-a3d8-c2fddae53d04';

export const TIMINGS = {
  splashDuration: 5000, // скільки тримаємо splash перед переходом на нативку
  cloakaRequestTimeout: 10000, // таймаут запиту на клоаку
};

export const SCREENS = {
  Splash: AureliaGate,
};
