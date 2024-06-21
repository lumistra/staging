import Head from 'next/head';
import Section from '@/components/containers/Section';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/contact.module.scss';
import Latest from '../containers/articles/Latest';
import WantToPublish from '../containers/articles/WantToPublish';
import ContactSection from '../containers/Contact';
import TextMask from '../elements/TextMask';

export default function Contact() {
  const { t } = useTranslations();
  useScrollAnimations({
    heroTitle: {
      animation: AnimationType.fadeUp,
      query: '.hero-animation-title',
      offset: 0,
    },
  });

  return (
    <main>
      <Head>
        <title>{t('contact.title')}</title>
        <meta name="transition-title" content={t('routes.contact')} />
      </Head>
      <Section containerClassName={style.heroWrapper}>
        <TextMask identifier="hero-animation-title">
          <h1>{t('contact.hero')}</h1>
        </TextMask>
      </Section>
      <ContactSection title={t('contact.cta.title-contact')} isSmall />
      <WantToPublish />
      <Latest />
    </main>
  );
}
