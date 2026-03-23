import { en } from './en';
import { ru } from './ru';

export const dictionaries = {
  en,
  ru,
} as const;

export type Locale = keyof typeof dictionaries;

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale];
};
