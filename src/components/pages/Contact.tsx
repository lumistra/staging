import Head from 'next/head';
import Section from '@/components/containers/Section';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/contact.module.scss';
import Latest from '../containers/articles/Latest';
import WantToPublish from '../containers/articles/WantToPublish';
import ContactSection from '../containers/Contact';

export default function Contact() {
  const { t } = useTranslations();

  return (
    <>
      <Head>
        <title>{t('contact.title')}</title>
        <meta name="transition-title" content={t('routes.contact')} />
      </Head>
      <Section containerClassName={style.heroWrapper}>
        <h1>{t('contact.hero')}</h1>
      </Section>
      <ContactSection isSmall />
      <WantToPublish />
      <Latest />
    </>
  );
}
