import AsyncStorage from '@react-native-async-storage/async-storage';
import { AlarmConfig } from '../types/alarm';
import { STORAGE_KEY, DEFAULT_CONFIG } from '../constants/alarm';

export async function saveAlarmConfig(config: AlarmConfig): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export async function loadAlarmConfig(): Promise<AlarmConfig> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULT_CONFIG;
  return JSON.parse(raw) as AlarmConfig;
}
