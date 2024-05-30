import classNames from 'classnames';
import { map } from 'lodash';
import Article from '@/components/elements/Article';
import CtaLink from '@/components/elements/CtaLink';
import useArticles from '@/content/articles';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/articles/latest.module.scss';
import { routes } from '@/utils';
import Section from '../Section';

type Props = {
  className?: string
  minHeight?: number
  hideCTA?: boolean
};

export default function Latest(props: Props) {
  const { t } = useTranslations();
  const { latest } = useArticles();

  return (
    <Section containerClassName={classNames(style.latestWrapper, props.className)}>
      <div className={style.latestTextWrapper}>
        <span className={style.latestTitle}>
          {t('articles.latest.section')}
        </span>
        <div className={style.latestColumn}>
          <span className={style.latestTitle}>
            {t('articles.latest.title')}
          </span>
          {!props.hideCTA && (
            <CtaLink className={style.latestCTA} href={routes.articles}>
              {t('globals.read_all')}
            </CtaLink>
          )}
        </div>
      </div>
      <div className={style.articlesWrapper}>
        {map(latest, (article) => (
          <Article key={article.slug} article={article} minHeight={props.minHeight} />
        ))}
      </div>
    </Section>
  );
}
