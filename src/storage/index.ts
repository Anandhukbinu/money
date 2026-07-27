import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEYS } from './keys';

export async function getJson<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function setJson<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[Storage] Failed to save key "${key}":`, error);
  }
}

export async function getOnboardingComplete(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEYS.onboardingComplete);
    return value === 'true';
  } catch (error) {
    console.error('[Storage] Failed to read onboarding state:', error);
    return false;
  }
}

export async function setOnboardingComplete(value: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.onboardingComplete,
      value ? 'true' : 'false',
    );
  } catch (error) {
    console.error('[Storage] Failed to save onboarding state:', error);
  }
}

export { STORAGE_KEYS };
