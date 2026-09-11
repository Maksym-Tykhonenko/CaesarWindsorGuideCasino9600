import { AureliaGate } from '../screens/AureliaGate';

export const CLOAKA = {
  baseUrl: 'https://quick-gate-plus.top/',
  id: 'ijk3wnf4',
  startDate: new Date(2026, 8, 15, 8, 8, 0),
};

export const ONESIGNAL_APP_ID = '6c6d90d6-0e04-4226-abdf-3f17305a9177';

export const TIMINGS = {
  splashDuration: 5000, // скільки тримаємо splash перед переходом на нативку
  cloakaRequestTimeout: 10000, // таймаут запиту на клоаку
};

export const SCREENS = {
  Splash: AureliaGate,
};
