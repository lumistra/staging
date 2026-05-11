import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import { map } from 'lodash';
import Section from '@/components/containers/Section';
import Lightbox from '@/components/elements/Lightbox';
import Media from '@/components/elements/Media';
import style from '@/styles/projects/lab.module.scss';
import { isVideo } from '@/utils';
import type { LabData } from '@/types/projects';

type Props = {
  blok: SbBlokData & LabData
};

export default function Lab(props: Props) {
  /**
 * Parses image dimensions from a Storyblok asset URL.
 * URL format: https://a.storyblok.com/f/{space}/{width}x{height}/{hash}/{filename}
 */
  const parseDimensions = (name: string | null, filename: string): { width: number; height: number } | null => {
    const match = name?.match(/(\d+)x(\d+)/) || filename.match(/\/(\d+)x(\d+)\//);
    if (!match && isVideo(filename)) return { width: 2560, height: 1440 };
    if (!match) return null;

    return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) };
  };

  /**
 * Calculates how many grid rows (of 1vw each) an image should span
 * so its natural aspect ratio is preserved within a column of `columnVw` vw.
 */
  const calcRowSpan = (filename: string, name: string | null, columnVw: number): number => {
    const dims = parseDimensions(name, filename);
    if (!dims) return Math.round(columnVw); // fallback: assume square

    return Math.ceil((dims.height / dims.width) * columnVw);
  };

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={style.labWrapper}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <div className={style.labGrid}>
        {map(props.blok.items, (media, index) => {
          const desktopSpan = calcRowSpan(media.filename, media.name, 33.33);
          const tabletSpan = calcRowSpan(media.filename, media.name, 50);
          const mobileSpan = calcRowSpan(media.filename, media.name, 100);

          return (
            <div
              key={index}
              className={style.labContainer}
              style={{
                ['--row-span-desktop' as string]: desktopSpan,
                ['--row-span-tablet' as string]: tabletSpan,
                ['--row-span-mobile' as string]: mobileSpan,
              }}
            >
              <Lightbox image={media}>
                <Media
                  className={style.labMedia}
                  src={media.filename}
                  alt={media.alt}
                />
              </Lightbox>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
