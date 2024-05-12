import { find, get, some } from 'lodash';
import { useRouter } from 'next/router';
import en from '@/locales/en.json';
import hr from '@/locales/hr.json';

const translations = { en, hr };

export const locales = [
  {
    label: 'Hrvatski',
    value: 'hr',
    default: false,
  },
  {
    label: 'English',
    value: 'en',
    default: true,
  },
];

export const defaultLocale = find(locales, ['default', true])?.value || 'en';

export const t = (path: string, locale?: string) => {
  const selectedTranslationFile = get(translations, locale || defaultLocale, {});
  const selectedTranslation = get(selectedTranslationFile, path);
  if (selectedTranslation) return selectedTranslation;

  const fallbackTranslationFile = get(translations, defaultLocale, {});
  const fallbackTranslation = get(fallbackTranslationFile, path);
  if (fallbackTranslation) return fallbackTranslation;

  return path;
};

export default function useTranslations() {
  const router = useRouter();
  const [slug] = get(router, 'query.slug', ['']) as string[];
  const isSlugLocale = some(locales, (locale) => locale.value === slug);
  const currentLocale = isSlugLocale ? slug : defaultLocale;

  const translate = (path: string) => t(path, currentLocale);

  return { t: translate, currentLocale };
}
