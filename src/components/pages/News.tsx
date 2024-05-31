import { map } from 'lodash';
import Head from 'next/head';
import useArticles from '@/content/articles';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/news.module.scss';
import Latest from '../containers/articles/Latest';
import WantToPublish from '../containers/articles/WantToPublish';
import Section from '../containers/Section';
import Article from '../elements/Article';

export default function News() {
  const { t } = useTranslations();
  const { articles } = useArticles();

  return (
    <>
      <Head>
        <title>{t('news.title')}</title>
      </Head>
      <Latest className={style.latestWrapper} minHeight={120} hideCTA />
      <Section containerClassName={style.articlesWrapper}>
        <h2 className={style.articlesTitle}>
          {t('news.sub_title')}
        </h2>
        {map(articles, (article) => (
          <Article key={article.slug} article={article} minHeight={120} />
        ))}
      </Section>
      <WantToPublish className={style.spacingTop} altBackground />
    </>
  );
}
