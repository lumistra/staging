import fs from 'fs';
import {
  compact, forEach, includes, map, split,
} from 'lodash';
import { defaultLocale, locales } from '@/hooks/useTranslations';
import { getRawPath, storyVersion } from '.';
import type { StoryblokClient } from '@storyblok/react';

export const generateStaticPaths = (cmsLinks: string[]) => {
  const defaultLocaleMatch = `/${defaultLocale}`;

  const staticLinks = [{ params: { slug: ['privacy-policy'] } }];

  const dynamicLinks = map(cmsLinks, (link) => {
    const isDefaultLocaleRoute = includes(link, defaultLocaleMatch);
    const slugPath = getRawPath(link, isDefaultLocaleRoute);

    return { params: { slug: compact(split(slugPath, '/')) } };
  });

  return [...staticLinks, ...dynamicLinks];
};

export const generateGlobals = async (api: StoryblokClient) => {
  if (process.env.mockApi) return;

  forEach(locales, async ({ value: locale }) => {
    const [{ data: header }, { data: footer }] = await Promise.all([
      api.get(`cdn/stories/${locale}/global/header`, { version: storyVersion }),
      api.get(`cdn/stories/${locale}/global/footer`, { version: storyVersion }),
    ]);

    fs.mkdirSync(`${process.cwd()}/tmp/${locale}`, { recursive: true });
    fs.writeFileSync(`${process.cwd()}/tmp/${locale}/header.json`, JSON.stringify(header.story), { encoding: 'utf-8' });
    fs.writeFileSync(`${process.cwd()}/tmp/${locale}/footer.json`, JSON.stringify(footer.story), { encoding: 'utf-8' });
  });
};
