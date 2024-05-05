import Head from 'next/head';
import useTranslations from '@/hooks/useTranslations';
import Section from '../containers/Section';

export default function Work() {
  const { t } = useTranslations();

  return (
    <Section>
      <Head>
        <title>{t('work.title')}</title>
      </Head>
    </Section>
  );
}
