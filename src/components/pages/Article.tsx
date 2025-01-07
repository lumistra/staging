import { StoryblokComponent, storyblokEditable } from '@storyblok/react';
import { get, map } from 'lodash';
import Section from '@/components/containers/Section';
import CtaLink from '@/components/elements/CtaLink';
import Link from '@/components/elements/Link';
import Media from '@/components/elements/Media';
import useTranslations, { defaultLocale } from '@/hooks/useTranslations';
import style from '@/styles/article.module.scss';
import { routes } from '@/utils';
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

      <div id="article-content" className={style.articleWrapper}>
        {map(article.body, (component) => (
          <StoryblokComponent key={component._uid} blok={component} />
        ))}
      </div>

      {recommended && recommendedArticle && (
        <Section
          componentId={props.blok.component}
          containerClassName={style.recommendedWrapper}
        >
          <div className={style.recommendedHeader}>
            <span className={style.recommendedTitle}>{recommendedArticle.title}</span>
            <CtaLink className={style.recommendedCTA} href={routes.article(recommended.slug)} locale={defaultLocale}>
              {t('globals.read_next')}
            </CtaLink>
          </div>
          <Link href={routes.article(recommended.slug)} locale={defaultLocale}>
            <Media
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
