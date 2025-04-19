import { useEffect, useRef, useState } from 'react';
import { type SbBlokData, storyblokEditable } from '@storyblok/react';
import classNames from 'classnames';
import { map } from 'lodash';
import Section from '@/components/containers/Section';
import CursorTracker from '@/components/elements/CursorTracker';
import Link from '@/components/elements/Link';
import Media from '@/components/elements/Media';
import RichText from '@/components/elements/RichText';
import { useScreenSize } from '@/hooks/useScreenSize';
import style from '@/styles/main/grow.module.scss';
import type { CursorPosition } from '@/components/elements/CursorTracker';
import type { GrowData } from '@/types/components';

type Props = {
  blok: SbBlokData & GrowData
};

function Grow(props: Props) {
  const { isTablet } = useScreenSize();
  const [modalShow, setModalShow] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeBlock, setActiveBlock] = useState(-1);
  const intervalID = useRef<NodeJS.Timeout>(undefined);
  const currentBlock = props.blok.blocks[Math.max(0, activeBlock)];

  useEffect(() => {
    if (isTablet) return;

    const handleMove = ({ x, y }: MouseEvent) => {
      setCursorPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, [isTablet]);

  useEffect(() => {
    if (isTablet || !modalShow) return;

    const nextGalleryIndex = () => {
      setGalleryIndex((prevIndex) => {
        let nextIndex = prevIndex + 1;
        nextIndex = currentBlock.gallery.length - 1 < nextIndex ? 0 : nextIndex;

        return nextIndex;
      });
    };

    intervalID.current = setInterval(nextGalleryIndex, 1000);

    return () => clearInterval(intervalID.current);
  }, [isTablet, modalShow, currentBlock.gallery.length]);

  const handleShowModal = (shouldShow: boolean, blockIndex: number) => {
    if (isTablet) return;

    setActiveBlock(shouldShow ? blockIndex : -1);
    setModalShow(shouldShow);
  };

  return (
    <Section
      componentId={props.blok.component}
      containerClassName={classNames(style.wrapper, {
        [style.growLeft]: !isTablet && activeBlock === 0,
        [style.growRight]: !isTablet && activeBlock === 1,
      })}
      style={props.blok.styling}
      storyblokEditable={storyblokEditable(props.blok)}
    >
      <CursorTracker
        keyword={currentBlock.cta.text}
        cursorPosition={cursorPosition}
        show={modalShow}
      />
      {map(props.blok.blocks, (block, index) => (
        <Link
          key={`block-${block.title}-${index}`}
          className={classNames(style.block, {
            [style.active]: !isTablet && activeBlock === index,
          })}
          link={currentBlock.cta.link}
          onMouseEnter={() => handleShowModal(true, index)}
          onMouseLeave={() => handleShowModal(false, index)}
        >
          <h3 className={style.title}>{block.title}</h3>
          <div className={style.content}>
            <RichText className={style.paragraph}>{block.paragraph}</RichText>
            <Media
              className={style.cover}
              src={block.gallery[galleryIndex]?.filename}
              alt={block.gallery[galleryIndex]?.alt}
            />
          </div>
        </Link>
      ))}
    </Section>
  );
}

export default Grow;
