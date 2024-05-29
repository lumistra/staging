import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow-straight.svg';
import { email } from '@/content';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/contact.module.scss';
import Section from './Section';

type Props = {
  altTitle?: boolean
  isSmall?: boolean
};

export default function Contact(props: Props) {
  const { t } = useTranslations();

  return (
    <Section containerClassName={style.contactCTAWrapper}>
      <div className={style.contentWrapper}>
        <span className={classNames({
          [style.title]: !props.isSmall,
          [style.titleSmall]: props.isSmall,
        })}
        >
          {props.altTitle ? t('contact.cta.title-alt') : t('contact.cta.title')}
        </span>
        <p className={style.paragraph}>
          {t('contact.cta.paragraph')}
        </p>
      </div>
      <a
        className={classNames('cta-link', {
          [style.action]: !props.isSmall,
          [style.actionSmall]: props.isSmall,
        })}
        href={`mailto:${email}`}
        target="_blank"
      >
        {t('contact.cta.action')}
        <Arrow />
      </a>
    </Section>
  );
}
