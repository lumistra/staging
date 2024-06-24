import classNames from 'classnames';
import { includes, some } from 'lodash';
import NextImage from 'next/image';

type Props = {
  className?: string,
  src: string,
  alt: string | null,
  storyblokEditable?: any
  onClick?: () => void
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

export default function Image(props: Props) {
  const basePath = (process.env.basePath || '');
  const src = `${basePath}${props.src}`;
  const isVideo = some(['webm', 'mp4', 'ogg'], (format) => includes(src, `.${format}`));

  return (
    <div
      className={classNames('image-container', props.className)}
      {...props.storyblokEditable}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {isVideo ? (
        <video src={src} muted autoPlay playsInline loop />
      ) : (
        <NextImage src={src} alt={props.alt || ''} fill />
      )}
    </div>
  );
}
