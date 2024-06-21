import { map } from 'lodash';
import Head from 'next/head';
import Arrow from '@/assets/svg/arrow.svg';
import Section from '@/components/containers/Section';
import useServices from '@/content/services';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/services.module.scss';
import { routes } from '@/utils';
import ContactSection from '../containers/Contact';
import Pitch from '../containers/services/Pitch';
import Selection from '../containers/services/Selection';
import CtaLink from '../elements/CtaLink';
import TextMask from '../elements/TextMask';

export default function Services() {
  const { t } = useTranslations();
  const { groups } = useServices();

  useScrollAnimations({
    heroTitle: {
      animation: AnimationType.fadeUp,
      query: '.hero-animation-title',
      offset: 0,
    },
    heroCTA: {
      animation: AnimationType.fadeUp,
      query: '.hero-cta-animation',
      offset: 0,
    },
  });

  return (
    <main>
      <Head>
        <title>{t('services.title')}</title>
        <meta name="transition-title" content={t('routes.services')} />
      </Head>
      <Section containerClassName={style.heroWrapper}>
        <TextMask identifier="hero-animation-title">
          <h1>{t('services.hero')}</h1>
        </TextMask>
        <TextMask identifier="hero-cta-animation">
          <span>
            {t('home.process.cta')}
            <Arrow />
          </span>
        </TextMask>
      </Section>
      <Pitch />
      <Section containerClassName={style.servicesWrapper}>
        <span className={style.servicesTitle}>{t('services.bio.title')}</span>
        <span className={style.servicesTitle}>{t('services.bio.section')}</span>
        <p className={style.servicesParagraph}>{t('services.bio.paragraph')}</p>
        <div className={style.servicesGrid}>
          {map(groups, (group) => (
            <div key={group.label} className={style.servicesColumn}>
              <span className={style.servicesColumnLabel}>{group.label}</span>
              {map(group.list, (item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ))}
        </div>
      </Section>
      <Selection hideHero />
      <Section
        className={style.checkInBackgroundWrapper}
        containerClassName={style.checkInWrapper}
      >
        <h3>{t('services.bio.check_in.title')}</h3>
        <p>{t('services.bio.check_in.paragraph')}</p>
        <CtaLink className={style.checkInCTA} href={routes.about + '#workflow'}>
          {t('services.bio.check_in.cta')}
        </CtaLink>
      </Section>
      <ContactSection
        className={style.noBorderContact}
        ctaClassName={style.ctaAction}
        title={t('contact.cta.title-alt')}
      />
    </main>
  );
}
