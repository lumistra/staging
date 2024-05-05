import Head from 'next/head';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/home.module.scss';
import Section from '../containers/Section';

export default function Home() {
  const { t } = useTranslations();

  return (
    <Section containerClassName={style.heroWrapper}>
      <Head>
        <title>{t('home.title')}</title>
      </Head>
      <h1>{t('home.hero')}</h1>
    </Section>
  );
}
