import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { map, split } from 'lodash';
import style from '@/styles/services.module.scss';
import Section from '../Section';
import type { WhatWeDoData } from '@/types/components';

type Props = {
  blok: SbBlokData & WhatWeDoData
};

export default function WhatWeDo(props: Props) {
  return (
    <Section containerClassName={style.servicesWrapper} storyblokEditable={storyblokEditable(props.blok)}>
      <span className={style.servicesTitle}>{props.blok.title}</span>
      <span className={style.servicesTitle}>{props.blok.section}</span>
      <p className={style.servicesParagraph}>{props.blok.paragraph}</p>
      <div className={style.servicesGrid}>
        {map(props.blok.services, (group, groupIndex) => (
          <div key={`${group.title}-${groupIndex}`} className={style.servicesColumn}>
            <span className={style.servicesColumnLabel}>{group.title}</span>
            {map(split(group.list, '\n'), (item, itemIndex) => (
              <span key={`${item}-${itemIndex}`}>{item}</span>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}
