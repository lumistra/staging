import Head from 'next/head';
import Section from '@/components/containers/Section';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/contact.module.scss';
import { parseMarkdown } from '@/utils';
import Latest from '../containers/articles/Latest';
import ContactSection from '../containers/Contact';

export default function Contact() {
  const { t } = useTranslations();

  return (
    <>
      <Head>
        <title>{t('contact.title')}</title>
      </Head>
      <Section containerClassName={style.heroWrapper}>
        <h1>{t('contact.hero')}</h1>
      </Section>
      <ContactSection isSmall />
      <Section
        className={style.articleBackgroundWrapper}
        containerClassName={style.articleWrapper}
      >
        <div>
          <h3>{t('contact.article.title')}</h3>
          <p>{parseMarkdown(t('contact.article.paragraph'))}</p>
        </div>
      </Section>
      <Latest />
    </>
  );
}
