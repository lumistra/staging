import style from '@/styles/articles/grid.module.scss';
import { routes } from '@/utils';
import Image from './Image';
import Link from './Link';
import type { Article as ArticleType } from '@/types/articles';

type Props = {
  article: ArticleType
  minHeight?: number
};

export default function Article(props: Props) {
  return (
    <Link
      className={style.articleContainer}
      href={routes.article(props.article.slug)}
    >
      <Image
        className={style.articleCover}
        src={props.article.cover}
        alt={props.article.title}
      />
      <span className={style.articleDate}>
        {props.article.publishedAt}
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
