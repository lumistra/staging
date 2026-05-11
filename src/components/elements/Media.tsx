import classNames from 'classnames';
import NextImage from 'next/image';
import { isVideo } from '@/utils';

type Props = {
  className?: string,
  src: string,
  alt: string | null,
  storyblokEditable?: any
  onClick?: () => void
  onMouseEnter?: () => void,
  onMouseLeave?: () => void,
};

export default function Media(props: Props) {
  const basePath = (process.env.basePath || '');
  const src = `${basePath}${props.src}`;
  const videoFormat = isVideo(src);

  return (
    <div
      className={classNames('image-container', props.className, {
        'mock-media': !!process.env.mockApi,
      })}
      {...props.storyblokEditable}
      onClick={props.onClick}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    >
      {videoFormat ? (
        <video src={src} muted autoPlay playsInline loop />
      ) : (
        <NextImage src={src} alt={props.alt || ''} fill />
      )}
    </div>
  );
}
