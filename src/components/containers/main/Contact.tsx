import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import Section from '@/components/containers/Section';
import CtaLink from '@/components/elements/CtaLink';
import useScrollAnimations, { AnimationType } from '@/hooks/useScrollAnimations';
import style from '@/styles/main/contact.module.scss';
import type { ContactData } from '@/types/components';

type Props = {
  blok: SbBlokData & ContactData
};

export default function Contact(props: Props) {
  useScrollAnimations({
    contactWrapper: {
      animation: AnimationType.fadeDown,
      query: '.contact-animation-wrapper',
      offset: 100,
    },
  });

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={classNames(style.contactCTAWrapper, {
        [style.noBorderContact]: props.blok.noBorder,
      })}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <div className={classNames('animation-base contact-animation-wrapper', style.contentWrapper)}>
        <span className={classNames({
          [style.title]: !props.blok.small,
          [style.titleSmall]: props.blok.small,
        })}
        >
          {props.blok.title}
        </span>
      </div>
      <CtaLink
        className={classNames({
          [style.action]: !props.blok.small,
          [style.actionSmall]: props.blok.small,
          [style.mobileInvertColors]: props.blok.mobileInvertColors,
        })}
        link={props.blok.cta[0].link}
      >
        {props.blok.cta[0].text}
      </CtaLink>
    </Section>
  );
}
