import { map } from 'lodash';
import Head from 'next/head';
import Section from '@/components/containers/Section';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/about.module.scss';
import { getOrderNumber, routes } from '@/utils';
import Latest from '../containers/articles/Latest';
import ContactSection from '../containers/Contact';
import Featured from '../containers/projects/Featured';
import Workflow from '../containers/Workflow';
import CtaLink from '../elements/CtaLink';

export default function About() {
  const { t } = useTranslations();

  const pitch = [
    {
      title: t('about.pitch.step_1.title'),
      paragraph: t('about.pitch.step_1.paragraph'),
    },
    {
      title: t('about.pitch.step_2.title'),
      paragraph: t('about.pitch.step_2.paragraph'),
    },
    {
      title: t('about.pitch.step_3.title'),
      paragraph: t('about.pitch.step_3.paragraph'),
      cta: t('about.pitch.step_3.cta'),
      href: routes.services,
    },
  ];

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
        <p>{t('about.bio.paragraph')}</p>
      </Section>
      <Section containerClassName={style.pitchWrapper}>
        {map(pitch, (item, index) => (
          <div key={index} className={style.pitchItem}>
            <span className={style.pitchNumber}>{getOrderNumber(index, true)}</span>
            <div className={style.pitchContent}>
              <span className={style.pitchTitle}>{item.title}</span>
              <p className={style.pitchParagraph}>{item.paragraph}</p>
              {item.cta && (
                <CtaLink className={style.pitchCTA} href={item.href}>{item.cta}</CtaLink>
              )}
            </div>
          </div>
        ))}
      </Section>
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
