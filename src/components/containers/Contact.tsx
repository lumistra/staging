import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow-straight.svg';
import { email } from '@/content';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/contact.module.scss';
import Section from './Section';

export default function Contact() {
  const { t } = useTranslations();

  return (
    <Section containerClassName={style.contactWrapper}>
      <div className={style.contentWrapper}>
        <span className={style.title}>
          {t('contact.cta.title')}
        </span>
        <p className={style.paragraph}>
          {t('contact.cta.paragraph')}
        </p>
      </div>
      <a
        className={classNames('cta-link', style.action)}
        href={`mailto:${email}`}
        target="_blank"
      >
        {t('contact.cta.action')}
        <Arrow />
      </a>
    </Section>
  );
}
