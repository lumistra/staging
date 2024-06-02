import Head from 'next/head';
import Arrow from '@/assets/svg/arrow.svg';
import Featured from '@/components/containers/projects/Featured';
import Selected from '@/components/containers/projects/Selected';
import Section from '@/components/containers/Section';
import CtaLink from '@/components/elements/CtaLink';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/home.module.scss';
import { routes } from '@/utils';
import Latest from '../containers/articles/Latest';
import Contact from '../containers/Contact';
import Selection from '../containers/services/Selection';
import Workflow from '../containers/Workflow';

export default function Home() {
  const { t } = useTranslations();

  return (
    <>
      <Head>
        <title>{t('home.title')}</title>
        <meta name="transition-title" content={t('routes.home')} />
      </Head>
      <Section containerClassName={style.heroWrapper}>
        <h1>{t('home.hero')}</h1>
      </Section>
      <Featured textPosition="top" />
      <Section containerClassName={style.aboutUsWrapper}>
        <h5>
          {t('home.about_us.tagline_1')}
          <div className={style.aboutUsLineWrapper}>
            <hr className={style.aboutUsLineLong} />
            <hr className={style.aboutUsLineShort} />
          </div>
        </h5>
        <h5>{t('home.about_us.tagline_2')}</h5>
        <div className={style.aboutUsContentWrapper}>
          <p>{t('home.about_us.paragraph')}</p>
          <CtaLink href={routes.about}>
            {t('home.about_us.link')}
          </CtaLink>
        </div>
      </Section>
      <Selected />
      <Section
        className={style.processBackgroundWrapper}
        containerClassName={style.processWrapper}
      >
        <h3>{t('home.process.title')}</h3>
        <p>{t('home.process.paragraph')}</p>
        <span>
          {t('home.process.cta')}
          <Arrow />
        </span>
      </Section>
      <Selection />
      <Workflow />
      <Latest />
      <Contact />
    </>
  );
}
