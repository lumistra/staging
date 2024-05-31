import classNames from 'classnames';
import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import type { Image as ImageType } from '@/types/shared';

type Props = {
  align: 'left' | 'right'
  text: string
  image: ImageType
};

export default function TextImage(props: Props) {
  return (
    <div className={style.textWrapper}>
      <div className={classNames({
        [style.alignLeft]: props.align === 'left',
        [style.alignRight]: props.align === 'right',
      })}
      >
        {props.text}
      </div>
      <Image
        className={classNames(style.imageColumn, {
          [style.alignRight]: props.align === 'left',
          [style.alignLeft]: props.align === 'right',
        })}
        src={props.image.src}
        alt={props.image.alt}
      />
    </div>
  );
}
