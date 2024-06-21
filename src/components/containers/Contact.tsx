import classNames from 'classnames';
import Arrow from '@/assets/svg/arrow.svg';
import { email } from '@/content';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import useTranslations from '@/hooks/useTranslations';
import style from '@/styles/contact.module.scss';
import Section from './Section';

type Props = {
  className?: string
  ctaClassName?: string
  title?: string
  isSmall?: boolean
};

export default function Contact(props: Props) {
  const { t } = useTranslations();
  useScrollAnimations({
    contactWrapper: {
      animation: AnimationType.fadeDown,
      query: '.contact-animation-wrapper',
      offset: 100,
    },
  });

  return (
    <Section containerClassName={classNames(style.contactCTAWrapper, props.className)}>
      <div className={classNames('contact-animation-wrapper', style.contentWrapper)}>
        <span className={classNames({
          [style.title]: !props.isSmall,
          [style.titleSmall]: props.isSmall,
        })}
        >
          {props.title || t('contact.cta.title')}
        </span>
      </div>
      <a
        className={classNames('cta-link', props.ctaClassName, {
          [style.action]: !props.isSmall,
          [style.actionSmall]: props.isSmall,
        })}
        href={`mailto:${email}`}
        target="_blank"
      >
        <div className="cta-container initial-container">
          {t('contact.cta.action')}
          <Arrow />
        </div>
        <div className="cta-container hover-container">
          {t('contact.cta.action')}
          <Arrow />
        </div>
      </a>
    </Section>
  );
}
