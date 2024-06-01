import Head from 'next/head';
import Section from '@/components/containers/Section';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/about.module.scss';
import { routes } from '@/utils';
import Latest from '../containers/articles/Latest';
import ContactSection from '../containers/Contact';
import Featured from '../containers/projects/Featured';
import Pitch from '../containers/services/Pitch';
import Workflow from '../containers/Workflow';
import CtaLink from '../elements/CtaLink';

export default function About() {
  const { t } = useTranslations();

  return (
    <>
      <Head>
        <title>{t('about.title')}</title>
      </Head>
      <Section
        className={style.heroBackground}
        containerClassName={style.heroWrapper}
        parentChildren={(
          <>
            <div className={style.gradientPoint} />
            <div className={style.gradientPoint} />
            <div className={style.gradientPoint} />
            <div className={style.gradientPoint} />
          </>
        )}
      >
        <h1>{t('about.hero')}</h1>
      </Section>
      <Section containerClassName={style.aboutWrapper}>
        <h3>{t('about.bio.title')}</h3>
        <p>{t('about.bio.paragraph_1')}</p>
        <p>{t('about.bio.paragraph_2')}</p>
      </Section>
      <Pitch />
      <Section containerClassName={style.projectsWrapper}>
        <h3>{t('about.projects')}</h3>
        <CtaLink href={routes.work}>{t('globals.see_all_projects')}</CtaLink>
      </Section>
      <Featured className={style.featuredWrapper} textPosition="bottom" />
      <Workflow />
      <Latest />
      <ContactSection />
    </>
  );
}
