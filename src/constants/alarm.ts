import { AlarmConfig } from '../types/alarm';

export const HOUR_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

export const MINUTE_OPTIONS = [0, 30] as const;

export const STORAGE_KEY = '@lembrei/alarm-config';

export const DEFAULT_CONFIG: AlarmConfig = {
  hours: 1,
  minutes: 0,
  alertType: 'vibração',
  isActive: false,
};

export function calculateIntervalSeconds(hours: number, minutes: number): number {
  return hours * 3600 + minutes * 60;
}
