import { format } from 'date-fns';
import Link from '@/components/elements/Link';
import Media from '@/components/elements/Media';
import { defaultLocale } from '@/hooks/useTranslations';
import style from '@/styles/articles/grid.module.scss';
import { routes } from '@/utils';
import type { ArticleData } from '@/types/articles';
import type { ISbStoryData } from '@storyblok/react';

type Props = {
  article: ISbStoryData<ArticleData>
  minHeight?: number
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

export default function Article(props: Props) {
  const [headline] = props.article.content.headline;

  return (
    <Link
      className={style.articleContainer}
      href={routes.article(props.article.slug)}
      locale={defaultLocale}
    >
      <Media
        className={style.articleCover}
        src={headline.cover.filename}
        alt={headline.cover.alt}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
      <span className={style.articleDate}>
        {format(new Date(headline.publishedAt), 'MMM do yyyy')}
      </span>
      <span
        className={style.articleTitle}
        style={{ minHeight: props.minHeight || 400 }}
      >
        {headline.title}
      </span>
    </Link>
  );
}
