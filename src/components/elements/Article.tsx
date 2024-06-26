import { format } from 'date-fns';
import { defaultLocale } from '@/hooks/useTranslations';
import style from '@/styles/articles/grid.module.scss';
import { routes } from '@/utils';
import Image from './Image';
import Link from './Link';
import type { Article as ArticleType } from '@/types/articles';

type Props = {
  article: ArticleType
  minHeight?: number
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

export default function Article(props: Props) {
  const publishedAt = new Date(props.article.publishedAt);

  return (
    <Link
      className={style.articleContainer}
      href={routes.article(props.article.slug)}
      locale={defaultLocale}
    >
      <Image
        className={style.articleCover}
        src={props.article.cover}
        alt={props.article.title}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      />
      <span className={style.articleDate}>
        {format(publishedAt, 'MMM io yyyy')}
      </span>
      <span
        className={style.articleTitle}
        style={{ minHeight: props.minHeight || 400 }}
      >
        {props.article.title}
      </span>
    </Link>
  );
}
