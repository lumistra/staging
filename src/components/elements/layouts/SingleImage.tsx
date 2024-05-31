import style from '@/styles/layouts.module.scss';
import Image from '../Image';
import type { Image as ImageType } from '@/types/shared';

export default function SingleImage(props: ImageType) {
  return (
    <Image
      className={style.singleImage}
      src={props.src}
      alt={props.alt}
    />
  );
}
