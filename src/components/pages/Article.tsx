import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { get, map } from 'lodash';
import useTranslations, { defaultLocale } from '@/hooks/useTranslations';
import style from '@/styles/article.module.scss';
import { routes } from '@/utils';
import Section from '../containers/Section';
import CtaLink from '../elements/CtaLink';
import Image from '../elements/Image';
import Link from '../elements/Link';
import type { ArticleData, HeadlineData } from '@/types/articles';
import type { SbBlokData } from '@storyblok/react';

type Props = {
  blok: SbBlokData & ArticleData
};

export default function Article(props: Props) {
  const { t } = useTranslations();
  const { recommended } = props.blok;
  const recommendedArticle = get(recommended, 'content.headline[0]', null) as HeadlineData | null;
  const article = props.blok;
  const [headline] = article.headline;

  return (
    <main {...storyblokEditable(props.blok)}>
      {map(article.meta, (meta: SbBlokData) => (
        <StoryblokComponent
          key={meta._uid}
          blok={{ ...meta, article: headline }}
        />
      ))}

      {map(article.headline, (blok: SbBlokData) => (
        <StoryblokComponent key={blok._uid} blok={blok} />
      ))}

      <div className={style.articleWrapper}>
        {map(article.body, (component) => (
          <StoryblokComponent key={component._uid} blok={component} />
        ))}
      </div>

      {recommended && recommendedArticle && (
        <Section containerClassName={style.recommendedWrapper}>
          <div className={style.recommendedHeader}>
            <span className={style.recommendedTitle}>{recommendedArticle.title}</span>
            <CtaLink className={style.recommendedCTA} href={routes.article(recommended.slug)} locale={defaultLocale}>
              {t('globals.read_next')}
            </CtaLink>
          </div>
          <Link href={routes.article(recommended.slug)} locale={defaultLocale}>
            <Image
              className={style.recommendedCover}
              src={recommendedArticle.cover.filename}
              alt={recommendedArticle.cover.alt}
            />
          </Link>
        </Section>
      )}
    </main>
  );
}
