import { useEffect, useRef } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map } from 'lodash';
import Section from '@/components/containers/Section';
import Link from '@/components/elements/Link';
import RichText from '@/components/elements/RichText';
import { socials } from '@/content';
import style from '@/styles/main/shelf.module.scss';
import { getOrderNumber } from '@/utils';
import type { ShelfData } from '@/types/components';

type Props = {
  blok: SbBlokData & ShelfData
};

function Shelf(props: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (!scrollRef.current) return;

      const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

      const isPositiveScroll = Math.sign(delta) === 1;
      const scrollOffsetX = scrollRef.current.scrollLeft + scrollRef.current.clientWidth;
      if (isPositiveScroll && scrollOffsetX >= scrollRef.current.scrollWidth) return;
      if (!isPositiveScroll && scrollRef.current.scrollLeft <= 0) return;

      event.preventDefault();
      scrollRef.current.scrollLeft += delta;
    };

    scrollRef.current?.addEventListener('wheel', handleScroll);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      scrollRef.current?.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.shelfWrapper}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <RichText className={style.headline}>{props.blok.headline}</RichText>
      <div ref={scrollRef} className={style.scroll}>
        <div className={style.container}>
          {map(props.blok.steps, (step, index) => (
            <Link
              key={`step-${step.label}-${index}`}
              className={classNames(style.step, { [style.primary]: index === 0 })}
              link={step.link}
            >
              <span className={style.number}>{getOrderNumber(index)}.</span>
              <span className={style.label}>{step.label}</span>
              {socials[step.icon]}
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Shelf;
