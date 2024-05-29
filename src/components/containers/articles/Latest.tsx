import { map } from 'lodash';
import CtaLink from '@/components/elements/CtaLink';
import Image from '@/components/elements/Image';
import Link from '@/components/elements/Link';
import useArticles from '@/content/articles';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/articles/latest.module.scss';
import { routes } from '@/utils';
import Section from '../Section';

export default function Latest() {
  const { t } = useTranslations();
  const { latest } = useArticles();

  return (
    <Section containerClassName={style.latestWrapper}>
      <div className={style.latestTextWrapper}>
        <span className={style.latestTitle}>
          {t('articles.latest.section')}
        </span>
        <div className={style.latestColumn}>
          <span className={style.latestTitle}>
            {t('articles.latest.title')}
          </span>
          <CtaLink className={style.latestCTA} href={routes.articles}>
            {t('globals.read_all')}
          </CtaLink>
        </div>
      </div>
      <div className={style.articlesWrapper}>
        {map(latest, (article) => (
          <Link
            key={article.slug}
            className={style.articleContainer}
            href={routes.article(article.slug)}
          >
            <Image
              className={style.articleCover}
              src={article.cover}
              alt={article.title}
            />
            <span className={style.articleDate}>{article.publishedAt}</span>
            <span className={style.articleTitle}>{article.title}</span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
